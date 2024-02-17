import { createStore } from "vuex";
import { Employee } from "@/data/employee.js";

export default createStore({
  state: {
    filteredData: Employee,
  },
  mutations: {
    setFilteredData(state, data) {
      state.filteredData = data;
    },
  },
  actions: {
    updateFilteredData({ commit }, data) {
      commit("setFilteredData", data);
    },
  },
  getters: {
    getFilteredData(state) {
      return state.filteredData;
    },
  },
});
