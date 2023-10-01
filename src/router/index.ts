// Composables
import { useAppStore } from "@/store/app";
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
	{
		path: "/creator/nirve/:type",
		component: () => import("@/views/Creator.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

// router.beforeEach(async (to, from, next) => {
// 	const store = useAppStore();
// 	if (!store.api.authed && to.meta.authLevel) {
// 		return { name: "Login" };
// 	}
// 	next();
// });

export default router;
