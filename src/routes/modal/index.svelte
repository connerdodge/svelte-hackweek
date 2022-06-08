<script lang="ts">
  import Modal from './Modal.svelte';
  let modal: any;
</script>

<svelte:head>
	<title>Modal</title>
	<meta name="description" content="A modal user interface" />
</svelte:head>

<section>
  <button class="open-btn" on:click={modal?.openModal}>Open Modal</button>

  <Modal bind:this={modal}>
    <h3 slot="title">Modal Title</h3>
    <p slot="description">This is my modal description</p>
  </Modal>
</section>

<style>
  section {
    display: flex;
    justify-content: center;
    padding-top: 50px;
  }

  .open-btn {
    width: 150px;
    padding: 10px;
    border-radius: 5px;
    background-color: rgb(120, 235, 75);
    cursor: pointer;
    font-weight: bold;
  }

  .open-btn:hover {
    background-color: rgb(110, 225, 65);
  }
</style>