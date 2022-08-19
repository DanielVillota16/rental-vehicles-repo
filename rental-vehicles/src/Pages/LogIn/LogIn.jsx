import { Button, Form, Input, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { ROLES, roles } from '../../Constants/constants';
import { logInService } from '../../Services';
import { alert } from '../../Common/alert';

const { Option } = Select;

const LogIn = () => {

  useEffect(() => {

  }, []);

  let navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { UserRole , ...user } = values;
    try {
      const response = await logInService.logIn(UserRole, user);
      if(response.status===200){
        const { data } = response;
        const token = `bearer ${data}`;
        localStorage.setItem(process.env.REACT_APP_SESSION_TOKEN_KEY, token);
        localStorage.setItem("username", user.Username);
        const pageToGo = UserRole === ROLES.ADMIN ? '/admin/' : '/client';
        navigate(pageToGo);
      } else {
        alert.unknownError("Unsuccessful login! Review your username and password and try again.");
      }
    } catch (error) {
      alert.unknownError("There was an unexpected error when trying to login! Try later.");
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
          label="Username"
          name="Username"
          rules={[
            {
              required: true,
              message: 'Please input the name!'
            },
            {
              pattern: /^\w{8,20}$/,
              message: 'Valid usernames allow from 8 up to 20 alphanumerical characters, dots (.), dashes (-) and underscores (_).'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            },
            {
              min: 8,
              message: 'Name must be minimum 8 characters.'
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Role"
          name="UserRole"
          rules={[
            {
              required: true,
              message: 'Please select a role!'
            }
          ]}
        >
          <Select
            allowClear
            showSearch
            placeholder="Select an option"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
          >
            {roles.map((item, key) => <Option key={key} value={item.id}>{item.name}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item >
          <Button
            type="primary"
            htmlType="submit"
          >
            Login
          </Button>
          <Button
            type="danger"
            htmlType="button"
            style={{ margin: '0 8px' }}
            onClick={() => navigate("/homepage")}
          >
            Go Back
          </Button>
        </Form.Item>

      </Form>

    </div>
  );

}

export default LogIn;