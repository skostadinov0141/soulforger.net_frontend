// Composables
import { useAppStore } from "@/store/app";
import { useSnackbarStore } from "@/store/snackbar";
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import { nirveCreatorGuard } from "./routingGuards";

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
			authLevels: [50],
			requiresAuth: true,
		},
		beforeEnter: nirveCreatorGuard,
		onBeforeRouteUpdate: nirveCreatorGuard,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((to, from) => {
	const store = useAppStore();
	const snackbarStore = useSnackbarStore();
	if (!store.api.authed && to.meta.requiresAuth && to.path !== "/login") {
		snackbarStore.$patch({
			snackbar: {
				message: "Du musst dich zuerst einloggen!",
				type: "warning",
			},
		});
		return "/login";
	}
});

router.beforeEach((to, from) => {
	const store = useAppStore();
	const snackbarStore = useSnackbarStore();
	if (to.meta.authLevels) {
		if (!store.api.validatePrivileges(to.meta.authLevels as Array<number>)) {
			snackbarStore.$patch({
				snackbar: {
					message: "Du hast keine ausreichenden Berechtigungen!",
					type: "warning",
				},
			});
			return false;
		}
	}
});

export default router;
