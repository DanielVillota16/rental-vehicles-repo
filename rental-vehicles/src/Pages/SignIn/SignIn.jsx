import { Button, Form, Input, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { roles } from '../../Constants/constants';
import { signInService } from '../../Services';
import { alert } from '../../Common/alert';

const { Option } = Select;

const SignIn = ({signIn}) => {

  useEffect(() => {
    
  }, []);

  let navigate = useNavigate();
  const [form] = Form.useForm();
  
  const onFinish = (values) => {
    const { UserRole , ...user } = values;
    try {
      signInService.saveUser(UserRole, user);
      signIn();
    } catch (error) {
      console.log(error);
      alert.unknownError("There was an error trying to save your user, please review the fields and try again.");
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
          label="Full Name"
          name="FullName"
          rules={[
            {
              required: true,
              message: 'Please input your full name!'
            },
            {
              max: 80,
              message: 'Name must be maximum 80 characters.'
            },
            {
              pattern: /^([A-Z]|[À-ÿ])[a-zA-ZÀ-ÿ\u00f1\u00d1]{2,}(?: ([A-Z]|[À-ÿ])[a-zA-ZÀ-ÿ\u00f1\u00d1]{2,}){1,4}$/,
              message: 'Please enter a valid name!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Legal ID Number"
          name="LegalIdNumber"
          rules={[
            {
              required: true,
              message: 'Please input your legal id number!'
            },
            {
              max: 20,
              message: 'Name must be maximum 20 digits.'
            },
            {
              pattern: /^\d{1,20}$/,
              message: 'Please enter a valid id number!'
            }
          ]}
        >
          <Input />
        </Form.Item>

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
          name="PasswordHash"
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
          label="Email"
          name="Email"
          rules={[
            {
              type: 'email',
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="PhoneNumber"
          rules={[
            {
              pattern: /\d{10}/,
              message: 'Your phone must be 10 digits long.'
            }
          ]}
        >
          <Input />
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
            placeholder="Select a role"
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
            Save
          </Button>
          <Button
            type="danger"
            htmlType="button"
            style={{ margin: '0 8px' }}
            onClick={() => navigate("/homepage")}
          >
            Cancel
          </Button>
        </Form.Item>

      </Form>

    </div>
  );
}

export default SignIn;