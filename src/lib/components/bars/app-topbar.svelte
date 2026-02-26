<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { page } from '$app/state';

	type Props = {
		orgName: string;
		orgUrl: string;
	};

	let props: Props = $props();

	const inferTitle = (path: string) => {
		const parts = path.split('/');
		const lastPart = parts[2];
		return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
	};
</script>

<header class="flex h-16 shrink-0 items-center gap-2 border-b">
	<div class="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
		<Sidebar.Trigger class="-ms-1" />
		<Separator orientation="vertical" class="mx-2 data-[orientation=vertical]:h-4" />
		<h1 class="text-base font-medium">{inferTitle(page.url.pathname)}</h1>
		<div class="ms-auto flex items-center gap-2">
			<Button
				href={props.orgUrl}
				variant="ghost"
				size="sm"
				class="dark:text-foreground hidden sm:flex"
				target="_blank"
				rel="noopener noreferrer"
			>
				{props.orgName}
			</Button>
		</div>
	</div>
</header>
