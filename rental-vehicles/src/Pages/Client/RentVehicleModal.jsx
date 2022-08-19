import { Button, Form, Input, Modal } from "antd";

const RentVehicleModal = ({ visible, id, model, onOk, onCancel }) => {

  const [form] = Form.useForm();
  return (
    <Modal
      title={model}
      visible={visible}
      footer={null}
      width={700}
      onCancel={onCancel}
      maskClosable={true}
    >
      <Form
        form={form}
        name="basic"
        wrapperCol={{ span: 18 }}
        layout="vertical"
        onFinish={(values) => onOk(id, values.daysOfRent, values.hoursOfRent)}
        autoComplete="off"
      >
        <Form.Item
          label="Days of rent"
          name="daysOfRent"
          rules={[
            {
              required: true,
              message: 'please enter the number of days',
            },
          ]}
        >
          <Input type={"number"} />
        </Form.Item>
        <Form.Item
          label="Hours of rent"
          name="hoursOfRent"
          rules={[
            {
              required: true,
              message: 'please enter the number of hours',
            },
          ]}
        >
          <Input type={"number"}/>
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
        >
          Save
        </Button>
      </Form>
    </Modal>
  );
}

export default RentVehicleModal;