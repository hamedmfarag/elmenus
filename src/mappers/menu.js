function categoryMapper(category) {
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
  const arr = [];

  if (data && typeof data === "object") {
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const category = data[key];
        arr.push(categoryMapper(category));
      }
    }
  }

  return arr;
}
