import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './styles.css';

const Header = () => {
  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };
  const onHome = () => {
    navigate('/');
  };
  return (
    <header className='header'>
      <div className='header-left' onClick={onBack}>
        <ArrowLeftOutlined className='back-icon' />
        <span className='home-text'>Back</span>
      </div>
      <h1 className='header-title'>Exchange Board</h1>
      <div className='header-right' onClick={onHome}>
        <span className='home-text'>Home</span>
      </div>
    </header>
  );
};

export default Header;
