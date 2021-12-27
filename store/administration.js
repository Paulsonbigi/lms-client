import Vue from "vue";
export const state = () => ({
  allUsers: [],
  loading: false,
  allBooks: [],
  bookRequests: [],
  sameBooks: [],
  pendingRequests: [],
  allApprovedRequests: [],
  allSameBooks: [],
  sameApprovedBooks: []
});

export const getters = {
    allUsers: state => state.allUsers,
    loading: state => state.loading,
    bookRequests: state => state.bookRequests,
    sameBooks: state => state.sameBooks,
    pendingRequests: state => state.pendingRequests,
    allApprovedRequests: state => state.allApprovedRequests,
    allSameBooks: state => state.allSameBooks,
    sameApprovedBooks: state => state.sameApprovedBooks
};

export const mutations = {
  SET_ALL_USERS(state, allUsers) {
    state.allUsers = allUsers;
  },

  SET_LOADING(state, loading) {
    state.loading = loading;
  },

  SET_BOOK_REQUESTS(state, bookRequests) {
    state.bookRequests = bookRequests;
  },

  SET_SAME_BOOKS(state, sameBooks) {
    state.sameBooks = sameBooks
  },

  SET_PENDING_REQUESTS(state, pendingRequests) {
    state.pendingRequests = pendingRequests
  },

  SET_ALL_APPROVED_REQUESTS(state, allApprovedRequests){
    state.allApprovedRequests = allApprovedRequests
  },

  SET_SAME_BOOKS_BY_TITLE(state, allSameBooks) {
    state.allSameBooks = allSameBooks
  },

  SET_SAME_APPROVED_BOOKS_BY_TITLE(state, sameApprovedBooks){
    state.sameApprovedBooks = sameApprovedBooks
  } 
  
};

export const actions = {
  async createNewBook({ commit }, bookData) {
    commit("SET_LOADING", true);
    await this.$axios.$post("/api/book/create", bookData);
    commit("SET_LOADING", false);
  },

  async approveRequests({ commit },requestData) {
    commit("SET_LOADING", true);
    await this.$axios.$patch("/api/admin/borrow-approve/"+ requestData.requestIds + "/" + requestData.bookId);
    commit("SET_LOADING", false);
  },

  async updateRequests({ commit }, requestData) {
    console.log("from store", requestData.bookId)
    commit("SET_LOADING", true);
    await this.$axios.$patch("/api/admin/updates-record/"+ requestData.requestIds + "/" + requestData.bookId);
    commit("SET_LOADING", false);
  },

  async getAllUsers({ commit },) {
    commit("SET_LOADING", true);
    const { data }  = await this.$axios.$get("/api/user/get-users-only")
    commit('SET_ALL_USERS', data)
    commit("SET_LOADING", false)
  },

  async getAllPendingRequests({ commit },) {
    commit("SET_LOADING", true);
    const { data }  = await this.$axios.$get("/api/admin/get-all-pending-requests")
    commit('SET_PENDING_REQUESTS', data)
    commit("SET_LOADING", false)
  },

  async getAllApprovedRequests({ commit },) {
    commit("SET_LOADING", true);
    const { data }  = await this.$axios.$get("/api/admin/get-all-approved-requests")
    commit('SET_ALL_APPROVED_REQUESTS', data)
    commit("SET_LOADING", false)
  },

  async getPendingRequestsById({ commit }, requestId) {
    commit("SET_LOADING", true);
    const { data }  = await this.$axios.$get("/api/admin/get-all-pending-requests/"+requestId)
    commit('SET_PENDING_REQUESTS', data)
    commit("SET_LOADING", false)
  },

  async getSameBookRequestsPending({ commit }, requestId) {
    commit("SET_LOADING", true);
    const { data }  = await this.$axios.$get("/api/borrow/all-requests-same-title/"+requestId)
    commit('SET_SAME_BOOKS_BY_TITLE', data)
    commit("SET_LOADING", false)
  },

  async getSameBookRequestsApproved({ commit }, requestId) {
    commit("SET_LOADING", true);
    const { data }  = await this.$axios.$get("/api/borrow/all-approved-requests-same-title/"+requestId)
    commit('SET_SAME_APPROVED_BOOKS_BY_TITLE', data)
    commit("SET_LOADING", false)
  },

  async getAllBookRequests({ commit },) {
    commit("SET_LOADING", true);
    const { data, bookDetails }  = await this.$axios.$get("/api/borrow/all-requests")
    commit('SET_BOOK_REQUESTS', data, bookDetails)
    commit("SET_LOADING", false)
  },

  async getAllBookRequestsById({ commit }, requestId) {
    commit("SET_LOADING", true);
    const data  = await this.$axios.$get("/api/borrow/all-requests/"+ requestId)
    commit('SET_BOOK_REQUESTS', data)
    commit("SET_LOADING", false)
  },

  async getAllBookRequestsWithSameId({ commit }, bookId) {
    commit("SET_LOADING", true);
    const { data, bookDetails }  = await this.$axios.$get("/api/borrow/same-book-request/"+ bookId)
    commit('SET_SAME_BOOKS', data, bookDetails)
    commit("SET_LOADING", false)
  },
};
