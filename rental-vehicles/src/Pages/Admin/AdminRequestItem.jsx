import { Avatar, Button, List, Space } from 'antd';
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { images, TYPES } from '../../Constants/constants';
import React from 'react';

const AdminRequestItem = (props) => {

  const { id, status, type, model, plate, requester, time } = props.request;
  const acceptRequest = props.deny;

  const IconText = ({ icon, text, accept }) => (
    <Button
      onClick={acceptRequest(id, accept)}
    >
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    </Button>
  );

  return (
    <List.Item
      key={id}
      actions={[
        <IconText icon={CheckOutlined} text="Approve" accept={true} key="approve" />,
        <IconText icon={CloseOutlined} text="Deny" accept={false} key="deny" />,
      ]}
      extra={
        <img
          width={272}
          alt={type}
          src={images[TYPES[type]].url}
        />
      }
    >
      <List.Item.Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/jon" />}
        title={requester}
        description={`Is requesting your ${model}`}
      />
      {
        <div>
          <p>{`Plate: ${plate}`}</p>
          <p>{`Time requested: ${time}`}</p>
          <p>{`Status: ${status}`}</p>
        </div>
      }
    </List.Item>
  );
}

export default AdminRequestItem;