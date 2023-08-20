/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";
import { createApp } from "vue";
import { registerPlugins } from "@/plugins";
import "reflect-metadata";
import "es6-shim";
import { useAppStore } from "./store/app";
import VueCookies from "vue-cookies";
import API from "./functional_components/API/api";

const app = createApp(App);

registerPlugins(app);

const store = useAppStore();

app.use(VueCookies);
app.mount("#app");
