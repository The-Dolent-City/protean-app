<script>
	import { user } from '$lib/stores/user-store';
	import Grid from '../Grid.svelte';
	import Header from '../Header.svelte';
	import Main from '../Main.svelte';
	import Persona from '../AccountPersona.svelte';
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
