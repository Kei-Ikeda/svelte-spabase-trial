<script>
	import { page } from '$app/stores';
	import Account from './account/+page.svelte';
	// import Auth from './_Auth.svelte';
  import SignIn from './signin/+page.svelte';
</script>

<svelte:head>
	<title>Supabase + SvelteKit</title>
	<meta name="description" content="SvelteKit using supabase-js v2" />
</svelte:head>

{#if !$page.data.session}
	<SignIn />
{:else}
	<Account session={$page.data.session} />
{/if}
