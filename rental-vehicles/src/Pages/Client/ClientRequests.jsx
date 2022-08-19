import { List } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { adminService, clientService } from "../../Services";
import { RequestStatusIndex } from "../../Constants/constants";
import ClientRequestItem from "./ClientRequestItem";

const ClientRequests = (props) => {

  const [requests, setRequests] = useState([]);
  const typeOfRequests = props.type;

  const getProcessedRequests = useCallback(
    async () => {
      const rawRequests = await retrieveRawRequests();
      let processedRequests = [];
      for (let i = 0; i < rawRequests.length; i++) {
        const requestBelongsHere = rawRequests[i].status === RequestStatusIndex[typeOfRequests];
        if (!requestBelongsHere) continue;
        const vehicle = await adminService.getOwnedVehicle(rawRequests[i].vehicleId);
        processedRequests.push(convertRawRequest(rawRequests[i], vehicle));
      }
      setRequests(processedRequests);
    }
    , [typeOfRequests]
  );

  const convertRawRequest = (rawRequest, vehicle) => {
    return {
      id: rawRequest.id,
      status: rawRequest.status,
      type: vehicle.type,
      model: vehicle.model,
      plate: vehicle.plate,
      time: `${rawRequest.daysOfRent} days and ${rawRequest.hoursOfRent} hours`
    }
  }

  const retrieveRawRequests = async () => await clientService.getRequestsMade(localStorage.getItem("username"));

  useEffect(() => {
    getProcessedRequests();
  }, [typeOfRequests, getProcessedRequests]);

  const cancelRequest = async (id) => {
    await clientService.cancelRequest(id);
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
        <ClientRequestItem request={request} cancelRequest={cancelRequest} />
      )}
    />
  );
}

export default ClientRequests;