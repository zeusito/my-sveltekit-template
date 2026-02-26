<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<section class="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8 max-w-5xl mx-auto">
	<div class="text-center">
		<p class="text-base font-semibold text-orange-700">403</p>
		<h1 class="mt-4 text-2xl font-semibold tracking-tight text-balance text-gray-900">
			Oops! Access Denied
		</h1>
		<p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
			Sorry, you do not have permission to access this page.
		</p>
		<p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
			Please contact your administrator if you believe this is an error.
		</p>
		<div class="mt-10 flex items-center justify-center gap-x-6">
			<Button href="/home/dashboard" variant="default">Go back home</Button>
		</div>
	</div>
</section>
