import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Card, Tag, Popconfirm } from 'antd';
import '../../styles/ExchangeBoard.css';
import Header from '../../components/ExchangeBoard/Header/Header';

const Orders = () => {
  const navigate = useNavigate();
  const { Search } = Input;
  const [boardData, setBoardData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

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

  const curUserId = JSON.parse(
    localStorage.getItem('current_user')
  )?.id;

  return (
    <div className='outer-container'>
      <div>
        <Header />
      </div>
      <div className='search-bar'>
        <Search onSearch={onSearch} style={{ width: 200 }} />
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
                              onConfirm={() => {
                                console.log(1);
                              }}
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
                              onConfirm={() => {
                                console.log(1);
                              }}
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
      </div>
    </div>
  );
};

export default Orders;
