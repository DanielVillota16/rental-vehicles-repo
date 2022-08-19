import { CheckCircleFilled } from '@ant-design/icons';
import { Divider, Button, Modal, notification } from 'antd';
import React, { useState } from 'react';
import { LogIn, SignIn } from '../Pages';

const HomePage = ({ logIn }) => {

  const [loginVisible, setLoginVisible] = useState(false);
  const [signinVisible, setSigninVisible] = useState(false);

  const openNotification = () => {
    notification.open({
      message: 'Your user was created successfully!',
      description: 'Now you can log in',
      icon: <CheckCircleFilled style={{color:"green"}} />
    });
  };

  const signIn = () => {
    setSigninVisible(false);
    setLoginVisible(true);
    openNotification();
  }

  return (
    <div className='homepage'>
      <div className='container'>
        <img alt='logo' src='logo.png' width={350} />
      </div>
      <div style={{ marginTop: 50 }}>
        <Button
          onClick={() => setLoginVisible(true)}
          type='primary'
        >Log In</Button>
        <Divider type='vertical' />
        <Button
          onClick={() => setSigninVisible(true)}
          type='dashed'
        >Sign In</Button>
      </div>
      <div style={{ marginTop: 25 }}>
        <img alt='car gif' src='https://acegif.com/wp-content/uploads/gifs/car-driving-7.gif' width={300} />
      </div>
      <Modal
        title='Log In'
        visible={loginVisible}
        footer={null}
        width={700}
        onCancel={() => setLoginVisible(false)}
        maskClosable={true}
      >
        <LogIn
          changeToSignIn={() => {
            setLoginVisible(false);
            setSigninVisible(true);
          }}
          logIn={logIn}
        />
      </Modal>
      <Modal
        title='Sign In'
        visible={signinVisible}
        footer={null}
        width={700}
        onCancel={() => setSigninVisible(false)}
        maskClosable={true}
      >
        <SignIn
          signIn={signIn}
        />
      </Modal>
    </div>
  );
}

export default HomePage;
