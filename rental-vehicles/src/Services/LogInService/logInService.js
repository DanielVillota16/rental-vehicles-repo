import { apis, ROLES } from "../../Constants/constants";
import axios from "axios";

const logIn = (role, user) => {
    if(role === ROLES.ADMIN) return logInAdmin(user);
    return logInClient(user);
}

const logInAdmin = (admin) => axios.post(`${apis.admin}/login`, admin);

const logInClient = (client) => axios.post(`${apis.client}/login`, client);

export const logInService = {
    logIn
}