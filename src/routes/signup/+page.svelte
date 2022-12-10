<script lang="ts">
	import { supabase } from '$lib/supabaseClient/';

	import Button from 'src/components/buttons/fillButton/component.svelte';

	let loading = false;
	let email: string;
	let password: string;

	const handleLogin = async () => {
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

<div class="flex flex-col p-5 items-center">
	<h1 class="text-3xl font-bold underline text-white text-center mb-6">
		Supabase + SvelteKit Trial !
	</h1>
	<div class="flex flex-col gap-y-5">
		<form on:submit|preventDefault={handleLogin}>
			<div class="flex flex-col gap-y-4">
				<div class="flex flex-col gap-y-2">
					<p class="text-white">Sign up email & password</p>
					<div>
						<input class="w-full p-1" type="email" placeholder="Your email" bind:value={email} />
					</div>
					<div>
						<input class="w-full p-1" type="password" placeholder="password" bind:value={password} />
					</div>
				</div>
				<div>
					<Button
						text="sign up"
						type="submit"
						bgColor="green"
						clickHandler={() => undefined}
						disabled={false}
					/>
				</div>
			</div>
		</form>
	</div>
</div>
