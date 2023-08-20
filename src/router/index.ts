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
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
