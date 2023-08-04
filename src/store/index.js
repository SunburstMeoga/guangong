import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            language: 0
        }
    },
    mutations: {
        setLanguage(state, value) {
            state.language = value
        }
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