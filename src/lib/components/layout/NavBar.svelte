<script lang="ts">
	import { IsMobile } from '$hooks/is-mobile.svelte';
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import { navigationMenuTriggerStyle } from '$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';

	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import { Languages, Moon, Sun } from '@lucide/svelte';
	import { buttonVariants } from '$components/ui/button';

	const isMobile = new IsMobile();

	type Link = {
		label: string;
		href: string;
	};

	type Props = {};

	const {} = $props();

	const links: Link[] = [
		{
			label: 'Home',
			href: '/'
		},
		{
			label: 'Showcase',
			href: '/showcase'
		},
		{
			label: 'Docs',
			href: '/docs'
		},
		{
			label: 'Blog',
			href: '/blog'
		}
	];
</script>

<div class="flex w-full items-center justify-between">
	<div class="flex items-center justify-between gap-x-8">
		<div>docs</div>

		<NavigationMenu.Root viewport={isMobile.current}>
			<NavigationMenu.List class="flex-wrap gap-x-2">
				{#each links as link}
					<NavigationMenu.Item>
						<NavigationMenu.Link>
							{#snippet child()}
								<a href={link.href} data-sveltekit-reload class={navigationMenuTriggerStyle()}
									>{link.label}</a
								>
							{/snippet}
						</NavigationMenu.Link>
					</NavigationMenu.Item>
				{/each}
			</NavigationMenu.List>
		</NavigationMenu.Root>
	</div>

	<div class="flex items-center justify-between gap-x-2">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger class={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}>
				<Moon></Moon>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Group>
					<DropdownMenu.Label>Theme</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>
						<Sun class=""></Sun>
						<span>Light</span>
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<Moon class=""></Moon>
						<span>Dark</span>
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>

		<DropdownMenu.Root>
			<DropdownMenu.Trigger class={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}>
				<Languages></Languages>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Group>
					<DropdownMenu.Label>Languaje</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>English</DropdownMenu.Item>
					<DropdownMenu.Item>Spanish</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</div>
