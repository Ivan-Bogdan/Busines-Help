import React, { Component } from "react";
<<<<<<< HEAD
import { delete_task, DeleteTask } from "../../API/http";
import UpdateTask from "./UpdateTask";
import Modal from "./Modal";

/* const ActionT = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const FetchData = async () => {
    const result = await delete_task({ task_id: this.props.id });
    if (result.message) {
      console.log(result.message);
    }
    window.location.reload();
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
        {this.props.children}

        <div className="container3" style={{ display: "block" }}>
          <button type="submit" className="button5" onClick={toggleModal}>
            Редактировать
          </button>

          <button
            type="submit"
            className="button5"
            onClick={(event) => {
              event.preventDefault();
              FetchData;
            }}
          >
            Удалить
          </button>
        </div>
      </form>
      <div className="App">
        {modal && <UpdateTask onClose={toggleModal}></UpdateTask>}
      </div>
    </div>
  );
};

export default ActionT; */

export default class ActionsTask extends Component {
 /*  componentDidMount() {
    const modal = document.getElementById("id01");
    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  } */

  constructor(props) {
    super(props);

    this.state = {
      isUpdateOpen: false,
    };
  }

  toggleModalUpdateTask = () => {
    this.setState((state) => ({
      isUpdateOpen: !state.isUpdateOpen,
    }));
  };

  FetchData = async () => {
    const result = await delete_task({ task_id: this.props.id });
    if (result.message) {
      console.log(result.message);
    }
    window.location.reload();
  };

  render() {
    return (
      <div className="modal" id="id01">
        <form class="modal-signin animate">
=======

export default class ActionsTask extends Component {
  render() {
    return (
      <div className="modal">
        <form class="modal-content2 animate">
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
          <div class="imgcontainer">
            <span
              className="close"
              onClick={this.props.onClose}
              title="Close Modal"
            >
              ×
            </span>
<<<<<<< HEAD
            <p class="reg"></p>
          </div>
          {this.props.children}

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
                this.FetchData();
              }}
            >
              Удалить
            </button>
          </div>
        </form>
        {/*  <div className="App">
          {this.state.isUpdateOpen && (
            <UpdateTask onClose={this.toggleModalUpdateTask}></UpdateTask>
          )}
        </div> */}

        <Modal isShowing={this.state.isUpdateOpen} elem={5125} id={2}>
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
                    this.setState({ isUpdateOpen: false });
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
                      this.setState({ isUpdateOpen: false });
                    }}
                  >
                    Отмена
                  </button>
                  <button
                    onClick={() => {
                      this.setState({ isUpdateOpen: false });
                    }}
                  >
                    Ок
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
=======
            <p class="reg">Действия задания</p>
          </div>
          {this.props.children}

          <div style={{display:"block"}}>
            <button
              type="submit"
              className="button_create"
              onClick={this.LoginUser}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="button_create"
              onClick={this.LoginUser}
            >
              Отмена
            </button>
          </div>
        </form>
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
      </div>
    );
  }
}
