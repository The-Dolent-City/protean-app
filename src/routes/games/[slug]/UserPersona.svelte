<script>
	import Persona from '$lib/components/Persona.svelte';
	import Popover from '$lib/components/Popover.svelte';

	export let user;

	let open = false;

	function toggleOpen() {
		open = !open;
	}
</script>

<Popover bind:open triggerType="hover">
	<Persona slot="trigger" onclick={toggleOpen} letter={user?.username[0]} color={user?.color} />
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
