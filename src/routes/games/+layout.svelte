<script>
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/user-store';
	import Grid from '../Grid.svelte';
	import Header from '../Header.svelte';
	import Main from '../Main.svelte';
	import Persona from '../AccountPersona.svelte';

	export let data;

	onMount(() => {
		$user = data?.user;
	});
</script>

<Header>
	{#if $user}
		<Persona />
	{/if}
</Header>
<Main>
	<Grid>
		<slot />
	</Grid>
</Main>
