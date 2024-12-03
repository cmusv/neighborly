import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Card } from 'antd';
import '../../styles/ExchangeBoard.css';
import Header from '../../components/ExchangeBoard/Header/Header';

const ExchangeBoard = () => {
  const navigate = useNavigate();
  const { Search } = Input;

  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    const tempData = localStorage.getItem('boardData');
    setBoardData([
      {
        name: 'default item',
        desc: 'default description',
        loc: '115',
        note: null,
        id: '114514',
      },
    ]);

    if (tempData) setBoardData(tempData);
  }, []);

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
        {boardData
          ? boardData.map((data) => {
              return (
                <Card
                  className='exchange-card'
                  title={data.name}
                  extra={
                    <a href={`/exchange-board/details/${data.id}`}>
                      More
                    </a>
                  }
                >
                  <p>{data.desc}</p>
                  <p>{data.loc}</p>
                </Card>
              );
            })
          : ''}
      </div>
    </div>
  );
};

export default ExchangeBoard;
