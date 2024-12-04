import React from 'react';
import { Button, Popconfirm, message } from 'antd';
import { Card, Row, Col } from 'antd';
import '../../styles/ExchangeBoard.css';
import Header from '../../components/ExchangeBoard/Header/Header';
import { getPhoto } from '../../utils/indexedDB';

const Details = () => {
  let item = null;
  const curData = JSON.parse(localStorage.getItem('boardData'));
  const curUser = JSON.parse(localStorage.getItem('current_user'));
  if (curData !== null) {
    const id = window.location.pathname.split('/').pop();
    item = curData.find((element) => element.id === id);
  }

  const [photo, setPhoto] = React.useState('');
  React.useEffect(() => {
    const func = async () => {
      if (item !== null) {
        const photo = await getPhoto(item.image);
        setPhoto(photo);
      }
    };
    func();
  }, []);

  const onOrder = () => {
    if (item.owner === curUser?.id) {
      message.error('You cannot order your own item');
      return;
    }

    if (item.status === 'ordered') {
      message.success('This item has already been ordered');
      return;
    }

    item.status = 'ordered';
    item.buyer = curUser?.id;
    curData[curData.findIndex((element) => element.id === item.id)] =
      item;
    localStorage.setItem('boardData', JSON.stringify(curData));
    message.success('Item ordered successfully');
  };

  return (
    <div className='outer-container'>
      <div>
        <Header />
      </div>
      <div
        className='container'
        style={{
          margin: '0 auto',
          paddingTop: '50px',
        }}
      >
        <Row justify='center' style={{ marginTop: '20px' }}>
          <Col xs={24} sm={16} md={12} lg={8}>
            <Card
              title={item.name}
              bordered={false}
              style={{ width: '100%' }}
            >
              <p>{item.description}</p>
              <p style={{ color: 'gray' }}>
                Please pick up at {item.pickup}
              </p>
              <div style={{ fontWeight: 'bold' }}>{item.notes}</div>
              <div style={{ textAlign: 'center' }}>
                <img
                  src={photo}
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
              <div>Owner: {item.owner} </div>
              {item.status === 'ordered' ? (
                <div>Buyer: {item.buyer}</div>
              ) : null}
              {item.status !== 'ordered' ? (
                item.owner !== curUser?.id ? (
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
                ) : null
              ) : null}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Details;
