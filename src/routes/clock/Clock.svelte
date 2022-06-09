<svelte:head>
  <link href='https://fonts.googleapis.com/css?family=Orbitron' rel='stylesheet' type='text/css'>
</svelte:head>
<script lang="ts">
  import { onDestroy } from 'svelte';

  let date = new Date();
  const dateInterval = setInterval(() => {
    date = new Date();
  }, 1000);

  $: hours = String(date.getHours()).padStart(2, '0');
  $: minutes = String(date.getMinutes()).padStart(2, '0');
  $: seconds = String(date.getSeconds()).padStart(2, '0');

  onDestroy(() => {
    clearInterval(dateInterval);
  });
</script>

<div class="container">
  <span class="clock">{hours}:{minutes}:{seconds}</span>
</div>


<style>
  .container {
    background-color: #000;
    margin: 10% 0 0 33%;
    max-width: 355px;
    border-radius: 10px;
  }

  .clock {
    color: red;
    width: 100%;
    margin: 0 20px;
    font-size: 64px;
    font-weight: 500;
    font-family: 'Orbitron', sans-serif;
  }
</style>