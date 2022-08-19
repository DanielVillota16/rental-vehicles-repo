import AdminRequestItem from "./AdminRequestItem";
import { List } from "antd";
import React, { useEffect, useState } from "react";
import { adminService } from "../../Services";

const AdminRequests = () => {

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    retrieveRawRequests().then(async (rawRequests) => {
      console.log(rawRequests);
      for (let i = 0; i < rawRequests.length; i++) {
        const vehicle = await adminService.getOwnedVehicle(rawRequests[i].vehicleId);
        const client = await adminService.getClient(rawRequests[i].clientId);
        rawRequests[i] = {
          id: rawRequests[i].id,
          status: rawRequests[i].status,
          type: vehicle.type,
          model: vehicle.model,
          plate: vehicle.plate,
          requester: client.fullName,
          time: `${rawRequests[i].daysOfRent} days and ${rawRequests[i].hoursOfRent} hours`
        }
      }
      setRequests(rawRequests);
    });
  }, []);

  const retrieveRawRequests = async () => await adminService.getRequestsOfOwnedVehicles(localStorage.getItem("username"));

  const acceptRequest = async (id, accept) => {
    await adminService.acceptRequest(id,accept);
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
      footer={
        <div>
          continue...
        </div>
      }
      renderItem={request => (
        <AdminRequestItem request={request} acceptRequest={acceptRequest} />
      )}
    />
  );
}

export default AdminRequests;