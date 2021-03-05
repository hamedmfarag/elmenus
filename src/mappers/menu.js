export function categoryMapper(category) {
  return {
    id: category.id,
    name: category.name,
    items:
      (category.items &&
        Array.isArray(category.items) &&
        category.items.map((item) => menuItemMapper(item))) ||
      [],
  };
}

function menuItemMapper(item) {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
  };
}

export function menuMapper(data) {
  if (data.length > 0) {
    return data.map((category) => categoryMapper(category));
  }
  return [];
}
