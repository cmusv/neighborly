import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './styles.css';

const Header = ({ buttonType }) => {
  const navigate = useNavigate();
  const onBack = () => {
    navigate('/exchange-board');
  };
  const onHome = () => {
    navigate('/');
  };
  return (
    <header className='header'>
      {buttonType === 'home' ? (
        <div className='header-left' onClick={onHome}>
          <ArrowLeftOutlined className='back-icon' />
          <span className='home-text'>Home</span>
        </div>
      ) : (
        <div className='header-left' onClick={onBack}>
          <ArrowLeftOutlined className='back-icon' />
          <span className='home-text'>Back</span>
        </div>
      )}
      <h1 className='header-title'>Exchange Board</h1>
    </header>
  );
};

export default Header;
