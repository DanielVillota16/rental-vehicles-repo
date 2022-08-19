import axios from "axios";
import { apis } from "../../Constants/constants";

function config() {
  return {
    headers: {
      authorization: localStorage.getItem(process.env.REACT_APP_SESSION_TOKEN_KEY),
    }
  }
}

const getVehiclesCatalog = async (id) => {
  const response = await axios.get(`${apis.client}/vehicles/${id}`, config());
  const { data } = response;
  return data;
}

const getId = async (username) => {
  const response = await axios.get(`${apis.client}/${username}/id`, config());
  const { data } = response;
  return data;
}

const postRequest = async (request) => {
  const response = await axios.post(`${apis.request}/`, request, config());
  const { data } = response;
  return data;
}

const getRequestsMade = async (username) => {
  const response = await axios.get(`${apis.client}/requests/${username}`, config());
  const { data } = response;
  return data;
}

const cancelRequest = async (id) => {
  const response = await axios.put(`${apis.client}/request/${id}/cancel`, undefined, config());
  const { data } = response;
  return data;
}

export const clientService = {
  getId,
  getVehiclesCatalog,
  postRequest,
  getRequestsMade,
  cancelRequest,
}