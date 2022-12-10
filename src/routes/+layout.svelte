<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import './styles.css';
	import { page } from '$app/stores';
	import SignIn from './signin/+page.svelte';

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<div class={`bg-gray-900 h-screen overflow-auto`}>
	{#if $page.url.pathname === '/signup'}
		<slot />
	{/if}
	{#if $page.url.pathname !== '/signup'}
		{#if $page.url.pathname !== '/'}
			{#if !$page.data.session}
				<SignIn />
			{:else}
				<slot />
			{/if}
		{/if}
	{/if}
</div>
