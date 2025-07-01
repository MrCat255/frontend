import { writable } from 'svelte/store';

export interface Dish {
  id: number;
  name: string;
  description: string;
  photo: string;
  price: string;
  weight: number;
  is_available: boolean;
}

function createDishStore() {
  const { subscribe, set, update } = writable<Dish[]>([]);

  return {
    subscribe,
    // Загрузка списка блюд из API
    async loadDishes(apiUrl: string = '/api/v1/get_dishes_info') {
      try {
        const res = await fetch(apiUrl, { credentials: 'include' });
        if (!res.ok) throw new Error(`Ошибка ${res.status}`);
        const data: Dish[] = await res.json();
        set(data);
      } catch (err) {
        console.error('Ошибка при загрузке блюд:', err);
        set([]);
      }
    },
    // Установить массив блюд вручную
    setDishes(dishes: Dish[]) {
      set(dishes);
    },
    // Очистить список блюд
    clearDishes() {
      set([]);
    },
    // Обновить конкретное блюдо по id
    updateDish(id: number, fn: (dish: Dish) => Dish) {
      update(dishes => dishes.map(d => d.id === id ? fn(d) : d));
    }
  };
}

export const dishStore = createDishStore();
