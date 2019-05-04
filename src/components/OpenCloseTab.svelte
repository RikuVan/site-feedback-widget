<script>
  import { store } from '../store'

  function onClick() {
    const state = $store.current
    if (current !== 'idle') {
      return store.actions.show()
    }
    return store.actions.close()
  }
</script>

<style>
  a {
    text-align: center;
    position: absolute;
    top: -18px;
    right: 20px;
    width: 40px;
    height: 18px;
    padding-top: 2px;
    cursor: pointer;
    border: 0;
    outline: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
    margin: 0;
    padding: 0;
    float: none !important;
    touch-action: manipulation;
  }
  a::before {
    content: '';
    position: absolute;
    left: -4px;
    right: -4px;
    bottom: -8px;
    height: 8px;
  }
</style>

<a on:click="{onClick}">^</a>
