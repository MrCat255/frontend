<div class="root">
  {#if $dishStore && $dishStore.length > 0}
    <main>
      <div class="grid">
        {#each $dishStore.filter(item => item.is_available) as dish (dish.id)}
          <div class="card">
            <img src={dish.photo} alt={dish.name} />
            <div class="card-content">
              <h2 class="card-title">{dish.name}</h2>
              <p class="card-price">{dish.price} &bull; {dish.weight}g</p>
            </div>
          </div>
        {/each}
      </div>
    </main>
  {:else}
    <p>Нет доступных товаров.</p>
  {/if}
</div>

<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  import { dishStore } from '$lib/stores/dishStore';

  onMount(() => {
    dishStore.loadDishes();
  });
</script>

<style>
.root {
  padding: 20px;
  box-sizing: border-box;
  width: 1200px;
  max-width: 100%;
  height: 100%;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}
.card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
}
.card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}
.card-content {
  padding: 12px;
}
.card-title {
  font-size: 1.1rem;
  margin: 0;
  margin-bottom: 8px;
  color: #333;
}
.card-price {
  font-size: 0.9rem;
  color: #666;
}
</style>