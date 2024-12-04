export const modalConfig = {
    centered: true,
    width: '75vw',
    maskStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0.45)'
    },
    wrapClassName: 'wide-centered-modal',
    bodyStyle: {
      padding: '20px',
    },
    style: {
      maxWidth: '1200px'
    }
  };
  
  export const confirmModalConfig = {
    ...modalConfig,
    okText: 'Yes',
    cancelText: 'Cancel',
  };
  
  export const successModalConfig = {
    ...modalConfig,
    duration: 0.5,
    icon: null
  };