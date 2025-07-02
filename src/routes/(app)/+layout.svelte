<div class="root">
    <header>
        <div>
            <a href="/">Столовая</a>
            <a href="/catalog">каталог</a>
        </div>
        {#if $userStore}
        <a href="/profile">профиль</a>
        {:else}
        <a href="/authorization">войти</a>
        {/if}
    </header>
    {#if $userStore}
    <Cart/>
    {/if}
    {@render children()}
</div>


<script lang="ts">
  import { userStore } from '$lib/stores/userStore';
  import { onMount } from 'svelte';
  import Cart from '$lib/components/Cart.svelte';

  let { children } = $props();

  onMount(() => {
    userStore.loadUser();
  });
</script>


<style>
:global(body) {
    margin: 0;
    min-width: 100vw;
    min-height: 100vh;
    background-color: #efefef;
    display: flex;
    justify-content: center;
}
.root {
    padding: 20px;
    box-sizing: border-box;
    width: 1200px;
    max-width: 100%;
    background-color: white;
    /* height: 100vh; */
}
header {
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
header > div {
    display: flex;
    gap: 10px;
    align-items: center;
}
</style>