import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Divider, Popconfirm, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { adminService } from "../../Services";
import { useNavigate } from 'react-router-dom';
import { VehicleStatus } from "../../Constants/constants";

const AdminVehicles = () => {

  let navigate = useNavigate();

  const [data, setData] = useState([]);
  useEffect(() => {
    getVehicles();
  }, []);

  const getVehicles = async () => {
    const vehicles = await adminService.getOwnedVehicles(localStorage.getItem("username"));
    setData(vehicles);
  }

  function deleteVehicle(id) {
    adminService.deleteVehicle(id);
    getVehicles();
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (VehicleStatus[record.status])
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
          <span>
            <Button
              onClick={() => navigate(`/admin/vehicle/${record.id}`)}
              icon={<EditOutlined />}
              type="link"
            />
            <Divider type="vertical" />
            <Popconfirm
              title={"Are you sure you want to delete this vehicle?"}
              onConfirm={(e) => {
                e.stopPropagation();
                deleteVehicle(record.id);
                navigate('/admin/vehicles');
              }}
              onCancel={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              <Tooltip title={"Delete"}>
                <Button
                  icon={<DeleteOutlined />}
                  type="link"
                />
              </Tooltip>
            </Popconfirm>
          </span>
        )
      }
    }
  ];

  return (
    <div className="container">
      <Table 
        rowKey={(record) => record.id}
        columns={columns} 
        dataSource={data} 
      />
      <Button
        type="primary"
        onClick={() => navigate(`/admin/vehicle/new`)}
      >ADD
      </Button>
    </div>

  );
}

export default AdminVehicles;