<script lang="ts">
	import Counter from './Counter.svelte';
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
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>