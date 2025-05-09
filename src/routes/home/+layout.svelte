<script lang="ts">
	import Topbar from '$lib/components/shared/topbar.svelte';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<div class="min-h-full">
	<Topbar initials={data.claims.initials} />
	<div class="py-2">
		<main>
			<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				{@render children()}
			</div>
		</main>
	</div>
</div>
