<script>
	import Persona from '$lib/components/persona/Persona.svelte';
	import Popover from '$lib/components/surfaces/Popover.svelte';

	export let user;

	let open = false;

	function toggleOpen() {
		open = !open;
	}
</script>

<Popover bind:open triggerType="hover">
	<Persona
		slot="trigger"
		onclick={toggleOpen}
		letters={user?.username?.slice(0, 2)}
		color={user?.color}
	/>
	<svelte:fragment slot="content">
		<div class="-mx-6 mb-4 px-6 pb-4 border-b border-base-800">
			<div>Username</div>
			<div class="font-medium text-focus">{user?.username}</div>
		</div>
		<div class="-mx-6 -mb-4 px-6 pb-4 rounded-b-md border-b border-base-800">
			<div>Nickname</div>
			<div class="font-medium text-focus">{user?.nickname}</div>
		</div>
	</svelte:fragment>
</Popover>
