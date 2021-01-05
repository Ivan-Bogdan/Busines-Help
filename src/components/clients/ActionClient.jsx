import React, { useState } from "react";
import Modal from "../Modal";

const ActionClient = () => {
  const [isUpdateOpen, setUpdateOpen] = useState(false);

  const toggleModalUpdateTask = () => {
    setUpdateOpen(!isUpdateOpen);
  };

  return (
    <div className="modal" id="id01">
      <form class="modal-signin animate">
        <div class="imgcontainer">
          <span
            className="close"
            onClick={this.props.onClose}
            title="Close Modal"
          >
            ×
          </span>
          <p class="reg"></p>
        </div>

        <div className="container3" style={{ display: "block" }}>
          <button
            type="submit"
            className="button5"
            onClick={() => {
              this.props.onClose2;
            }}
          >
            Редактировать
          </button>

          <button
            type="submit"
            className="button5"
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            Удалить
          </button>
        </div>
      </form>

      <Modal isShowing={isUpdateOpen}>
        <div className="modal-overlay" />
        <div
          className="modal-wrapper"
          aria-modal
          aria-hidden
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal">
            <div className="modal-header">
              <button
                type="button"
                className="modal-close-button"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setUpdateOpen(false)
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <p style={{ fontWeight: "900" }}>Добавить Тег</p>
            <div>
              <input
                className="input_style"
                placeholder="Метка"
                required={true}
              ></input>
              <div className="flex">
                <button
                  onClick={() => {
                    setUpdateOpen(false)
                  }}
                >
                  Отмена
                </button>
                <button
                  onClick={() => {
                    setUpdateOpen(false)
                  }}
                >
                  Ок
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ActionClient;
