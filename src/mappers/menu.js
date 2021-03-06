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
      "https://w7.pngwing.com/pngs/815/308/png-transparent-sushi-japanese-cuisine-euclidean-vecteur-square-sushi-food-logo-happy-birthday-vector-images.png",
  };
}

export function menuMapper(data) {
  if (data.length > 0) {
    return data.map((category) => categoryMapper(category));
  }
  return [];
}
