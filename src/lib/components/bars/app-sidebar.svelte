<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { UsersRoundIcon, House } from '@lucide/svelte';
	import AppUser from './app-user.svelte';
	import { page } from '$app/state';

	type Props = {
		userName: string;
		roles: string[];
		email: string;
	};

	const items = {
		actions: [
			{ title: 'Home', url: '/', icon: House },
			{ title: 'Profile', url: '/profile', icon: UsersRoundIcon }
		]
	};

	let props: Props = $props();
</script>

<Sidebar.Root collapsible="offcanvas" variant="sidebar">
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<a href="##" {...props}>
							<img class="size-10 w-auto" src="/logo.png" alt="My Logo" />
							<span class="text-2xl font-semibold text-primary">My App</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Your Actions</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items.actions as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton isActive={item.url === page.url.pathname}>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		<AppUser userName={props.userName} email={props.email} />
	</Sidebar.Footer>
</Sidebar.Root>
