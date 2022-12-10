<script lang="ts">
	export let text: string;
	export let type: 'submit' | 'button';
	export let bgColor: 'blue' | 'red' | 'green' | 'pink' | undefined;
	export let disabled: boolean;
	export let clickHandler: (event: MouseEvent) => void;
</script>

<button
	class={`
  bg-${bgColor ? bgColor : 'blue'}-500
  ${disabled ? '' : `hover:bg-${bgColor ? bgColor : 'blue'}-700`}
  text-white
  font-bold
  py-1
  px-3
  rounded
  w-full
  ${disabled ? 'bg-gray-600' : ''}
  `}
	{type}
	on:click={clickHandler}
	{disabled}
>
	{text}
</button>
