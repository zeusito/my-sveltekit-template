<script lang="ts">
	import { page } from '$app/state';
</script>

{#if page.status === 404}
	<main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
		<div class="text-center">
			<p class="text-base font-semibold text-secondary">404</p>
			<h1 class="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
				Page not found
			</h1>
			<p class="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
				Sorry, we couldn&apos;t find the page you&apos;re looking for.
			</p>
			<div class="mt-10 flex items-center justify-center gap-x-6">
				<a href="/home" class="btn btn-primary">Go back home</a>
			</div>
		</div>
	</main>
{:else}
	<main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
		<div class="text-center">
			<p class="text-base font-semibold text-secondary">404</p>
			<h1 class="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
				Oops! Something went wrong
			</h1>
			<p class="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
				Sorry, we couldn&apos;t find the page you&apos;re looking for.
			</p>
			<div class="mt-10 flex items-center justify-center gap-x-6">
				<a href="/home" class="btn btn-primary">Go back home</a>
			</div>
		</div>
	</main>
{/if}
