import AdminRequestItem from "./AdminRequestItem";
import { List } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { adminService } from "../../Services";
import { RequestStatusIndex } from "../../Constants/constants";

const AdminRequests = (props) => {

  const [requests, setRequests] = useState([]);
  const typeOfRequests = props.type;

  const getProcessedRequests = useCallback(
    async () => {
      const rawRequests = await retrieveRawRequests();
      let processedRequests = [];
      for (let i = 0; i < rawRequests.length; i++) {
        const requestBelongsHere = rawRequests[i].status === RequestStatusIndex[typeOfRequests];
        if (!requestBelongsHere) continue;
        const vehiclePromise = adminService.getOwnedVehicle(rawRequests[i].vehicleId);
        const clientPromise = adminService.getClient(rawRequests[i].clientId);
        await Promise.all([vehiclePromise, clientPromise]).then((values) => {
          const [vehicle, client] = values;
          processedRequests.push(convertRawRequest(rawRequests[i], vehicle, client));
        });
      }
      setRequests(processedRequests);
    }, [typeOfRequests]
  );

  const convertRawRequest = (rawRequest, vehicle, client) => {
    return {
      id: rawRequest.id,
      status: rawRequest.status,
      type: vehicle.type,
      model: vehicle.model,
      plate: vehicle.plate,
      requester: client.fullName,
      time: `${rawRequest.daysOfRent} days and ${rawRequest.hoursOfRent} hours`
    }
  }

  const retrieveRawRequests = async () => await adminService.getRequestsOfOwnedVehicles(localStorage.getItem("username"));

  useEffect(()=>{
    getProcessedRequests();
  }, [typeOfRequests, getProcessedRequests]);

  const acceptRequest = async (id, accept) => {
    await adminService.acceptRequest(id, accept);
    getProcessedRequests();
  }

  const finishRequest = async (id) => {
    await adminService.finishRequest(id);
    getProcessedRequests();
  }

  return (
    <List className="list"
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={requests}
      renderItem={request => (
        <AdminRequestItem request={request} acceptRequest={acceptRequest} finishRequest={finishRequest} />
      )}
    />
  );
}

export default AdminRequests;