import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Card } from 'antd';
import '../../styles/ExchangeBoard.css';
import Header from '../../components/ExchangeBoard/Header/Header';

const ExchangeBoard = () => {
  const navigate = useNavigate();
  const { Search } = Input;

  const [boardData, setBoardData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const tempData = localStorage.getItem('boardData');

    const defaultData = {
      id: crypto.randomUUID(),
      name: 'Chair',
      description: 'A computer chair, old but in good condition',
      pickup: '205',
      owner: 'Hugo',
      image:
        'https://img.kwcdn.com/product/fancy/d46e4937-d9fe-4fcf-bf0d-de7093fde51b.jpg?imageView2/2/w/264/q/70/format/webpazaqzazQ',
    };
    if (tempData) {
      let newData = [...JSON.parse(tempData)];
      if (
        newData.filter((data) => data.name === 'Chair').length === 0
      ) {
        newData = [...newData, defaultData];
      }
      localStorage.setItem('boardData', JSON.stringify(newData));
      setBoardData(newData);
      setFilteredData(newData);
    } else {
      localStorage.setItem(
        'boardData',
        JSON.stringify([defaultData])
      );
      setBoardData([defaultData]);
      setFilteredData([defaultData]);
    }
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
                  <p>{data.description}</p>
                  <p style={{ color: 'gray' }}>
                    Please pick up at {data.pickup}
                  </p>{' '}
                </Card>
              );
            })
          : ''}
      </div>
    </div>
  );
};

export default ExchangeBoard;
