<script>
	import Chat from 'carbon-icons-svelte/lib/Chat.svelte';
	import GameConsole from 'carbon-icons-svelte/lib/GameConsole.svelte';
	import UserProfileAlt from 'carbon-icons-svelte/lib/UserProfileAlt.svelte';
	import SidebarWidgetToggle from './SidebarWidgetToggle.svelte';
</script>

<div class="flex flex-col h-full gap-2 px-2 py-4 border-r border-base-800">
	<SidebarWidgetToggle widget="roll" title="Dice roller">
		<GameConsole size={20} />
	</SidebarWidgetToggle>
	<SidebarWidgetToggle widget="message" title="Messages">
		<Chat size={20} />
	</SidebarWidgetToggle>
	<SidebarWidgetToggle widget="user" title="Active users">
		<UserProfileAlt size={20} />
	</SidebarWidgetToggle>
</div>
