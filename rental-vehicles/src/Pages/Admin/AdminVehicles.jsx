import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Divider, Popconfirm, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { adminService } from "../../Services";
import { useNavigate } from 'react-router-dom';

const AdminVehicles = () => {

  let navigate = useNavigate();

  const [data, setData] = useState([]);
  useEffect(() => {
    getVehicles().then((vehicles)=>{
      setData(vehicles);
    });
  }, []);

  const getVehicles = async () => await adminService.getOwnedVehicles(localStorage.getItem("username"));

  function deleteVehicle(id){
    adminService.deleteVehicle(id);
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
    },
    {
      title: 'Price Per Hour',
      dataIndex: 'pricePerHour',
      key: 'pricePerHour',
    },
    {
      title: 'Price Per Day',
      dataIndex: 'pricePerDay',
      key: 'pricePerDay',
    },
    {
      title: 'Action',
      key: "action",
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
    <Table className="container" columns={columns} dataSource={data} />
  );
}

export default AdminVehicles;