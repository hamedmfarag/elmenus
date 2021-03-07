export function categoryMapper(category) {
  return {
    id: category.id,
    name: category.name,
    description: category.description,
    items:
      (category.items &&
        Array.isArray(category.items) &&
        category.items.map((item) => menuItemMapper(item))) ||
      [],
  };
}

export function menuItemMapper(item) {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    image:
      item.image ||
      "https://cdn.iconscout.com/icon/free/png-256/fast-food-1851561-1569286.png",
  };
}

export function menuMapper(data) {
  if (data.length > 0) {
    return data.map((category) => categoryMapper(category));
  }
  return [];
}
