import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Form, Space, Upload, Image } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import '../../styles/ExchangeBoard.css';
import Header from '../../components/ExchangeBoard/Header/Header';

const Details = () => {
  const navigate = useNavigate();
  const { Search } = Input;
  const { UploadFile } = Upload;

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
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const handleChange = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type='button'
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

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
          'padding-top': '50px',
        }}
      >
        <Form.Item
          name='note'
          label='Note'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='note'
          label='Note'
          rules={[{ required: true }]}
        >
          <div>
            <Upload
              action='https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload'
              listType='picture-card'
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{
                  display: 'none',
                }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) =>
                    setPreviewOpen(visible),
                  afterOpenChange: (visible) =>
                    !visible && setPreviewImage(''),
                }}
                src={previewImage}
              />
            )}
          </div>
        </Form.Item>
        <Form.Item
          name='note'
          label='Note'
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Space>
        </Form.Item>
      </div>
    </div>
  );
};

export default Details;
