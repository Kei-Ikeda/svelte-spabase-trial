<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	// import type { AuthSession } from '@supabase/supabase-js';
	import { supabase } from '$lib/supabaseClient/';
	import Avatar from './Avatar.svelte';
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc';

	dayjs.extend(utc)

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
				updated_at: dayjs().format()
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
	<div class="p-5">
		<h1 class="text-3xl font-bold underline text-white text-center mb-6">
			Account Settings
		</h1>
		<div class="flex flex-col gap-y-5 max-w-sm mx-auto">
			<form class="form-widget" on:submit|preventDefault={updateProfile}>
				<div class="flex flex-col gap-y-4">
					<Avatar bind:url={avatarUrl} size={10} on:upload={updateProfile} />
					<div>
						<label class="text-white" for="email">Email</label>
						<input class="p-1" id="email" type="text" value={session.user.email} disabled />
					</div>
					<div>
						<label class="text-white" for="username">Name</label>
						<input class="p-1" id="username" type="text" bind:value={username} />
					</div>
					<div>
						<label class="text-white" for="website">Your website URL</label>
						<input class="p-1" id="website" type="website" bind:value={website} />
					</div>

					<div>
						<input
							type="submit"
							class="text-white bg-blue-500 cursor-pointer rounded py-1 px-2"
							value={loading ? 'Loading...' : 'Update your profile'}
							disabled={loading}
						/>
					</div>

					<div>
						<button class="text-white bg-red-500 cursor-pointer rounded py-1 px-2" on:click={signOut} disabled={loading}>Sign Out</button>
					</div>
					<div>
						<button class="text-white bg-orange-500 cursor-pointer rounded py-1 px-2" on:click={initPassword} disabled={loading}
							>init password to "12345678"</button
						>
					</div>
				</div>
			</form>
		</div>
	</div>
{/if}
