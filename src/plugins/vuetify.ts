/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import { de } from "vuetify/locale";
import { VuetifyDateAdapter } from "vuetify/labs/date/adapters/vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  date: {
    adapter: VuetifyDateAdapter,
  },
  locale: {
    locale: "de",
    messages: { de },
  },
  theme: {
    defaultTheme: "dark",
    themes: {
      dark: {
        dark: true,
        colors: {
          background: "#0a0a0a",
          "on-background": "#FFFFFF",

          surface: "#0f0f0f",
          "surface-lighten-1": "#141414",
          "on-surface": "#FFFFFF",

          primary: "#7E57C2",
          "on-primary": "#FFFFFF",

          secondary: "#80DEEA",
          "on-secondary": "#000000",

          success: "#A5D6A7",
          "on-success": "#000000",

          warning: "#FFE082",
          "on-warning": "#000000",

          error: "#EF9A9A",
          "on-error": "#000000",

          info: "#9FA8DA",
          "on-info": "#000000",
        },
        // colors: {
        //   background: "#06080F",
        //   surface: "#06080F",
        //   "surface-lighten-1": "#0C0F1D",
        //   "surface-lighten-2": "#12172B",
        //   "surface-lighten-3": "#181F3A",
        //   "surface-lighten-4": "#1E2648",
        //   primary: "#8F5800",
        //   "primary-lighten-1": "#A36500",
        //   "primary-lighten-2": "#B87100",
        //   "primary-lighten-3": "#CC7E00",
        //   "primary-lighten-4": "#E08A00",
        //   secondary: "#D6D1C2",
        //   "secondary-darken-1": "#C6BFA9",
        //   "secondary-darken-2": "#B6AD91",
        //   "secondary-darken-3": "#A59A78",
        //   success: "#56BA57",
        //   error: "#BA5656",
        //   warning: "#BD9C55"
        // }
      },
    },
  },
});
