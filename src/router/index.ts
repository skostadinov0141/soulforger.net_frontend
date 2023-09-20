// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		default: true,
		path: "/",
		component: () => import("@/views/Dashboard.vue"),
	},
	{
		path: "/login",
		component: () => import("@/views/Login.vue"),
	},
	{
		path: "/register",
		component: () => import("@/views/Register.vue"),
	},
	{
		path: "/legal/privacy-agreement",
		component: () => import("@/views/PrivacyAgreement.vue"),
	},
	{
		path: "/profile",
		component: () => import("@/views/Profile.vue"),
	},
	{
		path: "/error",
		component: () => import("@/views/Error.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
