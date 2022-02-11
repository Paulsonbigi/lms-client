import Vue from "vue";
export const state = () => ({
  logining: false,
  loggedIn: false,
  user: false,
  registering: false

});

export const getters = {
  authenticated: state => state.auth.loggedIn,
  user: state => state.auth.user,
  registering: state => state.registering
};

export const mutations = {
  SET_LOGGING_IN(state, payload) {
    state.logining = payload;
  },

  SET_REGISTERING(state, registering) {
    state.registering = registering;
  },
};

export const actions = {
  async userRegister({ commit }, registerData) {
    commit("SET_REGISTERING", true);
    await this.$axios.$post("/user/create", registerData);
    commit("SET_REGISTERING", false);
  },

  async passwordResetRequest({ commit }, resetData) {
    commit("SET_REGISTERING", true);
    await this.$axios.$post("/user/forgot-password", resetData)
    commit("SET_REGISTERING", false);
  },

  async passwordResetRequestToken({ commit }, data) {
    commit("SET_REGISTERING", true);
    await this.$axios.$patch(`/user/reset-password`, data)
    commit("SET_REGISTERING", true);
  },

  async resetPassword({ commit }, data) {
    commit("SET_REGISTERING", true);
    await this.$axios.$patch(`/user/enter-password`, data)
    commit("SET_REGISTERING", true);
  }

};
