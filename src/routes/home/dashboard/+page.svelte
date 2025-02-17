<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="border-b border-gray-200 pb-5">
	<h3 class="text-2xl font-semibold text-gray-900">Welcome back, {data.claims.name}!</h3>
</div>
