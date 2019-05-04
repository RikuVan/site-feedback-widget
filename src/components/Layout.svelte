<script>
  import { fly } from 'svelte/transition';
</script>

<style>
  div {
    font-size: 13px !important;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-content: space-around;
    z-index: 999999;
    bottom: -50px;
    padding-bottom: 100px;
    right: 100px;
    width: 300px;
    border-radius: 5px 5px 0 0;
    box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.3) !important;
  }

  header,
  main,
  footer {
    margin: auto;
    padding-bottom: 20px;
  }

  header {
    font-family: "Special Elite", sans-serif;
    padding-top: 20px;
  }

</style>

<div in:fly="{{y: 200, duration: 1000}}" out:fly="{{y: 200, duration: 500}}">
  <header>
    <slot name="header" />
  </header>
  <main>
    <slot />
  </main>
  <footer>
    <slot name="footer"/>
  </footer>
</div>