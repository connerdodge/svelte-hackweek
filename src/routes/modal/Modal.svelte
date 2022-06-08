<script lang="ts">
  let show = false;
  export function openModal() {
    show = true;
  }
</script>

<div class="background" class:show on:click={() => show = false}></div>
<div class="modal-content" class:show>
  <span on:click={() => show = false} class="close">&times;</span>
  <slot name="title"><h3>Default title</h3></slot>
  <slot name="description"><p>Default description</p></slot>
</div>

<style>
  /* The Modal (background) */
  .background {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }

  /* Modal Content/Box */
  .modal-content {
    display: none;
    position: fixed;
    z-index: 2;
    background-color: #fefefe;
    margin: 10% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    border-radius: 10px;
    width: 50%; /* Could be more or less, depending on screen size */
    filter: drop-shadow(0 0 20px #333);
  }

  /* The Close Button */
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  .show {
    display: block;
  }
</style>