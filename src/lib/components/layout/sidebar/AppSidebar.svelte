<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { resolve } from '$app/paths';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';
	import {
		NAVIGATION_ITEMS,
		NAVIGATION_GROUP_LABELS,
		NavigationGroup
	} from '$lib/config/navigation';
	import { config } from '$lib/config/app';
	import { toggleMode, mode } from 'mode-watcher';
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import NavMain from './NavMain.svelte';

	const sidebar = Sidebar.useSidebar();

	let { ...restProps }: Omit<ComponentProps<typeof Sidebar.Root>, 'children'> = $props();

	let navMainGroups = $derived.by(() => {
		const mainItems = NAVIGATION_ITEMS.filter((item) => item.group === NavigationGroup.Main).map(
			(item) => ({ title: item.title, icon: item.icon, url: item.to })
		);

		return [{ label: NAVIGATION_GROUP_LABELS[NavigationGroup.Main], items: mainItems }].filter(
			(group) => group.items.length > 0
		);
	});

	afterNavigate(() => {
		if (sidebar.isMobile && sidebar.openMobile) sidebar.setOpenMobile(false);
	});
</script>

<Sidebar.Root collapsible="icon" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton
					size="lg"
					tooltipContent="Home"
					class="group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0!"
				>
					{#snippet child({ props })}
						<a href={resolve('/')} {...props}>
							<div
								class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
							>
								<img src={config.branding.logo} alt="" class="size-4" />
							</div>
							<div class="grid flex-1 text-start text-sm leading-tight">
								<span class="truncate font-semibold">{config.branding.name}</span>
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>

	<Sidebar.Content>
		<NavMain groups={navMainGroups} />
	</Sidebar.Content>

	<Sidebar.Footer>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton tooltipContent="Toggle theme" onclick={toggleMode}>
					{#if mode.current === 'dark'}
						<SunIcon />
						<span>Light mode</span>
					{:else}
						<MoonIcon />
						<span>Dark mode</span>
					{/if}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>

	<Sidebar.Rail />
</Sidebar.Root>
