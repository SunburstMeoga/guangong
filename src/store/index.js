import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            language: 0,
            address: '',
            p_addr: '',
        }
    },
    mutations: {
        setLanguage(state, value) {
            state.language = value
        },
        setAddress(state, value) {
            state.address = value
        },
        setParentAddress(state, value) {
            state.p_addr = value
        },
    },
    actions: {
        incrementAsync(context) {
            setTimeout(() => {
                context.commit('increment')
            }, 1000)
        }
    }
})
export default store