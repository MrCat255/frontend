{#if $userStore}
  <main>
    <section>
      <h3>Ваши заказы</h3>
      {#if $userStore.orders.length > 0}
        <div class="orders">
          {#each $userStore.orders as order (order.id)}
            <article class="order-card">
              <h4>Заказ №{order.id}</h4>
              <p>Дата: {new Date(order.created_at).toLocaleDateString('ru-RU')}</p>
              <ul>
                {#each order.items as item}
                <li>
                  <span>{item.dish_name} × {item.quantity}</span>
                  <span>{Number(item.dish_price) * Number(item.quantity)} ₽</span>
                </li>
                {/each}
              </ul>
              <div>
                <p>
                  <span>
                    <strong>Итого:</strong> {order.total_price} ₽
                  </span>
                    <strong>{order.status}</strong>
                </p>
              </div>
            </article>
          {/each}
        </div>
      {:else}
        <div>У вас нет заказов</div>
      {/if}
    </section>
  </main>
{:else}
  <main class="anonimus">
    <h2>Онлайн столовая</h2>
    <p>Войдите в систему, чтобы пользоваться сервисом</p>
  </main>
{/if}

<script lang="ts">
  import { userStore } from '$lib/stores/userStore';
</script>

<style>
main.anonimus {
    font-size: x-large;
    text-align: center;
}
ul {
    list-style: none;
    padding: 0;
}
ul li {
    padding: 0.5em 0;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
}
.orders {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1rem;
}
.order-card {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    /* min-width: min-content; */
}
.order-card h4 {
    margin: 0 0 0.5em;
}
.order-card div p {
    display: flex;
    justify-content: space-between;   
}
</style>
