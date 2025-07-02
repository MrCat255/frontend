import type { PageLoad } from './$types';
import { dishStore } from '$lib/stores/dishStore';
import { get } from 'svelte/store';

export const load: PageLoad = async ({ params, fetch }) => {
  const { id } = params;
  // Предполагаем, что в каталоге у каждого блюда есть поле `slug`
  const catalog = get(dishStore);
  let dish = catalog.find(d => d.id === Number(id));

  if (!dish) {
    // Если в store не найдено — запрашиваем у API
    const res = await fetch(`/api/v1/get_dish_info/${encodeURIComponent(id)}`);
    if (!res.ok) {
      throw new Error(`Не удалось загрузить блюдо ${id}`);
    }
    dish = await res.json();
  }

  return { dish };
};
