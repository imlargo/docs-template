<script lang="ts">
	import { IsMobile } from '$hooks/is-mobile.svelte';
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import { navigationMenuTriggerStyle } from '$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';

	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import { Code, Languages, Moon, Sun } from '@lucide/svelte';
	import { Button, buttonVariants } from '$components/ui/button';
	import { Separator } from '$components/ui/separator';
	import Search from './Search.svelte';

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

	<div class="flex items-center justify-between gap-x-4">

		<Search></Search>
		
		{@render VDivider()}

		<Button variant="outline" class="flex items-center justify-center gap-x-2 max-w-max">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				class="bi bi-github"
				viewBox="0 0 16 16"
			>
				<path
					d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
				/>
			</svg>
			<span class="text-muted-foreground text-xs">9.1k</span>
		</Button>

		{@render VDivider()}

		<div class="flex max-w-max items-center gap-x-2">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger class={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}>
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
				<DropdownMenu.Trigger class={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}>
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
</div>

{#snippet VDivider()}
	<div class="flex items-center">
		<Separator orientation="vertical" class="h-4"></Separator>
	</div>
{/snippet}
