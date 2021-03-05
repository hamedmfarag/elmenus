import requester from "../services/requester";
import handleAsync from "../services/handleAsync";

import { menuMapper } from "../mappers/menu";
import { userMapper } from "../mappers/user";

export async function getMenuData() {
  const [response, error] = await handleAsync(
    requester({
      method: "GET",
      url: process.env.REACT_APP_MENU_API_URL,
    })
  );

  if (error) {
    return [undefined, error];
  } else {
    const mappedMenuItems = menuMapper(response.data?.categories);
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
    return [undefined, error];
  } else {
    const mappedUser = userMapper(response.data);
    return [mappedUser, undefined];
  }
}
