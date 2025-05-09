<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
	let working = $state(false);
</script>

<div class="flex min-h-full flex-col justify-center py-12 px-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<img class="mx-auto h-12 w-auto" src="/logo.png" alt="My Logo" />
		<h2 class="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
			Sign in to your account
		</h2>
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
		<div class="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
			{#if form?.success === false}
				<div role="alert" class="alert alert-error alert-soft mb-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 shrink-0 stroke-current"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>Your credentials are not valid</span>
				</div>
			{/if}

			<form
				class="space-y-6"
				method="POST"
				use:enhance={() => {
					working = true;

					return async ({ update }) => {
						await update();
						working = false;
					};
				}}
			>
				<div>
					<label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
					<div class="mt-2">
						<input
							id="email"
							name="email"
							type="email"
							class="input w-full"
							maxlength={100}
							required
						/>
					</div>
				</div>

				<div>
					<label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
					<div class="mt-2">
						<input
							id="password"
							name="password"
							type="password"
							class="input w-full"
							maxlength={30}
							required
						/>
					</div>
				</div>

				<div class="flex items-center justify-end">
					<div class="text-sm/6">
						<a href="/reset-password" class="font-semibold text-secondary">Forgot password?</a>
					</div>
				</div>

				<div>
					<button type="submit" class="btn btn-primary w-full" disabled={working}>
						{#if working}
							<span class="loading loading-spinner"></span>
							Working
						{:else}
							Sign In
						{/if}
					</button>
				</div>
			</form>

			<div class="">
				<div class="relative mt-10">
					<div class="absolute inset-0 flex items-center" aria-hidden="true">
						<div class="w-full border-t border-gray-200"></div>
					</div>
					<div class="relative flex justify-center text-sm/6 font-medium">
						<span class="bg-white px-6 text-gray-900">Or continue with</span>
					</div>
				</div>

				<div class="mt-6 grid grid-cols-2 gap-4">
					<button class="btn bg-white text-black border-[#e5e5e5]">
						<svg
							aria-label="Google logo"
							width="16"
							height="16"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
							><g
								><path d="m0 0H512V512H0" fill="#fff"></path><path
									fill="#34a853"
									d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
								></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
								></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
								></path><path
									fill="#ea4335"
									d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
								></path></g
							></svg
						>
						Google
					</button>
					<button class="btn bg-[#0967C2] text-white border-[#0059b3]">
						<svg
							aria-label="LinkedIn logo"
							width="16"
							height="16"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 32 32"
							><path
								fill="white"
								d="M26.111,3H5.889c-1.595,0-2.889,1.293-2.889,2.889V26.111c0,1.595,1.293,2.889,2.889,2.889H26.111c1.595,0,2.889-1.293,2.889-2.889V5.889c0-1.595-1.293-2.889-2.889-2.889ZM10.861,25.389h-3.877V12.87h3.877v12.519Zm-1.957-14.158c-1.267,0-2.293-1.034-2.293-2.31s1.026-2.31,2.293-2.31,2.292,1.034,2.292,2.31-1.026,2.31-2.292,2.31Zm16.485,14.158h-3.858v-6.571c0-1.802-.685-2.809-2.111-2.809-1.551,0-2.362,1.048-2.362,2.809v6.571h-3.718V12.87h3.718v1.686s1.118-2.069,3.775-2.069,4.556,1.621,4.556,4.975v7.926Z"
								fill-rule="evenodd"
							></path></svg
						>
						LinkedIn
					</button>
				</div>
			</div>
		</div>

		<p class="mt-10 text-center text-sm/6 text-gray-500">
			Not a member?
			<a href="/register" class="font-semibold text-neutral">Join our waiting list</a>
		</p>
	</div>
</div>
