import { useSnackbarStore } from "@/store/snackbar";
import { RouteLocationNormalized } from "vue-router";

/**
 * A router guard that checks if the route's `type` parameter is valid.
 * If the parameter is not valid, it displays an error message using the snackbar store and prevents navigation.
 *
 * @param to - The target route being navigated to.
 * @param from - The current route being navigated from.
 * @returns A boolean indicating whether navigation should be allowed or not.
 */
export function nirveCreatorGuard(
	to: RouteLocationNormalized,
	from: RouteLocationNormalized
) {
	console.log("Guarding");
	const snackbarStore = useSnackbarStore();
	const types: string[] = [
		"bending-skills",
		"items",
		"spells",
		"character-classes",
		"disadvantages",
		"races",
		"religions",
		"skills",
	];
	if (!types.includes(to.params.type as string)) {
		snackbarStore.$patch({
			snackbar: {
				message: "Ungültiger Pfad!",
				type: "error",
			},
		});
		return false;
	}
}
