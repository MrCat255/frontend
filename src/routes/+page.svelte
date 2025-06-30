<div class="root">
    <header>
        <h2>Столовая</h2>
        {#if $user}
        <span>профиль</span>
        {:else}
        <a href="/authorization">войти</a>
        {/if}
    </header>
    {#if $user}
    <main>main page content</main>
    {:else}
    <main class="anonimus">
        <h2>Онлайн столовая</h2>
        <p>Войдите в систему, чтобы пользоваться сервисом</p>
    </main>
    {/if}
</div>

<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  const USER_INFO_URL = 'http://localhost:8000/api/v1/get_user_info';

  // Store for user data
  const user = writable<{ username: string } | null>(null);

  onMount(async () => {
    try {
      const res = await fetch(USER_INFO_URL, {
        method: 'GET',
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        user.set(data);
      } else {
        user.set(null);
      }
    } catch (err) {
      console.error('Error fetching user info:', err);
      user.set(null);
    }
  });
</script>

<style>
:global(body) {
    margin: 0;
    width: 100vw;
    height: 100vh;
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
    height: 100vh;
}
header {
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
main.anonimus {
    font-size: x-large;
}
</style>