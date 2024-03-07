import css from './ImageModal.module.css';
import { HiMiniChevronDown } from 'react-icons/hi2';

import { useEffect } from 'react';

import ReactModal from 'react-modal';

export default function ImageModal({
  modal,
  setModal,
  modalData: { urls, alt_description },
}) {
  function handleClose() {
    setModal(false);
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setModal(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setModal]);

  const custom = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      maxWidth: '100%',
      overflow: 'hidden',
      objectFit: 'cover',
      maxHeight: '100vh',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '0',
    },
  };

  return (
    <ReactModal
      style={custom}
      shouldCloseOnOverlayClick={true}
      onRequestClose={handleClose}
      isOpen={modal}
    >
      <div className={css.container}>
        <button onClick={handleClose} className={css.closeBtn}>
          <HiMiniChevronDown className={css.icon} />
        </button>
        <img className={css.pic} src={urls.regular} alt={alt_description} />
      </div>
    </ReactModal>
  );
}
