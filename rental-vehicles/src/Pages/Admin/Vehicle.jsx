import { Button, Form, Input, Select } from "antd"
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { alert } from '../../Common/alert';
import { VehicleStatus, VehicleTypes } from "../../Constants/constants";
import { adminService } from "../../Services";

const { Option } = Select;

const Vehicle = () => {

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { vehicleId } = useParams();

  const owner = localStorage.getItem("id");

  useEffect(() => {
    if (vehicleId) {
      //getVehicle method code was put here to avoid warnings
      const dataPromise = adminService.getOwnedVehicle(vehicleId);
      dataPromise.then((data) => {
        form.setFieldsValue({
          ...data
        });
      });
    }
  }, [form, vehicleId]);

  //const getVehicle = async (id) => { }

  const onFinish = (values) => {
    const newVehicle = {
      ...values,
      id: vehicleId,
      ownerId: owner
    }
    if (vehicleId) {
      editVehicle(newVehicle);
    } else {
      saveVehicle(newVehicle);
    }
  }

  const editVehicle = async (updatedVehicle) => {
    try {
      await adminService.updateVehicle(updatedVehicle);
      navigate('/admin');
    } catch (error) {
      alert.unknownError();
    }
  }

  const saveVehicle = async (newVehicle) => {
    try {
      await adminService.saveVehicle(newVehicle);
      navigate('/admin');
    } catch (error) {
      alert.unknownError();
    }
  }

  return (
    <div className="container">
      <Form
        form={form}
        name="basic"
        wrapperCol={{ span: 10 }}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Plate"
          name="plate"
          rules={[
            {
              required: true,
              message: 'This field is necessary!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Type"
          name="type"
          rules={[
            {
              required: true,
              message: 'This field is necessary!',
            }
          ]}
        >
          <Select
            allowClear
            showSearch
            placeholder="Select a type"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
          >
            {VehicleTypes.map((type, key) => <Option key={key} value={type}>{type}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item
          label="Model"
          name="model"
          rules={[
            {
              required: true,
              message: 'This field is necessary!',
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
              message: 'This field is necessary!',
            }
          ]}
        >
          <Select
            allowClear
            showSearch
            placeholder="Select a status"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
          >
            {VehicleStatus.map((vehicleStatus, index) => <Option key={index} value={index}>{vehicleStatus}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item
          label="Price/Hour"
          name="pricePerHour"
          rules={[
            {
              required: true,
              message: 'This field is necessary!',
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Price Day"
          name="pricePerDay"
          rules={[
            {
              required: true,
              message: 'This field is necessary!',
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item >
          <Button
            type="primary"
            htmlType="submit"
          >
            Save
          </Button>
          <Button htmlType="button" style={{ margin: '0 8px' }} type="danger" onClick={() => navigate("/courses")}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default Vehicle;