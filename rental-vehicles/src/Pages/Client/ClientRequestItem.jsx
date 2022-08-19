import { Button, List } from 'antd';
import { CheckOutlined } from "@ant-design/icons";
import { images, RequestStatus, RequestStatusIndex, TYPES } from '../../Constants/constants';
import React from 'react';

const ClientRequestItem = (props) => {

  const { id, status, type, model, plate, time } = props.request;
  const cancelRequest = props.cancelRequest;
  const pending = status===RequestStatusIndex.Pending;

  const pendingButtons = [
    <Button onClick={() => cancelRequest(id, true)} icon={<CheckOutlined />} type='danger' >Cancel</Button>,
  ]

//style backgroundColor: '#f5ecdf',
  return (
    <List.Item
      style={{ borderRadius: '10px' }}
      key={id}
      actions={ pending?pendingButtons:null }
      extra={
        <img
          width={200}
          alt={type}
          src={images[TYPES[type]].url}
        />
      }
    >
      <List.Item.Meta
        //avatar={<Avatar src="https://joeschmoe.io/api/v1/jon" />}
        title={`Request #${id}`}
        //description={`Is requesting your ${model}`}
      />
      <div>
        <p><b>Model:</b> {model}</p>
        <p><b>Type:</b> {type}</p>
        <p><b>Plate:</b> {plate}</p>
        <p><b>Time requested:</b> {time}</p>
        <p><b>Status:</b> {RequestStatus[status]}</p>
      </div>
    </List.Item>
  );
}

export default ClientRequestItem;