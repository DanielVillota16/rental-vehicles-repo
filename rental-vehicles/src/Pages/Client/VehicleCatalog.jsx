import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { RequestStatusIndex } from "../../Constants/constants";
import { clientService } from "../../Services";
import RentVehicleModal from "./RentVehicleModal";

const VehicleCatalog = () => {

  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    getVehicles();
  }, []);

  const getVehicles = async () => {
    const vehicles = await clientService.getVehiclesCatalog(localStorage.getItem("id"));
    setData(vehicles);
  }

  const rent = (item) => {
    setVisible(true);
    setSelectedItem(item);
  }

  const onOk = async (vehicleId, hoursOfRent, daysOfRent) => {
    const request = {
      vehicleId,
      clientId: localStorage.getItem("id"),
      hoursOfRent,
      daysOfRent,
      status:RequestStatusIndex.Pending
    };
    await clientService.postRequest(request);
    setVisible(false);
    setSelectedItem(null);
    getVehicles();
  }

  const onCancel = () => {
    setVisible(false);
    setSelectedItem(null);
  }

  const columns = [
    {
      title: 'Plate',
      dataIndex: 'plate',
      key: 'plate',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Price/Hour',
      dataIndex: 'pricePerHour',
      key: 'pricePerHour',
    },
    {
      title: 'Price/Day',
      dataIndex: 'pricePerDay',
      key: 'pricePerDay',
    },
    {
      title: 'Action',
      key: 'action',
      width: 150,
      align: "center",
      render: (text, record) => {
        return (
          <Button
            icon={<CheckCircleOutlined />}
            type="primary"
            onClick={() => rent(record)}
          >Rent!</Button>
        );
      }
    }
  ];

  return (
    <div className="container">
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={data}
        bordered
        pagination={{
          defaultPageSize: 5,
          total: data.length
        }}
      />
      {visible &&
        <RentVehicleModal
          visible={visible}
          id={selectedItem.id}
          model={selectedItem.model}
          onOk={onOk}
          onCancel={onCancel}
        />
      }
    </div>
  );

}

export default VehicleCatalog;