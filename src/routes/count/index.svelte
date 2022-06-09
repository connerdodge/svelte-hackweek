<script lang="ts">
	import { derived } from 'svelte/store';
	import Counter from './Counter.svelte';
	import { count } from '$stores/count';

	const squaredCount = derived(count, ($count: number) => Math.pow($count, 2));
</script>

<svelte:head>
	<title>Counter</title>
	<meta name="description" content="A counter" />
</svelte:head>

<section>
  <h3>
    Count
  </h3>
  <Counter />

	<p>Derived Count: {$squaredCount}</p>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
	
	p {
		font-size: 18px;
		font-weight: 600;
	}
</style>