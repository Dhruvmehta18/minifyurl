import { REDIRECT_SERVICE_URL } from "../config/config";

const getRedirectUrl = (minifyId) => {
  return REDIRECT_SERVICE_URL + "/" + minifyId;
};
export default getRedirectUrl;
