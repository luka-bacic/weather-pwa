import React, { useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import Modal from 'react-modal';
import { GrClose } from 'react-icons/gr';

type Props = {
  text: string;
};

const Tooltip = ({ text }: Props) => {
  // Bind modal to root element (for accessibility)
  Modal.setAppElement('#___gatsby');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
    console.log('clicked');
  };
  return (
    <>
      <button onClick={toggleModal} className="tooltip">
        <AiOutlineInfoCircle className="tooltip__icon" />
        <span className="sr-only">See UV index advice</span>
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="UV Index advice"
        closeTimeoutMS={300}
        className={{
          base: 'tooltip__modal',
          afterOpen: 'tooltip--modal-after-open',
          beforeClose: 'tooltip--modal-before-close',
        }}
        overlayClassName={{
          base: 'tooltip__modal-overlay',
          afterOpen: 'tooltip--modal-overlay-after-open',
          beforeClose: 'tooltip--modal-overlay-before-close',
        }}
      >
        <div className="tooltip__content">
          <div className="tooltip__content-header">
            <AiOutlineInfoCircle className="tooltip__header-icon" />

            <h6 className="tooltip__content-title">UV index advice</h6>

            <button className="tooltip__close-btn" onClick={toggleModal}>
              <span className="sr-only">Close advice</span>
              <GrClose />
            </button>
          </div>

          {text}
        </div>
      </Modal>
    </>
  );
};

export default Tooltip;
