<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import {
		FieldGroup,
		Field,
		FieldLabel,
		FieldDescription,
		FieldSeparator
	} from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import Spinner from '$lib/components/ui/spinner/spinner.svelte';
	import type { PageProps } from './$types';
	import { toast } from 'svelte-sonner';

	let props: PageProps = $props();
	let working = $state(false);

	$effect(() => {
		if (props.form) {
			if (!props.form.success) {
				toast.error(props.form.error || 'Invalid Credentials');
			}
		}
	});
</script>

<div class="bg-muted flex min-h-full flex-col justify-center items-center gap-6 p-6 md:p-10">
	<div class="flex w-full max-w-sm flex-col gap-6">
		<img class="mx-auto h-12 w-auto" src="/logo.png" alt="My Logo" />
	</div>

	<div class="flex flex-col gap-6 w-full max-w-sm">
		<Card.Root>
			<Card.Header class="text-center">
				<Card.Title class="text-xl">Sign in to your account</Card.Title>
			</Card.Header>
			<Card.Content>
				<form
					class="space-y-6"
					method="POST"
					action="?/sendOTP"
					use:enhance={() => {
						working = true;

						return async ({ update }) => {
							await update();
							working = false;
						};
					}}
				>
					<FieldGroup>
						<Field>
							<Button variant="outline" type="button">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
									<path
										d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
										fill="currentColor"
									/>
								</svg>
								Login with Google
							</Button>
						</Field>
						<FieldSeparator class="*:data-[slot=field-separator-content]:bg-card">
							Or continue with
						</FieldSeparator>
						<Field>
							<FieldLabel for="email">Email</FieldLabel>
							<Input id="email" type="email" placeholder="m@example.com" required />
						</Field>
						<Field>
							<Button type="submit" disabled={working}>
								{#if working}
									<Spinner />
								{/if}
								Login
							</Button>
							<FieldDescription class="text-center">
								Don't have an account? <a href="##">Sign up</a>
							</FieldDescription>
						</Field>
					</FieldGroup>
				</form>
			</Card.Content>
		</Card.Root>
	</div>
</div>
