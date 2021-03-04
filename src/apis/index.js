import requester from "../services/requester";
import handleAsync from "../services/handleAsync";

import { menuMapper } from "../mappers/menu";

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
