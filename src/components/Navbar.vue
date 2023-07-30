<template>
	<!-- DESKTOP -->
	<v-navigation-drawer
		width="350"
		color="surface-lighten-1"
		v-model="drawer"
		:expand-on-hover="windowSize.width.value >= 1280"
		:temporary="windowSize.width.value < 1280"
	>
		<v-list>
			<div v-for="item in navItems">
				<v-list-group v-if="item.subMenus" :value="item.title" no-action>
					<template v-slot:activator="{ props }">
						<v-list-item
							:title="item.title"
							:prepend-icon="item.icon"
							v-bind="props"
						/>
					</template>
					<v-list-item
						v-for="subItem in item.subMenus"
						:key="subItem.title"
						:title="subItem.title"
						:to="subItem.to"
						:prepend-icon="subItem.icon"
					/>
				</v-list-group>
				<v-list-item
					v-else
					base-color="secondary"
					:title="item.title"
					:prepend-icon="item.icon"
					:value="item.to"
				/>
			</div>
		</v-list>
	</v-navigation-drawer>
	<v-app-bar class="d-xs-flex d-lg-none">
		<v-img src="/logo.png" class="mx-1" max-height="32" max-width="32" contain />
		<v-app-bar-title
			align-center
			class="text-uppercase font-weight-light text-secondary mx-2 pt-1 text-h7"
		>
			soulforger
		</v-app-bar-title>
		<template v-slot:prepend>
			<v-app-bar-nav-icon
				color="secondary"
				@click="drawer = !drawer"
				class="d-lg-none d-xl-none d-xxl-none"
			/>
		</template>
	</v-app-bar>
	<v-main>
		<slot></slot>
	</v-main>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import { useWindowSize } from "vue-window-size";

interface NavItem {
	title: string;
	icon: string;
	to?: string;
	subMenus?: NavItem[];
}

const windowSize = useWindowSize();

const drawer = ref<boolean>(true);

const navItems: Ref<Array<NavItem>> = ref([
	{
		title: "Home",
		icon: "mdi-home",
		to: "/",
	},
	{
		title: "Backend",
		icon: "mdi-database-cog",
		subMenus: [
			{
				title: "Dashboard",
				icon: "mdi-view-dashboard",
				to: "/backend/dashboard",
			},
			{
				title: "Nirve",
				icon: "mdi-plus",
				to: "/backend/create",
			},
		],
	},
]);
</script>
