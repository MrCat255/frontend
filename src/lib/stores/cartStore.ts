import { writable, get } from 'svelte/store';
import type { Dish } from './dishStore';
import { userStore } from './userStore';

export interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
}

function createCartStore() {
  const { subscribe, set, update } = writable<CartItem[]>([]);

  return {
    subscribe,
    // Добавить блюдо в корзину или увеличить количество
    addItem(dish: Dish, amount: number = 1) {
      update(items => {
        const idx = items.findIndex(i => i.id === dish.id);
        if (idx !== -1) {
          // если уже есть — увеличиваем количество
          items[idx].quantity += amount;
          return [...items];
        }
        // иначе добавляем новое
        return [...items, { id: dish.id, name: dish.name, price: dish.price, quantity: amount }];
      });
    },
    // Удалить блюдо из корзины
    removeItem(id: number) {
      update(items => items.filter(i => i.id !== id));
    },
    // Обновить количество конкретного блюда
    updateQuantity(id: number, quantity: number) {
      update(items =>
        items.map(i => (i.id === id ? { ...i, quantity } : i))
      );
    },
    // Очистить корзину
    clearCart() {
      set([]);
    },
    // Получить общую сумму
    getTotal(): number {
      return get({ subscribe }).reduce(
        (sum, item) => sum + parseFloat(item.price) * item.quantity,
        0
      );
    },
    // Отправить заказ на API и очистить корзину при успехе
    async submitOrder(apiUrl: string = '/api/v1/set_order') {
      const items = get({ subscribe });
      if (items.length === 0) {
        throw new Error('Корзина пуста');
      }
      try {
        const payload = { items: items.map(({ id, quantity }) => ({ dish_id: id, quantity })) };
        const res = await fetch(apiUrl, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) {
          throw new Error(`Ошибка при оформлении заказа: ${res.status}`);
        }
        const data = await res.json();
        // При успешном оформлении очищаем корзину
        set([]);
        userStore.loadUser();
        return data;
      } catch (err) {
        console.error('Submit order failed', err);
        throw err;
      }
    }
  };
}

export const cartStore = createCartStore();
