import { useEffect, useState } from "react";

import { getMenuData } from "../../apis";

export default function Home() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [data, error] = await getMenuData();
    if (error) {
      // show messsage or toast
    } else {
      setMenu(data);
    }
  };

  return JSON.stringify(menu);
}
