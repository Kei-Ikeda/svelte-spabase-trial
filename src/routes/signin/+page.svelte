<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

	let loading = false;
	let email: string;
	let magicEmail: string;
	let password: string;

	const handleLogin = async () => {
		try {
			loading = true;
			const { error } = await supabase.auth.signInWithPassword({ email, password });
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

	const handleMagicLogin = async () => {
		try {
			loading = true;
			const { error } = await supabase.auth.signInWithOtp({ email: magicEmail });
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

<div class="text-center">
	<h1 class="header">Supabase + SvelteKit</h1>
</div>

<form class="row flex-center flex" on:submit|preventDefault={handleMagicLogin}>
	<div class="col-6 form-widget">
		<p class="description">Sign in via magic link with your email below</p>
		<div>
			<input class="inputField" type="email" placeholder="Your email" bind:value={magicEmail} />
		</div>
		<div>
			<input
				type="submit"
				class="button block"
				value={loading ? 'Loading' : 'send magic link'}
				disabled={loading}
			/>
		</div>
	</div>
</form>

<form class="row flex-center flex" on:submit|preventDefault={handleLogin}>
	<div class="col-6 form-widget">
		<p class="description">Sign in with your email & password</p>
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
				value={loading ? 'Loading' : 'Sign In'}
				disabled={loading}
			/>
		</div>
	</div>
</form>
<div>or</div>
<div>
	<a href="/signup">
		<button type="button" class="" value={'Sign up'}>signup</button>
	</a>
</div>

<style>
</style>
