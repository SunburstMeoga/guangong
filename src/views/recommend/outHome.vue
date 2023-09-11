<template>
    <div>
        <div class="flex flex-col text-icon-gray justify-center items-center">
            <div class="w-11/12 text-left mb-2">当前地址</div>
            <div class="w-11/12  bg-card-introduce py-4 rounded-md px-2 mb-6">
                <div class="text-sm">{{ address }}</div>
            </div>
            <div class="w-11/12 text-left mb-2">上级地址</div>
            <div class="w-11/12  bg-card-introduce py-4 rounded-md px-2 mb-6">
                <div class="text-sm">{{ p_address }}</div>
            </div>
            <div class="w-11/12 text-left mb-2" v-if="childs1.length !== 0">我的下级</div>
            <div class="w-11/12 mb-4">

                <template v-for="obj, key in childs1" :key="key">
                    <van-cell-group inset>
                        <van-cell title="朋友地址:" :value="obj.c_addr">
                        </van-cell>
                        <van-cell title="签名时间:" :value="timeFormat(obj.sign_utc)" />
                        <van-cell title="绑定时间:" :value="timeFormat(obj.utc)" />
                    </van-cell-group>
                    <br />
                </template>
            </div>
            <!-- <div class="w-full py-4 px-4 ">
                <div class="buy-button text-primary-word text-lg button-word" @click="sign">
                    签名
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import { isAddress } from "ethers"
import { config } from '@/const/config'
import axios from 'axios'
import { Cell, CellGroup, showSuccessToast, showFailToast } from 'vant'
import popularContractApi from '@/request/ether_request/popularized'
import moment from 'moment'


export default {
    components: { [Cell.name]: Cell, [CellGroup.name]: CellGroup, [showSuccessToast.name]: showSuccessToast, [showFailToast.name]: showFailToast, },
    data() {
        return {
            showLink: false,
            inHome: false,
            address: ethereum.selectedAddress,
            p_address: '',
            c_count: 0,
            childs0: [],
            childs1: [],
        }
    },
    computed: {
        realoadLowAddress() {
            return this.$store.state.realoadLowAddress
        }
    },
    watch: {
        realoadLowAddress: {
            handler(status) {
                if (status) {
                    this.load()
                }
            },
            deep: true,
            immediate: true,
        },
    },
    async mounted() {
        const newUrl = new URL(window.location.href)
        this.p_address = newUrl.searchParams.get('p')
        popularContractApi.relationshipAddress(ethereum.selectedAddress)
            .then(res => {
                this.p_address = res[0]
            })
            .catch(err => {
                console.log('err', err)
            })
        this.load()

        //console.log(this.p_address)
    },

    methods: {
        timeFormat(obj) {
            if (obj == null) {
                return null
            }
            return moment(obj * 1000).format('YYYY-MM-DD HH:mm:ss')
        },
        async load() {
            this.$loading.show()
            console.log('触发load函数')
            this.address = ethereum.selectedAddress
            this.p_address = this.$store.state.p_addr
            const ret0 = await axios.get(`${config.api}friends/childs/${this.address}/0`)

            this.childs0 = ret0.data
            const ret1 = await axios.get(`${config.api}friends/childs/${this.address}/1`)
            this.childs1 = ret1.data
            this.$store.commit('changeRealoadLowAddress', false)
            this.$loading.hide()
            console.log(ret0, ret1)
        },
        async sign() {
            if (!isAddress(this.p_address)) {
                showFailToast('上级地址错误')
                return
            }
            this.$loading.show()
            const msgParams = {
                domain: {
                    chainId: config.chainId,
                    name: 'GWT NFT Game',
                    verifyingContract: config.popularized_addr,
                    version: '1'
                },
                message: { addr_p: this.p_address, addr_c: this.address, index: 0 },
                primaryType: 'popularize',
                types: {
                    EIP712Domain: [
                        { name: 'name', type: 'string' },
                        { name: 'version', type: 'string' },
                        { name: 'chainId', type: 'uint256' },
                        { name: 'verifyingContract', type: 'address' },
                    ],
                    popularize: [
                        { name: 'addr_p', type: 'address' },
                        { name: 'addr_c', type: 'address' },
                        { name: 'index', type: 'uint256' },
                    ],
                },
            }

            const sign_data = await ethereum.request({
                method: 'eth_signTypedData_v4',
                params: [this.address, JSON.stringify(msgParams)],
            })
            const obj = {
                p_addr: this.p_address,
                sign: sign_data
            }
            const ret = await axios.post(`${config.api}friends/${this.address}`, obj)
            this.$loading.hide()
            console.log(ret.data)
            showSuccessToast('签名成功')
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
    @apply font-medium py-4 rounded flex justify-center items-center
}

.van-cell {
    background: #1F2937;
    color: #A1A1AA;
    width: 100%;
}
</style>