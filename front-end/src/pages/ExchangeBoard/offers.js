import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Input,
  Button,
  Form,
  Space,
  Upload,
  Image,
  message,
  Popconfirm,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import '../../styles/ExchangeBoard.css';
import Header from '../../components/ExchangeBoard/Header/Header';
import { savePhoto } from '../../utils/indexedDB';

const Offers = () => {
  const navigate = useNavigate();

  const confirm = (e) => {
    message.success('Item submitted successfully');
    navigate('/exchange-board');
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

  const onFinish = async (values) => {
    const currentData = localStorage.getItem('boardData');
    const newBoardData = currentData ? JSON.parse(currentData) : [];
    const userData = JSON.parse(localStorage.getItem('current_user'));

    const photoId = crypto.randomUUID();
    const reader = new FileReader();
    reader.onload = async () => {
      const photoBase64 = reader.result;
      await savePhoto(photoId, photoBase64); // Save photo to IndexedDB
    };
    reader.readAsDataURL(fileList[0].originFileObj);

    const newOffer = {
      name: values.name,
      description: values.description,
      pickup: values.pickup,
      notes: values.notes,
      image: photoId,
      id: crypto.randomUUID(),
      owner: userData?.id,
      Buyer: null,
      status: 'open',
    };

    newBoardData.push(newOffer);
    localStorage.setItem('boardData', JSON.stringify(newBoardData));
  };

  const onFinishFailed = (errorInfo) => {
    message.error('Failed:', errorInfo);
  };

  return (
    <div className='outer-container'>
      <div>
        <Header />
      </div>
      <Form
        name='basic'
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
          width: '300px',
          margin: '0 auto',
          paddingTop: '50px',
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className='container'
      >
        <Form.Item
          name='name'
          label='Name'
          rules={[{ required: true, message: 'Please input name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='description'
          label='Desc'
          rules={[
            { required: true, message: 'Please input description!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='pickup'
          label='Pick up'
          rules={[
            { required: true, message: 'Please input pick up!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='notes'
          label='Notes'
          rules={[{ required: true, message: 'Please input notes!' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item rules={[{ required: true }]}>
          <div>
            <Upload
              action='https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload'
              listType='picture-card'
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              width={300}
            >
              {fileList.length >= 1 ? null : uploadButton}
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
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Space>
            <Popconfirm
              title='Are you sure to offer this item?'
              onConfirm={confirm}
              okText='Yes'
              cancelText='No'
            >
              <Button type='primary' htmlType='submit'>
                Offer
              </Button>
            </Popconfirm>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Offers;
