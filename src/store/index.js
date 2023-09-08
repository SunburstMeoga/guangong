import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      language: 0,
      address: "",
      p_addr: "",
      userInfor: {
        address: "",
        income_card: 0,
        income_deposit: 0,
        income_personal: 0,
        income_pool: 0,
        income_sum: 0,
        income_team: 0,
        personal: 0,
      },
    };
  },
  mutations: {
    setLanguage(state, value) {
      state.language = value;
    },
    setAddress(state, value) {
      state.address = value;
    },
    setParentAddress(state, value) {
      state.p_addr = value;
    },
    updateUserInfor(state, payload) {
      state.userInfor = payload;
      // console.log(state, payload, test);
    },
  },
  actions: {
    incrementAsync(context) {
      setTimeout(() => {
        context.commit("increment");
      }, 1000);
    },
  },
});
export default store;
