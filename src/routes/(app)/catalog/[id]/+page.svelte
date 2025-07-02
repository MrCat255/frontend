<main class="dish-page">
  <h1>{dish.name}</h1>
  {#if dish.photo}
	<img src={dish.photo} alt={dish.name} class="dish-image" />
  {/if}
  <p class="price">Цена: {dish.price} ₽</p>
	<div class="description">
	  {@html dish.description}
	</div>
  {#if $userStore}
  <button class="add-to-cart" on:click={() => addToCart()}>Добавить в корзину</button>
  {/if}
</main>

<script lang="ts">
	import type { PageData } from './$types';
  import { type Dish } from '$lib/stores/dishStore';
	import { userStore } from '$lib/stores/userStore';
  import { cartStore } from '$lib/stores/cartStore';
	export let data: PageData;

	const dish = data.dish as Dish;

	function addToCart() {
    cartStore.addItem(dish, 1);
  }
</script>

<style>
  .dish-page {
    max-width: 800px;
    margin: 0 auto;
  }

  .dish-image {
    width: 200px;
    height: auto;
    border-radius: 8px;
	margin-right: 20px;
	float: left;
	border: 1px solid #ccc;
  }

  .price {
    font-size: 1.25rem;
    font-weight: bold;
  }

  .description {
    margin: 1rem 0;
    line-height: 1.6;
  }

  .add-to-cart {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 6px;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
  }

  .add-to-cart:hover {
    background-color: #45A049;
  }
</style>
