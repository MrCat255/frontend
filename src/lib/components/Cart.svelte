<script lang="ts">
  import { cartStore, type CartItem } from '$lib/stores/cartStore';
  import { slide } from 'svelte/transition';

  let open = false;
  // Подписываемся на стор
  $: items = $cartStore;
  // Считаем общую сумму
  $: total = items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  ).toFixed(2);

  function increase(item: CartItem) {
    cartStore.updateQuantity(item.id, item.quantity + 1);
  }

  function decrease(item: CartItem) {
    if (item.quantity > 1) {
      cartStore.updateQuantity(item.id, item.quantity - 1);
    } else {
      cartStore.removeItem(item.id);
    }
  }

  function remove(item: CartItem) {
    cartStore.removeItem(item.id);
  }

  async function checkout() {
    try {
      const result = await cartStore.submitOrder();
      alert('Заказ успешно оформлен: ' + JSON.stringify(result));
      open = false;
    } catch (err) {
      alert('Ошибка при оформлении заказа');
      console.error(err);
    }
  }
</script>

<button class="cart-button" on:click={() => (open = !open)}>🛒</button>

{#if open}
  <div class="cart-drawer" transition:slide>
    <h2>Корзина</h2>
    {#if items.length > 0}
      <div class="table">
        {#each items as item}
            <span class="name">{item.name}</span>
            <div class="controls">
                <button on:click={() => decrease(item)}>-</button>
                <span>{item.quantity}</span>
                <button on:click={() => increase(item)}>+</button>
                <button class="remove" on:click={() => remove(item)}>×</button>
            </div>
            <span class="sum">{(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
        {/each}
      </div>
      <div class="cart-footer">
        <div class="total">Итого: {total}</div>
        <button class="checkout" on:click={checkout}>Оформить заказ</button>
      </div>
    {:else}
      <p>Корзина пуста</p>
    {/if}
  </div>
{/if}

<style>
.cart-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
}
.cart-drawer {
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 350px;
  max-height: 70vh;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  overflow-y: auto;
}
.controls button {
  margin: 0 4px;
  background: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  cursor: pointer;
}
.controls .remove {
  margin-left: 8px;
  color: red;
  font-weight: bold;
}
.cart-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}
.checkout {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}
.table {
    display: grid;
    grid-template-columns: auto max-content max-content;
    gap: 15px;
}
.controls span {
    width: max-content;
}
@media (width < 450px) {
    .cart-drawer {
        width: calc(100% - 40px - 32px);
    }
}
</style>
