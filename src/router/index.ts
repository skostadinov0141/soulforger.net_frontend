// Composables
import { useAppStore } from "@/store/app";
import { useSnackbarStore } from "@/store/snackbar";
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
		meta: {
			authLevel: 50,
		},
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach(async (to, from) => {
	const store = useAppStore();
	const snackbarStore = useSnackbarStore();
	if (!store.api.authed && to.meta.authLevel && to.path !== "/login") {
		snackbarStore.$patch({
			snackbar: {
				message: "Sie müssen sich zuerst anmelden!",
				type: "warning",
			},
		});
		return "/login";
	}
});

export default router;
