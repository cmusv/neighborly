import React, { useState, useEffect } from 'react';

const Counter = () => {
  // 从 localStorage 获取初始值
  const getInitialCount = () => {
    const savedCount = localStorage.getItem('counter');
    return savedCount ? parseInt(savedCount, 10) : 0;
  };

  const [count, setCount] = useState(getInitialCount);

  // 每次 count 更新时，将其保存到 localStorage
  useEffect(() => {
    localStorage.setItem('counter', count);
  }, [count]);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Counter</h1>
      <h2>{count}</h2>
      <div>
        <button onClick={increment} style={{ margin: '5px' }}>
          Increment
        </button>
        <button onClick={decrement} style={{ margin: '5px' }}>
          Decrement
        </button>
        <button onClick={reset} style={{ margin: '5px' }}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
