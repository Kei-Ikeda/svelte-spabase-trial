<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	// import type { AuthSession } from '@supabase/supabase-js';
	import { supabase } from '$lib/supabaseClient/';
	import Avatar from './Avatar.svelte';

	export let session = $page.data.session;

	let loading = false;
	let username: string | null;
	let website: string | null;
	let avatarUrl: string | null;

	onMount(() => {
		getProfile();
	});

	const getProfile = async () => {
		if (!session) return;
		try {
			loading = true;
			const { user } = session;

			const { data, error, status } = await supabase
				.from('profiles')
				.select(`username, website, avatar_url`)
				.eq('id', user.id)
				.single();

			if (data) {
				username = data.username;
				website = data.website;
				avatarUrl = data.avatar_url;
			}

			if (error && status !== 406) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	};

	async function updateProfile() {
		if (!session) return;
		try {
			loading = true;
			const { user } = session;

			const updates = {
				id: user.id,
				username,
				website,
				avatar_url: avatarUrl,
				updated_at: String(new Date())
			};

			let { error } = await supabase.from('profiles').upsert(updates);

			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	}

	async function signOut() {
		try {
			loading = true;
			let { error } = await supabase.auth.signOut();
			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	}

	async function initPassword() {
		try {
			loading = true;
			let { error } = await supabase.auth.updateUser({ password: '12345678' });
			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	}
</script>

{#if session}
<form class="form-widget" on:submit|preventDefault={updateProfile}>
	<Avatar bind:url={avatarUrl} size={10} on:upload={updateProfile} />
	<div>
		<label for="email">Email</label>
		<input id="email" type="text" value={session.user.email} disabled />
	</div>
	<div>
		<label for="username">Name</label>
		<input id="username" type="text" bind:value={username} />
	</div>
	<div>
		<label for="website">Website</label>
		<input id="website" type="website" bind:value={website} />
	</div>

	<div>
		<input
			type="submit"
			class="button block primary"
			value={loading ? 'Loading...' : 'Update'}
			disabled={loading}
		/>
	</div>

	<div>
		<button class="button block" on:click={signOut} disabled={loading}>Sign Out</button>
	</div>
	<div>
		<button class="button block" on:click={initPassword} disabled={loading}>init password</button>
	</div>
</form>
{/if}
