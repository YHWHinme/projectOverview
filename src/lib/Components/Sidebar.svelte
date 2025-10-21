<script lang="ts">
	import NavigationSection from "./NavigationSection.svelte";

	const navigationItems = [
		{ path: "/dashboard", label: "Dashboard" },
		{ path: "/projects", label: "Projects" },
		{ path: "/clients", label: "Clients" },
		{ path: "/tasks", label: "Tasks" },
	];

	const bottomItems = [{ path: "/settings", label: "Settings", icon: "⚙️" }];
</script>

<div class="bg-sidebar-background w-64 h-screen flex flex-col">
	<!-- Logo -->
	<div class="p-4 border-b bg-sidebar-background">
		<div class="flex items-center space-x-3">
			<div
				class="w-6 h-6 bg-sidebar-activeStage rounded-full flex items-center justify-center"
			>
				<span class="text-sidebar-background font-bold text-xs">P</span>
			</div>
			<span class="text-sidebar-text-primary font-medium text-sm"
				>Project Overseer</span
			>
		</div>
	</div>

	<!-- Main Navigation -->
	<NavigationSection items={navigationItems} className="flex-1 p-3" />

	<!-- Bottom Navigation -->
	<div class="px-3 pb-3">
		<!-- Minimal line break  -->
		<div class="mx-2 mb-3 border-t border-sidebar-text-textInactive"></div>
		<NavigationSection items={bottomItems} className="" />
	</div>

	<!-- Footer -->
	<div class="p-4 border-t border-sidebar-text-textInactive">
		<div class="text-xs text-sidebar-text-textInactive">v0.1.1</div>
	</div>
</div>
