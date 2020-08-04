import Vue from "vue";
import axios from "axios";
import "./assets/main.css";
require("dotenv").config();

import App from "./App";

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: "<App/>",
}).$mount("#app");
