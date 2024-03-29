import requester from "../services/requester";
import handleAsync from "../services/handleAsync";

import { menuMapper, categoryMapper, menuItemMapper } from "../mappers/menu";
import { userMapper } from "../mappers/user";

import errorBuilderMessage from "../services/errorBuilder";

export async function getMenuData() {
  const [response, error] = await handleAsync(
    requester({
      method: "GET",
      url: process.env.REACT_APP_MENU_API_URL,
    })
  );

  if (error) {
    return [undefined, errorBuilderMessage(error)];
  } else {
    const mappedMenuItems = menuMapper(response.data);
    return [mappedMenuItems, undefined];
  }
}

export async function signIn(username, password) {
  const [response, error] = await handleAsync(
    requester({
      method: "POST",
      url: process.env.REACT_APP_SIGNIN_API_URL,
      data: {
        username,
        password,
      },
    })
  );

  if (error) {
    return [undefined, errorBuilderMessage(error)];
  } else {
    const mappedUser = userMapper(response.data);
    return [mappedUser, undefined];
  }
}

export async function addCategory(name, description) {
  const [response, error] = await handleAsync(
    requester({
      method: "POST",
      url: process.env.REACT_APP_CATEGORY_API_URL,
      data: {
        name,
        description,
      },
    })
  );

  if (error) {
    return [undefined, errorBuilderMessage(error)];
  } else {
    const mappedUser = categoryMapper(response.data);
    return [mappedUser, undefined];
  }
}

export async function addCategoryItem(catId, name, description, price) {
  const [response, error] = await handleAsync(
    requester({
      method: "POST",
      url: process.env.REACT_APP_CATEGORYITEM_API_URL,
      data: {
        catId,
        name,
        description,
        price,
      },
    })
  );

  if (error) {
    return [undefined, errorBuilderMessage(error)];
  } else {
    const mappedUser = menuItemMapper(response.data);
    return [mappedUser, undefined];
  }
}

export async function editCategory(id, name, description) {
  const [response, error] = await handleAsync(
    requester({
      method: "PUT",
      url: process.env.REACT_APP_CATEGORY_API_URL,
      data: {
        id,
        name,
        description,
      },
    })
  );

  if (error) {
    return [undefined, errorBuilderMessage(error)];
  } else {
    const mappedUser = categoryMapper(response.data);
    return [mappedUser, undefined];
  }
}

export async function deleteCategory(id) {
  const [response, error] = await handleAsync(
    requester({
      method: "DELETE",
      url: process.env.REACT_APP_CATEGORY_API_URL,
      data: {
        id,
      },
    })
  );

  if (error) {
    return [undefined, errorBuilderMessage(error)];
  } else {
    return [response.data, undefined];
  }
}
