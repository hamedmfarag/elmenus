import i18n from "../../i18n";

export default function errorBuilder(error) {
  if (
    error &&
    error.response &&
    error.response.data &&
    error.response.data.code
  ) {
    switch (error.response.data.code) {
      case 100:
        return i18n.t("COMMON.REQUIRED");

      case 101:
        return i18n.t("ADMIN.ADDCATEGORY.ALREADYEXIST");

      case 102:
        return i18n.t("SIGNIN.PAGE.USERORPASSNOTFOUND");

      default:
        return i18n.t("COMMON.SERVER.ERROR");
    }
  }

  return i18n.t("COMMON.SERVER.ERROR");
}
