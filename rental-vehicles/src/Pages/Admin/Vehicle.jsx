import { Button, Form, Input } from "antd"
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { alert } from '../../Common/alert';
import { adminService } from "../../Services";

const Vehicle = () => {

  let navigate = useNavigate();
  const [form] = Form.useForm();
  const { vehicleId } = useParams();

  var owner=-1;

  useEffect(() => {
    console.log(vehicleId);
    if(vehicleId){
      getVehicle(vehicleId);
    }
  });

  const getVehicle = async (id) => {
    const data = await adminService.getOwnedVehicle(id);
    console.log(data);
    const {ownerId} = data;
    
    owner=parseInt(ownerId,10);
    console.log("owner: " + owner);
    form.setFieldsValue({
      ...data
    });
  }

  const onFinish = (values) => {
    const vehicle = {
      ...values,
      id: parseInt(vehicleId),
      status: parseInt(values.status),
      ownerId: owner,
    }
    if (vehicleId) {
      editVehicle(vehicle);
    } else {
      saveVehicle(vehicle);
    }
  }

  const editVehicle = async (updatedVehicle) => {
    try {
      await adminService.updateVehicle(updatedVehicle);
      navigate('/admin/vehicles');
    } catch (error) {
      alert.unknownError();
    }
  }

  const saveVehicle = async (newVehicle) => {
    try {
      await adminService.saveVehicle(newVehicle);
      navigate('/admin/vehicles');
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
          <Input />
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
          <Input />
        </Form.Item>
        <Form.Item
          label="Price Per Hour"
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
          label="Price Per Day"
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