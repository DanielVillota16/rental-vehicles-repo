import axios from "axios";
import { apis } from "../../Constants/constants";

function config() {
    return {
        headers:{
            authorization: localStorage.getItem(process.env.REACT_APP_SESSION_TOKEN_KEY),
        }
    }
}

const getRequestsOfOwnedVehicles = async (username) => {
    const response = await axios.get(`${apis.admin}/requests/${username}`, config());
    const { data } = response;
    return data;
}

const acceptRequest = async (id, accept) => {
    const response = await axios.put(`${apis.admin}/request/${id}/${accept}`);
    const {data} = response;
    return data;
}

const getOwnedVehicle = async (id) => {
    const response = await axios.get(`${apis.vehicle}/${id}`);
    const {data} = response;
    return data;
}

const getOwnedVehicles = async (username) => {
    const response = await axios.get(`${apis.admin}/vehicles/${username}`, config());
    const {data} = response;
    return data;
}

const getClient = async (id) => {
    const response = await axios.get(`${apis.client}/${id}`);
    const {data} = response;
    return data;
}

const saveVehicle = async (vehicle) => {
    const response = await axios.post(`${apis.vehicle}/${vehicle.id}`, vehicle);
    const {data} = response;
    return data;
}

const updateVehicle = async (vehicle) => {
    console.log(vehicle);
    const response = await axios.put(`${apis.vehicle}/`, vehicle);
    const {data} = response;
    return data;
}

const deleteVehicle = async (id) => {
    const response = await axios.delete(`${apis.vehicle}/${id}`);
    const {data} = response;
    return data;
}


export const adminService = {
    getRequestsOfOwnedVehicles,
    getOwnedVehicle,
    getClient,
    getOwnedVehicles,
    deleteVehicle,
    saveVehicle,
    updateVehicle,
    acceptRequest
}