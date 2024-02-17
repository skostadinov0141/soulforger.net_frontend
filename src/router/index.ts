// Composables
import { useSnackbarStore } from "@/store/snackbar";
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import { useApiStore } from "@/store/api";

const routes: Array<RouteRecordRaw> = [
  {
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
    path: "/nirve",
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "manage-commons",
        component: () => import("@/views/nirve/ManageCommons.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "manage-tags",
        component: () => import("@/views/nirve/ManageTags.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "manage-groups",
        component: () => import("@/views/nirve/ManageGroups.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  const store = useApiStore();
  const snackbarStore = useSnackbarStore();
  if (!store.authed && to.meta.requiresAuth && to.path !== "/login") {
    try {
      await store.api.getAxios();
    } catch (err) {
      snackbarStore.$patch({
        snackbar: {
          message: "Du musst dich zuerst einloggen!",
          type: "warning",
        },
      });
      return "/login";
    }
  }
});

// router.beforeEach((to, from) => {
// 	const store = useApiStore();
// 	const snackbarStore = useSnackbarStore();
// 	if (to.meta.authLevels) {
// 		if (!store.api.validatePrivileges(to.meta.authLevels as Array<number>)) {
// 			snackbarStore.$patch({
// 				snackbar: {
// 					message: "Du hast keine ausreichenden Berechtigungen!",
// 					type: "warning",
// 				},
// 			});
// 			return false;
// 		}
// 	}
// });

export default router;
