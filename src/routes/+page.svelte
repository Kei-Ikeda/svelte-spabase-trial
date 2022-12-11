<script lang="ts">
	// import { page } from '$app/stores';
	// import { goto } from '$app/navigation';
	import { onMount, beforeUpdate, afterUpdate } from 'svelte';
	import { createForm } from 'felte';
	import Button from 'src/components/buttons/fillButton/component.svelte';
</script>

<svelte:head>
	<title>Supabase + SvelteKit Trial</title>
	<meta name="description" content="SvelteKit using supabase-js v2" />
</svelte:head>

<div class="p-5">
	<h1 class="text-3xl font-bold underline text-white text-center mb-4">
		Supabase + SvelteKit Trial !
	</h1>
	<div class="flex flex-col items-center gap-y-4 max-w-xs mx-auto">
		<section class="w-full">
			<div class="w-full flex flex-col gap-y-2">
				<h2 class="text-white font-bold text-xl">Todo list trial</h2>
				<a href="/signin" class="block w-full">
					<Button
						text="Go Account setting"
						type="submit"
						bgColor="pink"
						clickHandler={() => undefined}
						disabled={false}
					/></a
				>
			</div>
			<section />
		</section>
	</div>
</div>
