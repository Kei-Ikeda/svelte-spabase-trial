<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let loading = false;
	let email: string;
	let password: string;

	onMount(() => {
		console.log($page.data);
	});

	const handleLogin = async () => {
		// try {
		//   loading = true
		//   const { error } = await supabase.auth.signInWithOtp({ email })
		//   if (error) throw error
		//   alert('Check your email for the login link!')
		// } catch (error) {
		//   if (error instanceof Error) {
		//     alert(error.message)
		//   }
		// } finally {
		//   loading = false
		// }
		try {
			loading = true;
			const { error } = await supabase.auth.signUp({ email, password });
			if (error) throw error;
			alert('Check your email for the login link!');
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	};
</script>

<form class="row flex-center flex" on:submit|preventDefault={handleLogin}>
	<div class="col-6 form-widget">
		<h1 class="header">Supabase + SvelteKit</h1>
		<p class="description">Sign in via magic link with your email below</p>
		<div>
			<input class="inputField" type="email" placeholder="Your email" bind:value={email} />
		</div>
		<div>
			<input class="inputField" type="password" placeholder="password" bind:value={password} />
		</div>
		<div>
			<input
				type="submit"
				class="button block"
				value={loading ? 'Loading' : 'Sign up'}
				disabled={loading}
			/>
		</div>
	</div>
</form>
