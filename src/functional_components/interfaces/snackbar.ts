export default interface SnackBar {
	title: string;
	message: string;
	type: "success" | "error" | "warning" | "info";
}
