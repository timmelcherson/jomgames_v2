import Vue from "vue";
import Vuex from "vuex";
import rajndModule from "./rajnd/index";
import wordgameModule from "./wordgame/index";
import adminModule from "./admin/index";
import adminDashboardModule from "./admin-dashboard/index";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    adminModule,
    adminDashboardModule,
    rajndModule,
    wordgameModule,
  },
});
