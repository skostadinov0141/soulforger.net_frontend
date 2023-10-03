import { useSnackbarStore } from "@/store/snackbar";
import { RouteLocationNormalized } from "vue-router";

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
