import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  get_task_list,
  delete_task,
} from "../API/http";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/style.css";
import "../components/Modal.css";
import CreateTask from "./tasks/CreateTask";
import Task from "./tasks/Task";
import Navbar from "../Navbar";
import Footer from "../Footer";
import FilterComponent from "./FilterComponent";
import { filterForPage } from "../helpers";
import { useLazyLoading } from "./hooks/useLazyLoading";

const MyServ = () => {


  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);
  const [isOpenFilter, setOpenFilter] = useState(false);

  const [limit] = useState(10);
  const [desc, setDesc] = useState(false);
  const [sort, setSort] = useState("name");

  const [count, setCount] = useState(0);
  const [selectedTaskPage, setSelectedTaskPage] = useState(0);
  const [isRefetch, setIsRefetch] = useState(false)

  const containerBox = useRef(null);

  const [resultFilter, setResultFilter] = useState([])

  const taskListFn = useCallback(
    () => {
      get_task_list({
        limit,
        sort,
        desc,
        offset: selectedTaskPage * 10,
        filters: resultFilter.filter(item => item.value) || []
      }).then((responce) => {
        setCount(responce.count)
        if (isRefetch) {
          setTasks(responce.tasks)
          setIsRefetch(false)
        } else {
          setTasks([...tasks, ...responce.tasks])
        }
        setSelectedTaskPage(prevState => prevState + 1)
      }).finally(() => {
        setFetching(false)
      })
    },
    [sort, selectedTaskPage, tasks, resultFilter, isRefetch]
  )

  const { setFetching } = useLazyLoading(containerBox, count, taskListFn, selectedTaskPage)

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleFilter = () => {
    setOpenFilter(!isOpenFilter);
  };

  const FetchData = useCallback(() => {
    setSelectedTaskPage(0)
    setTasks([])
    setIsRefetch(true)
    setFetching(true)
  }, []);

  const deleteTask = async (task) => {
    const result = await delete_task({ task_id: task });
    if (result.message === "OK") {
      FetchData();
    }
  };

  return (
    <div className="app">
      <Navbar />
      <main className="main" id="main">
        <section className="main-section3" id="main-section">
          <div className="container">
            <div className="flex" style={{ marginBottom: "20px" }}>
              <button
                type="submit"
                className="button_create"
                onClick={toggleModal}
              >
                Создать
              </button>
              <div className="filter_div" align="right">
                <button className="sorting" onClick={toggleFilter}></button>
              </div>
            </div>
          </div>
          <div ref={containerBox} className="container">
            {isOpenFilter && (
              <FilterComponent
                filterList={filterForPage.services.map((item) => { return { ...item, value: "" } })}
                refetch={FetchData}
                onClose={toggleFilter}
                sortData={sort}
                setSortData={setSort}
                setResultFilter={setResultFilter}
              ></FilterComponent>
            )}
            {tasks.map((task, index) => (
              <div key={index} className="task_item">
                <Task
                  task={task}
                  deleteTask={deleteTask}
                  FetchData={FetchData}
                ></Task>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <div className="App">
        {modal && <CreateTask onClose={toggleModal}></CreateTask>}
      </div>
    </div>
  );
};

export default MyServ;
