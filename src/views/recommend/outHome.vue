<template>
    <div>
        <div class="flex flex-col text-icon-gray justify-center items-center">
            <div class="w-11/12 text-left mb-2">当前地址</div>
            <div class="w-11/12  bg-card-introduce py-4 rounded-md px-2 mb-6">
                <div class="text-sm">{{ address }}</div>
            </div>
            <div class="w-11/12 text-left mb-2">上级地址</div>
            <div class="w-11/12  bg-card-introduce py-4 rounded-md px-2 mb-20">
                <div class="text-sm">{{ p_address }}</div>
            </div>

            <div class="w-full py-4 px-4 ">
                <div class="buy-button text-primary-word text-lg button-word" @click="sign">
                    签名
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { isAddress } from "ethers"
import { config } from '@/const/config'
import axios from 'axios'
import { showSuccessToast, showFailToast } from 'vant'

export default {
    data() {
        return {
            showLink: false,
            inHome: false,
            address: ethereum.selectedAddress,
            p_address: '',
            c_count: 0,
        }
    },
    async mounted() {
        const newUrl = new URL(window.location.href)
        this.p_address = newUrl.searchParams.get('p')
        //console.log(this.p_address)
    },

    methods: {
        async sign() {
            if (!isAddress(this.p_address)) {
                showFailToast('上级地址错误')
                return
            }
            const msgParams = {
                domain: {
                    chainId: config.chainId,
                    name: 'GWT NFT Game',
                    verifyingContract: config.game_addr,
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
</style>