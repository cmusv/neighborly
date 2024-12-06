import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Input,
  Button,
  Card,
  Tag,
  Popconfirm,
  Modal,
  Space,
  Form,
  message,
} from 'antd';
import '../../styles/ExchangeBoard.css';
import Header from '../../components/ExchangeBoard/Header/Header';

const Orders = () => {
  const navigate = useNavigate();
  const { Search } = Input;
  const [boardData, setBoardData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const tempData = localStorage.getItem('boardData');
    setBoardData(JSON.parse(tempData));
    setFilteredData(JSON.parse(tempData));
  }, []);

  const onSearch = (value) => {
    const filtered = boardData.filter((data) => {
      return data.name.toLowerCase().includes(value.toLowerCase());
    });

    setFilteredData(filtered);
  };

  const onOrders = () => {
    navigate('/exchange-board/orders');
  };

  const onOffers = () => {
    navigate('/exchange-board/offers');
  };

  const onDelete = (id) => {
    const newData = boardData.filter((data) => data.id !== id);
    const newFilteredData = filteredData.filter(
      (data) => data.id !== id
    );
    localStorage.setItem('boardData', JSON.stringify(newData));
    setBoardData(newData);
    setFilteredData(newFilteredData);
  };

  const onEdit = (item) => {
    console.log(item);
    setEditItem(item);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onEditComfirm = (values) => {
    const newFilteredData = filteredData.map((data) => {
      if (data.id === editItem.id) {
        return {
          ...data,
          name: values.name,
          description: values.description,
          pickup: values.pickup,
          notes: values.notes,
        };
      }
      return data;
    });

    const newData = boardData.map((data) => {
      if (data.id === editItem.id) {
        return {
          ...data,
          name: values.name,
          description: values.description,
          pickup: values.pickup,
          notes: values.notes,
        };
      }
      return data;
    });
    localStorage.setItem('boardData', JSON.stringify(newData));
    setBoardData(newData);
    setFilteredData(newFilteredData);
  };

  const onFinishFailed = (errorInfo) => {
    message.error('Failed:', errorInfo);
  };

  const curUserId = JSON.parse(
    localStorage.getItem('current_user')
  )?.id;

  return (
    <div className='outer-container'>
      <div>
        <Header />
      </div>
      <div className='search-bar'>
        <Search onSearch={onSearch} style={{ width: 150 }} />
        <div>
          <Button style={{ right: '20px' }} onClick={onOrders}>
            Orders
          </Button>
          <Button onClick={onOffers}>Offers</Button>
        </div>
      </div>
      <div className='container'>
        {filteredData
          ? filteredData.map((data) => {
              return (
                <Card
                  key={data.id}
                  className='exchange-card'
                  title={data.name}
                  extra={
                    <a href={`/exchange-board/details/${data.id}`}>
                      Detail
                    </a>
                  }
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <p>{data.description}</p>
                      <p>{data.pickup}</p>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        alignItems: 'flex-end',
                      }}
                    >
                      {' '}
                      <div>
                        {data.owner === curUserId ? (
                          <Tag
                            color='#FA8C16'
                            style={{ color: 'black' }}
                          >
                            Offered by me
                          </Tag>
                        ) : (
                          ''
                        )}
                        {data.buyer === curUserId ? (
                          <Tag
                            color='#FFD591'
                            style={{ color: 'black' }}
                          >
                            Ordered by me
                          </Tag>
                        ) : (
                          ''
                        )}
                      </div>
                      <div>
                        {' '}
                        {data.status === 'ordered' ? (
                          <Tag color='#F9DB99'>Ordered</Tag>
                        ) : (
                          <Tag color='#F9DB99'>Unordered</Tag>
                        )}
                      </div>
                      <div>
                        {data.owner === curUserId &&
                        data.status !== 'ordered' ? (
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: '20px',
                              alignItems: 'flex-end',
                            }}
                          >
                            <Popconfirm
                              title='Are you sure to edit this item?'
                              onConfirm={() => onEdit(data)}
                              okText='Yes'
                              cancelText='No'
                            >
                              <Button
                                type='primary'
                                htmlType='submit'
                              >
                                Edit
                              </Button>
                            </Popconfirm>
                            <Popconfirm
                              title='Are you sure to delete this item?'
                              onConfirm={() => onDelete(data.id)}
                              okText='Yes'
                              cancelText='No'
                            >
                              <Button
                                type='primary'
                                htmlType='submit'
                              >
                                Delete
                              </Button>
                            </Popconfirm>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })
          : ''}
        <Modal
          title='Edit Item'
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          {editItem ? (
            <div>
              <Form
                name='editItem'
                onFinish={onEditComfirm}
                onFinishFailed={onFinishFailed}
                initialValues={{
                  name: editItem.name,
                  description: editItem.description,
                  pickup: editItem.pickup,
                  notes: editItem.notes,
                }}
              >
                <Form.Item
                  name='name'
                  label='Name'
                  rules={[
                    { required: true, message: 'Please input name!' },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name='description'
                  label='Description'
                  rules={[
                    {
                      required: true,
                      message: 'Please input description!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name='pickup'
                  label='Pickup'
                  rules={[
                    {
                      required: true,
                      message: 'Please input pickup!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name='notes'
                  label='Notes'
                  rules={[
                    {
                      required: true,
                      message: 'Please input notes!',
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Space>
                    <Popconfirm
                      title='Are you sure to edit this item?'
                      onConfirm={() => {
                        message.success('Item editted successfully');
                        navigate('/exchange-board');
                      }}
                      okText='Yes'
                      cancelText='No'
                    >
                      <Button type='primary' htmlType='submit'>
                        Edit
                      </Button>
                    </Popconfirm>
                  </Space>
                </Form.Item>
              </Form>
            </div>
          ) : (
            ''
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Orders;
