import { Button, Form, Input, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../Constants/constants';
import { adminService, logInService, clientService } from '../../Services';
import { alert } from '../../Common/alert';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const LogIn = ({changeToSignIn, logIn}) => {

  let navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { UserRole, ...user } = values;
    try {
      const response = await logInService.logIn(UserRole, user);
      const service = UserRole === ROLES.ADMIN ? adminService : clientService;
      const id = await service.getId(user.Username);
      if (response.status === 200) {
        const { data } = response;
        const token = `bearer ${data}`;
        localStorage.setItem(process.env.REACT_APP_SESSION_TOKEN_KEY, token);
        localStorage.setItem("username", user.Username);
        localStorage.setItem("id", id);
        const pageToGo = UserRole === ROLES.ADMIN ? '/admin' : '/client';
        logIn(true);
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
        initialValues={{
          remember: true,
        }}
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
          <Input prefix={<UserOutlined />} placeholder="Username" />
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
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          label='Role'
          name='UserRole'
          rules={[
            {
              required: true,
              message: 'Please select a role!'
            },
          ]}
        >
          <Radio.Group>
            <Radio value={ROLES.ADMIN}>Admin</Radio>
            <Radio value={ROLES.CLIENT}>Client</Radio>
          </Radio.Group>
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
          <Form.Item>
            Or <button className='button-link' onClick={changeToSignIn}>register now!</button>
          </Form.Item>
        </Form.Item>

      </Form>
    </div>
  );
//<a href="/signin">register now!</a>
}

export default LogIn;