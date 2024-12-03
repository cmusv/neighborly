import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Card, Tag } from 'antd';
import '../../styles/ExchangeBoard.css';
import Header from '../../components/ExchangeBoard/Header/Header';

const Orders = () => {
  const navigate = useNavigate();
  const { Search } = Input;

  const onBack = () => {
    navigate('/exchange-board');
  };

  const onHome = () => {
    navigate('/');
  };

  const onSearch = (value) => {
    console.log(value);
  };

  const onOrders = () => {
    navigate('./orders');
  };

  const onOffers = () => {
    navigate('./offers');
  };

  const onDetail = (id) => {
    navigate(`./details/${id}`);
  };

  return (
    <div className='outer-container'>
      <div>
        <Header onBack={onBack} onHome={onHome} />
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
        <Card
          title='Default size card'
          extra={<a href='#'>More</a>}
          style={{ width: 300 }}
          onClick={onDetail}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <div>
            <Tag color='purple'>123</Tag>
            <Tag color='blue'>456</Tag>
          </div>
          <div>
            <Button type='primary'>123</Button>
            <Button type='primary'>456</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Orders;
