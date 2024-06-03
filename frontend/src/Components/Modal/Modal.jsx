import React from 'react';
import './Modal.css';

const Modal = ({ show, handleClose, handleConfirm, children }) => {
  return (
    <div className={`modal ${show ? 'show' : ''}`} onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Uyarı</h4>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <button onClick={handleClose} className="button">Hayır</button>
          {handleConfirm && (
            <button onClick={handleConfirm} className="button confirm">Evet</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
