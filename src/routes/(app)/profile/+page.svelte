<script lang="ts">
  import { onMount } from 'svelte';
  import { userStore, type User } from '$lib/stores/userStore';
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';

  let user: User | null = null;
  let editMode = false;
  let loading = false;
  let error = '';
  let success = '';

  // Локальная копия данных для формы
  let form = {
    username: '',
    first_name: '',
    last_name: '',
  };

  // Подписываемся на стор пользователя
  userStore.subscribe(value => {
    user = value;
    if (user) {
      form = {
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
      };
    }
  });

  async function save() {
    if (!user) return;
    loading = true;
    error = '';
    success = '';
    try {
      const res = await fetch('/api/v1/update_user', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error(`Ошибка ${res.status}`);
      const data: User = await res.json();
      userStore.setUser(data);
      success = 'Данные успешно обновлены.';
      editMode = false;
    } catch (e) {
      console.error(e);
      error = 'Не удалось обновить данные.';
    } finally {
      loading = false;
    }
  }

  function cancel() {
    if (user) {
      form = {
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
      };
    }
    error = '';
    success = '';
    editMode = false;
  }

  // Выход из системы
  async function logout() {
    try {
      const res = await fetch('/api/v1/logout', {
        method: 'POST',
        credentials: 'include'
      });
      if (!res.ok) throw new Error(`Ошибка ${res.status}`);
      userStore.clearUser();
      goto('/authorization');
    } catch (e) {
      console.error('Logout failed:', e);
      error = 'Не удалось выйти из системы.';
    }
  }
</script>

<svelte:head>
  <title>Профиль пользователя</title>
</svelte:head>

<div class="profile-container">
  {#if !user}
    <p>Загрузка данных профиля...</p>
  {:else}
    <h1>Профиль</h1>
    {#if error}
      <p class="error">{error}</p>
    {/if}
    {#if success}
      <p class="success">{success}</p>
    {/if}
    <div class="profile-info">
      {#if editMode}
        <label>
          Username:
          <input type="text" bind:value={form.username} />
        </label>
        <label>
          Имя:
          <input type="text" bind:value={form.first_name} />
        </label>
        <label>
          Фамилия:
          <input type="text" bind:value={form.last_name} />
        </label>
      {:else}
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Имя:</strong> {user.first_name}</p>
        <p><strong>Фамилия:</strong> {user.last_name}</p>
        <p><strong>Роль:</strong> {user.role}</p>
      {/if}
    </div>
    <div class="buttons">
      {#if editMode}
        <button on:click={save} disabled={loading}>
          {#if loading}Сохранение...{:else}Сохранить{/if}
        </button>
        <button on:click={cancel} disabled={loading}>Отмена</button>
      {:else}
        <button on:click={() => (editMode = true)}>Редактировать</button>
      {/if}
      <!-- Кнопка выхода всегда доступна -->
      <button class="logout" on:click={logout}>Выйти</button>
    </div>
  {/if}
</div>

<style>
.profile-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.profile-info p {
  margin: 8px 0;
}
label {
  display: block;
  margin: 10px 0;
}
input {
  width: 100%;
  padding: 6px 8px;
  margin-top: 4px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.buttons {
  margin-top: 20px;
}
button {
  margin-right: 8px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.error {
  color: red;
}
.success {
  color: green;
}
.logout {
  background-color: #dc3545;
  color: white;
}
</style>
