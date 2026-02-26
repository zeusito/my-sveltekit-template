<script lang="ts">
	import type { Snippet } from 'svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppHeader from '$lib/components/bars/app-topbar.svelte';
	import AppSidebar from '$lib/components/bars/app-sidebar.svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar
		roles={data.claims.roles}
		userName={data.claims.firstName}
		email={data.claims.email}
	/>
	<Sidebar.Inset>
		<AppHeader orgName={data.claims.orgName} orgUrl="My Org" />
		<main class="min-h-full flex flex-col w-full p-4">
			{@render children?.()}
		</main>
	</Sidebar.Inset>
</Sidebar.Provider>
