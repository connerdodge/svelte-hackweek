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

  let clockColors = [{ name: 'Red', value: '#c21515' }, { name: 'Green', value: '#32a852' }, { name: 'Blue', value: '#4254f5' }];
  let selectedColor = clockColors[0];

  onDestroy(() => {
    clearInterval(dateInterval);
  });
</script>

<div class="color-input-container">
  <h4>Color:</h4>
  {#each clockColors as color}
    <label>
      <input type="radio" bind:group={selectedColor} value={color} />
      {color.name}
    </label>
  {/each}
</div>

<div class="container">
  <span class="clock" style:color={selectedColor.value}>{hours}:{minutes}:{seconds}</span>
</div>

<style>
  .color-input-container {
    display: flex;
    flex-direction: column;
    margin: 50px auto 0;
  }

  .color-input-container h4 {
    margin-bottom: 8px;
  }

  label { 
    font-size: 16px;
    font-weight: 600;
  }
  .container {
    background-color: #000;
    margin: 5% 0 0 32%;
    width: 370px;
    border-radius: 10px;
    display: flex;
  }

  .clock {
    width: 100%;
    margin: 0 auto;
    padding: 0 30px;
    font-size: 64px;
    font-weight: 500;
    font-family: 'Orbitron', sans-serif;
  }
</style>