import React from 'react';

const AddPayment = ({ onClose }) => {
  return (
    <div className="modal" id="id01">
      <form className="modal-content animate">
        <div className="imgcontainer">
          <span
            className="close"
            onClick={onClose}
            title="Close Modal"
          >
            ×
          </span>
          <p className="reg">Новый платеж</p>
        </div>

        <div className="container3">

        </div>
      </form>
    </div>
  );
};

export default AddPayment;