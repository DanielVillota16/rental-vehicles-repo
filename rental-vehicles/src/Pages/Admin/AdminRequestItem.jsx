import { Avatar, Button, List } from 'antd';
import { CheckCircleOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { images, RequestStatus, RequestStatusIndex, TYPES } from '../../Constants/constants';
import React from 'react';

const AdminRequestItem = (props) => {

  const { id, status, type, model, plate, requester, time } = props.request;
  const acceptRequest = props.acceptRequest;
  const finishRequest = props.finishRequest;

  const pending = status===RequestStatusIndex.Pending;

  const pendingButtons = [
    <Button onClick={() => acceptRequest(id, true)} icon={<CheckOutlined />} type='primary' >Accept</Button>,
    <Button onClick={() => acceptRequest(id, false)} icon={<CloseOutlined />} type='danger' >Deny</Button>
  ]

  const onGoingButton = [
    <Button onClick={() => finishRequest(id)} icon={<CheckCircleOutlined />} type='primary' >Finish</Button>
  ]

  // backgroundColor: '#f5ecdf'
  return (
    <List.Item
      style={{ borderRadius: '10px' }}
      key={id}
      actions={ pending ? pendingButtons: onGoingButton }
      extra={
        <img
          width={200}
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
      <div>
        <p><b>Plate:</b> {plate}</p>
        <p><b>Time requested:</b> {time}</p>
        <p><b>Status:</b> {RequestStatus[status]}</p>
      </div>
    </List.Item>
  );
}

export default AdminRequestItem;