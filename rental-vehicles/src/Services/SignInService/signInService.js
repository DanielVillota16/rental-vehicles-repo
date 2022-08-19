import { apis, ROLES } from "../../Constants/constants";
import axios from "axios";

const saveUser = (role, user) => {
  if (role === ROLES.ADMIN) return saveAdmin(user);
  return saveClient(user);
}

const saveClient = (client) => axios.post(apis.client, client);
const saveAdmin = (admin) => axios.post(apis.admin, admin);

export const signInService = {
  saveUser
}