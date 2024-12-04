import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Input,
  Button,
  Form,
  Space,
  Upload,
  Image,
  Popconfirm,
} from 'antd';
import { Card, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import '../../styles/ExchangeBoard.css';
import Header from '../../components/ExchangeBoard/Header/Header';

const Details = () => {
  const navigate = useNavigate();

  const onBack = () => {
    navigate('/exchange-board');
  };

  const onHome = () => {
    navigate('/');
  };

  let item = null;

  const curData = JSON.parse(localStorage.getItem('boardData'));
  const curUser = JSON.parse(localStorage.getItem('current_user'));
  if (curData !== null) {
    const id = window.location.pathname.split('/').pop();
    item = curData.find((element) => element.id === id);
  }

  const onOrder = () => {
    // if (item.owner === curUser?.id) {
    //   console.log('You cannot order your own item');
    //   return;
    // }

    item.status = 'ordered';
    item.buyer = curUser?.id;
    curData[curData.findIndex((element) => element.id === item.id)] =
      item;
    localStorage.setItem('boardData', JSON.stringify(curData));
  };

  return (
    <div className='outer-container'>
      <div>
        <Header onBack={onBack} onHome={onHome} />
      </div>
      <div
        className='container'
        style={{
          width: '300px',
          margin: '0 auto',
          paddingTop: '50px',
        }}
      >
        <Row justify='center' style={{ marginTop: '20px' }}>
          <Col xs={24} sm={16} md={12} lg={8}>
            <Card title={item.name} bordered={false}>
              <p>{item.description}</p>
              <p>{item.pickup}</p>
              <div>{item.notes}</div>
              <div style={{ textAlign: 'center' }}>
                <img
                  src={item.image}
                  alt='Exchange Item'
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: '300px',
                    borderRadius: '8px',
                    paddingTop: '20px',
                  }}
                />
              </div>
              {item.status !== 'ordered' ? (
                <div
                  style={{ marginTop: '20px', textAlign: 'center' }}
                >
                  <Popconfirm
                    title='Are you sure to order this item?'
                    onConfirm={onOrder}
                    okText='Yes'
                    cancelText='No'
                  >
                    <Button type='primary' htmlType='submit'>
                      Order
                    </Button>
                  </Popconfirm>
                </div>
              ) : null}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Details;
