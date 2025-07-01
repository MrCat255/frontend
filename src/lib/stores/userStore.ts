import { writable } from 'svelte/store';

// Интерфейсы для типов данных
export interface OrderItem {
  dish_name: string;
  dish_price: string;
  quantity: number;
}

export interface Order {
  id: number;
  status: string;
  created_at: string;
  total_price: string;
  items: OrderItem[];
}

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  role: string;
  orders: Order[];
}

// Создаём кастомный стор с методами загрузки и управления состоянием
function createUserStore() {
  const { subscribe, set, update } = writable<User | null>(null);
  const USER_INFO_URL = 'http://localhost:8000/api/v1/get_user_info';

  return {
    subscribe,
    // Загрузка данных пользователя из API
    async loadUser(apiUrl: string = USER_INFO_URL) {
      try {
        const res = await fetch(apiUrl, { credentials: 'include' });
        if (!res.ok) {
          throw new Error(`Ошибка ${res.status}`);
        }
        const data: User = await res.json();
        set(data);
      } catch (err) {
        set(null);
      }
    },
    // Прямое установление данных
    setUser(user: User) {
      set(user);
    },
    // Очистка при логауте
    clearUser() {
      set(null);
    },
    // Обновление части данных пользователя
    updateUser(fn: (user: User) => User) {
      update(user => user ? fn(user) : user);
    }
  };
}

export const userStore = createUserStore();
