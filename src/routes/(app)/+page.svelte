{#if $userStore}
<main>
    <section>
        <h3>ваши заказы</h3>
        <div>
            {#if $userStore.orders.length !== 0}
            <div></div>
            {:else}
            <div>У вас нет заказов</div>
            {/if}
        </div>
    </section>
</main>
{:else}
<main class="anonimus">
    <h2>Онлайн столовая</h2>
    <p>Войдите в систему, чтобы пользоваться сервисом</p>
</main>
{/if}


<script lang="ts">
  import { onMount } from 'svelte';
  import { userStore } from '$lib/stores/userStore';

  
</script>

<style>

main.anonimus {
    font-size: x-large;
}
</style>