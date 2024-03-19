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
import VueCookies from "vue-cookies";

const app = createApp(App);

registerPlugins(app);

app.use(VueCookies);
app.mount("#app");
