<script lang="ts">
	// import { page } from '$app/stores';
	// import { goto } from '$app/navigation';
	import { onMount, beforeUpdate, afterUpdate } from 'svelte';
	import { createForm } from 'felte';
	import Button from 'src/components/buttons/fillButton/component.svelte';

	let count: number = 0;
	let countDoubled: number = 0;
	let disabled: boolean = true;
	let canNotSelectEnableDecrementButton: boolean = true;

	const { form, data, errors, isDirty } = createForm({
		validate: (values) => {
			const errors: any = {};
			if (!values.password) errors.password = ['Must not be empty', 'Must be over 8 characters'];
			if (values.password && values.password.length < 8) {
				errors.password = ['Must be over 8 characters'];
			}
			return errors;
		},
		onSubmit: (values) => {
			disabled = values.decrementDisable === 'true' ? true : false;
			console.log('form values', values);
			// ...
		}
	});

  const initState = (_e: MouseEvent) => {
    count = 0;
    disabled = true;
    canNotSelectEnableDecrementButton = true;
    isDirty.set(false);
  }

	$: {
		if ($isDirty && !$errors.password) {
			canNotSelectEnableDecrementButton = false;
		}
		if ($isDirty && $errors.password) {
			canNotSelectEnableDecrementButton = true;
		}
	}

	const incrementCount = (_e: MouseEvent) => {
		count++;
	};

	const decrementCount = (_e: MouseEvent) => {
		count--;
	};

	console.log('script is work');

	onMount(() => {
		console.log('onMount');
		return () => {
			// アンマウント時に実装
			// onDestroyというのもある
		};
	});

	beforeUpdate(() => {
		// determine whether we should auto-scroll
		// once the DOM is updated...
		console.log('disabled', disabled);
		console.log('beforeUpdate');
	});

	afterUpdate(() => {
		// ...the DOM is now in sync with the data
		console.log('afterUpdate');
	});

	// countが更新されるとリアクティブに更新
	$: countDoubled = count * 2;

	// 下に書いたものが優先して評価される？
	$: {
		// 下に書いたものが優先して評価される？
		countDoubled = count * 2;
		console.log('reactive hook work');
		if (countDoubled >= 10) {
			countDoubled = 10;
		}
		if (countDoubled <= -10) {
			countDoubled = -10;
		}
	}
</script>

<div class="p-5">
	<h1 class="text-3xl font-bold underline text-white text-center mb-4">Reactive trial !</h1>
	<div class="flex flex-col items-center gap-y-4 max-w-sm mx-auto">
		<section class="w-full">
			<div class="flex flex-col gap-y-4 w-full">
				<div class="flex flex-col gap-y-2">
					<h2 class="text-white font-bold text-xl">Reactive trial</h2>
					<p class="text-white">count:<span class="inline-block pl-2">{count}</span></p>
					<p class="text-white">
						countDoubled(max ±10):<span
							class={`inline-block pl-2 ${
								countDoubled === 10 || countDoubled === -10 ? 'text-red-500' : ''
							}`}>{countDoubled}</span
						>
					</p>
				</div>
				<div class="flex flex-col gap-y-2">
					<!-- オプショナルのpropsの渡し方は検討 -->
					<div class="flex gap-x-4">
						<Button
							text={'increment'}
							type="button"
							bgColor={undefined}
							clickHandler={incrementCount}
							disabled={false}
						/>
						<Button
							text={'decrement'}
							type="button"
							bgColor="red"
							clickHandler={decrementCount}
							{disabled}
						/>
					</div>
					{#if disabled && (countDoubled === 10 || countDoubled === -10)}
						<p class="text-red-500">
							Oops! countDoubled reached MAX.<br />Defuse password is "01020304".
						</p>
					{/if}
				</div>
				{#if disabled}
					<form use:form>
						<div class="flex flex-col items-start gap-y-2">
							<p class="text-white font-bold">Defuse a decrement button</p>
							<div class="flex flex-col items-start gap-y-1 w-full">
								<input
									type="text"
									name="password"
									placeholder="Enter over 8 characters"
									class="px-1 w-full"
								/>
								<!-- errorsはstoreの為、$errorsで参照する -->
								{#if $errors.password}
									<ul>
										{#each $errors.password as message}
											<li class="text-pink-400 text-sm">{message}</li>
										{/each}
									</ul>
								{/if}
							</div>
							<div class="flex items-start gap-x-2">
								<div class="flex items-center gap-x-2">
									<input
										type="radio"
										id="form-radio-huey"
										name="decrementDisable"
										value={true}
										checked
									/>
									<label for="form-radio-huey" class="text-gray-400">disable</label>
								</div>
								<div class="flex items-center gap-x-2">
									<input
										type="radio"
										id="form-radio-dewey"
										name="decrementDisable"
										value={false}
										disabled={canNotSelectEnableDecrementButton}
									/>
									<label for="form-radio-dewey" class="text-white">Defuse exec</label>
								</div>
							</div>
							<Button
								text={'submit'}
								type="submit"
								bgColor={undefined}
								clickHandler={() => undefined}
								disabled={false}
							/>
						</div>
					</form>
				{/if}
				<div class="flex flex-col items-start gap-y-2">
					<p class="text-white">Real time form data</p>
					<textarea value={JSON.stringify($data)} class="text-xs p-1 w-full h-20" />
				</div>
			</div>
		</section>
		<section class="w-full">
			<div class="w-full flex flex-col gap-y-2">
				<Button
					text="init"
					type="button"
					bgColor="pink"
					clickHandler={initState}
					disabled={false}
				/>
			</div>
			<section />
		</section>
	</div>
</div>
