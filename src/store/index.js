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
      userStar: "暂无星级",
      wgtBalance: 0,
      wgaBalance: 0,
      realoadLowAddress: false,
    };
  },
  mutations: {
    getUserStarLevle(state, value) {
      state.userStar = value;
    },
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
    updatWgtBalance(state, value) {
      state.wgtBalance = value;
    },
    updatWgaBalance(state, value) {
      state.wgaBalance = value;
    },
    changeRealoadLowAddress(state, value) {
      state.realoadLowAddress = value;
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
