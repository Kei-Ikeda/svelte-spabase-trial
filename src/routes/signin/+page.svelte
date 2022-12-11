<script lang="ts">
	import { supabase } from '$lib/supabaseClient/';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import Button from 'src/components/buttons/fillButton/component.svelte';

	let loading = false;
	let email: string;
	let magicEmail: string;
	let password: string;

	$: {
		$page.data.session && goto('/account', { replaceState: true });
	}

	const handleLogin = async () => {
		try {
			loading = true;
			const { error } = await supabase.auth.signInWithPassword({ email, password });
			if (error) throw error;
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

<div class="p-5">
	<h1 class="text-3xl font-bold underline text-white text-center mb-6">
		Supabase + SvelteKit Trial !
	</h1>
	<div class="flex flex-col gap-y-5 max-w-sm mx-auto">
		<form on:submit|preventDefault={handleMagicLogin}>
			<div class="flex flex-col gap-y-4">
				<div class="flex flex-col gap-y-2">
					<p class="text-white">★ Sign in via magic link with your email below</p>
					<div>
						<input
							class="p-1 w-full"
							type="email"
							placeholder="Your email"
							bind:value={magicEmail}
						/>
					</div>
				</div>
				<div>
					<Button
						text="sign in"
						type="submit"
						bgColor="green"
						clickHandler={() => undefined}
						disabled={false}
					/>
				</div>
			</div>
		</form>

		<form on:submit|preventDefault={handleLogin}>
			<div class="flex flex-col gap-y-4">
				<div class="flex flex-col gap-y-2">
					<p class="text-white">Sign in with your email & password (Legacy)</p>
					<div>
						<input class="w-full p-1" type="email" placeholder="Your email" bind:value={email} />
					</div>
					<div>
						<input
							class="w-full p-1"
							type="password"
							placeholder="password"
							bind:value={password}
						/>
					</div>
				</div>
				<div class="flex gap-x-4 items-center">
					<Button
						text="sign in"
						type="submit"
						bgColor="green"
						clickHandler={() => undefined}
						disabled={false}
					/>
					<p class="text-white">or</p>
					<a href="/signup" class="w-full">
						<Button
							text="sign up"
							type="button"
							bgColor={undefined}
							clickHandler={() => undefined}
							disabled={false}
						/>
					</a>
				</div>
			</div>
		</form>
	</div>
</div>

<style>
</style>
