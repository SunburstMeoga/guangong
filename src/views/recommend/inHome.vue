<template>
    <div>
        <!-- <div class="py-8">
            <div class="w-11/12 ml-auto mr-auto relative flex justify-center items-center text-card-content mb-4">
                <div class="icon iconfont icon-close absolute left-1" style="font-size: 24px;" @click="cancelPay()"></div>
                <div class="">推荐关系 in</div>
            </div>
        </div> -->
        <div class="flex flex-col text-icon-gray justify-center items-center">
            <div class="w-11/12 text-left mb-2">当前地址</div>
            <div class="w-11/12  bg-card-introduce py-4 rounded-md px-2 mb-3">
                <div class="text-sm">{{ address }}</div>
            </div>
            <div class="w-11/12 text-icon-gray bg-card-introduce py-4 rounded-md px-2 mb-6">
                <div class="flex justify-between items-center text-sm">
                    <div>已邀请</div>
                    <div class="text-theme-primary">{{ childs1.length }}人</div>
                </div>
            </div>
            <div class="w-11/12 text-left mb-2">上级地址</div>
            <div class="w-11/12  bg-card-introduce py-4 rounded-md px-2 mb-4 break-all ">
                <div class="text-sm">{{ p_address }}</div>
            </div>

            <div class="w-11/12 text-left mb-2">邀请链接</div>
            <div class="w-11/12  bg-card-introduce py-4 rounded-md px-2 mb-6 ">
                <div class="break-all mb-4 rounded bg-primary-black p-2 text-sm">
                    {{ share }}
                </div>
                <div class="buy-button text-primary-word py-2 rounded text-sm button-word" @click="copyAddress">
                    复制邀请链接
                </div>
            </div>
            <!-- <div class="w-11/12 buy-button text-primary-word text-lg py-2 button-word mb-10" @click="copyAddress">
                复制邀请链接
            </div> -->

            <template v-for="obj, key in childs0" :key="key">
                <div class="w-11/12 mb-4">
                    <van-cell-group inset>
                        <van-cell title="朋友地址:" :value="obj.c_addr">
                        </van-cell>
                        <van-cell title="签名时间:" :value="timeFormat(obj.sign_utc)" />
                        <van-cell>
                            <div class="flex justify-end">
                                <div class="campaign rounded px-2 py-1 text-center text-black text-sm" @click="bind(key)">
                                    绑定
                                </div>
                            </div>
                        </van-cell>
                    </van-cell-group>
                </div>
            </template>
            <!-- <div class="w-11/12 mb-4">
                <template v-for="obj, key in childs1" :key="key">
                    <van-cell-group inset>
                        <van-cell title="朋友地址:" :value="obj.c_addr">
                        </van-cell>
                        <van-cell title="签名时间:" :value="timeFormat(obj.sign_utc)" />
                        <van-cell title="绑定时间:" :value="timeFormat(obj.utc)" />
                    </van-cell-group>
                    <br />
                </template>
            </div> -->
        </div>
    </div>
</template>

<script>
import { ethers } from "ethers"
import { config } from '@/const/config'
import axios from 'axios'
import { Cell, CellGroup, showSuccessToast, showToast } from 'vant'
import moment from 'moment'
import { relationshipAddress } from '@/request/ether_request/popularized'

export default {
    components: { [Cell.name]: Cell, [CellGroup.name]: CellGroup, },


    data() {
        return {
            address: '',
            p_address: '',
            share: `${window.location.origin}/#/recommend?p=${ethereum.selectedAddress}`,
            childs0: [],
            childs1: [],
        }
    },
    mounted() {
        this.address = ethereum.selectedAddress
        this.load()
        relationshipAddress(ethereum.selectedAddress)
            .then(res => {
                this.p_address = res[0]
            })
            .catch(err => {
                console.log('err', err)
            })
    },
    methods: {
        copyAddress() {
            if (navigator.clipboard && window.isSecureContext) {
                console.log('aaa')
                navigator.clipboard.writeText(this.share).then(() => {
                    showSuccessToast('复制成功')
                }, () => {
                    showToast('复制失败')

                });
            } else {
                console.log('bbb')
                let textArea = document.createElement('textarea')
                textArea.value = this.share
                // 使text area不在viewport，同时设置不可见
                textArea.style.position = 'absolute'
                textArea.style.opacity = 0
                textArea.style.left = '-999999px'
                textArea.style.top = '-999999px'
                document.body.appendChild(textArea)
                textArea.focus()
                textArea.select()
                return new Promise((res, rej) => {
                    // 执行复制命令并移除文本框
                    document.execCommand('copy') ? res('复制成功') : rej('复制失败')
                    textArea.remove()
                })
                    .then((res) => {
                        // 从 resolve 获取正常结果
                        console.log(res)
                        this.successMsgBox(res)
                    })
                    .catch((res) => {
                        // 从 reject 获取异常结果
                        console.log(res)
                        this.successMsgBox(res)
                    })
            }

        },
        timeFormat(obj) {
            if (obj == null) {
                return null
            }
            return moment(obj * 1000).format('YYYY-MM-DD HH:mm:ss')
        },

        async load() {
            this.address = ethereum.selectedAddress
            this.p_address = this.$store.state.p_addr
            const ret0 = await axios.get(`${config.api}friends/childs/${this.address}/0`)
            this.childs0 = ret0.data
            const ret1 = await axios.get(`${config.api}friends/childs/${this.address}/1`)
            this.childs1 = ret1.data
            console.log(ret0, ret1)
        },


        async bind(key) {
            const sign = this.childs0[key].sign
            const c_addr = this.childs0[key].c_addr
            const id = this.childs0[key].id
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const GAME = new ethers.Contract(config.game_addr, config.game_abi, signer)
            const v = '0x' + sign.substring(130)
            const r = sign.substring(0, 66)
            const s = '0x' + sign.substring(66, 130)
            const tx = await GAME.popularize1(c_addr, v, r, s)
            const result = await tx.wait()
            console.log(result)
            const ret = await axios.put(`${config.api}friends/${id}`)
            console.log(ret.data)
            this.load()
            showSuccessToast('绑定成功')
        },
        cancelPay() {
            window.history.back();
        },
    }
}
</script>

<style scoped>
.buy-button {
    background: linear-gradient(90deg, rgba(250, 52, 168, 1) 9%, rgba(255, 150, 62, 1) 100%);
}

.button-word {
    @apply rounded flex justify-center items-center
}

.van-cell {
    background: #1F2937;
    color: #A1A1AA;
    width: 100%;
}

.campaign {
    background: rgb(89, 32, 116);
    background: linear-gradient(90deg, rgba(89, 32, 116, 1) 5%, rgba(115, 29, 120, 1) 37%, rgba(185, 20, 131, 1) 76%, rgba(226, 15, 138, 1) 100%);
}
</style>