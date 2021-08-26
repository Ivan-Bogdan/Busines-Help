import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  get_task_list,
  delete_task,
} from "../API/http";
import FPJS from "@fingerprintjs/fingerprintjs";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/style.css";
import "../components/Modal.css";
import CreateTask from "./tasks/CreateTask";
import Task from "./tasks/Task";
import Navbar from "../Navbar";
import Footer from "../Footer";
import FilterComponent from "./FilterComponent";
import { filterForPage } from "../helpers";

const getHashable = (components) => {
  return components.map((component) => component.value).join("");
};

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
  const [fetching, setFetching] = useState(true)

  const [resultFilter, setResultFilter] = useState([])

  const containerBox = useRef(null);
  const [height, setHeight] = useState(0)

  const [filters, setFilters] = useState(filterForPage.services.map((item) => { return { ...item, value: "" } }))

  const scrollHandler = useCallback((e) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && Math.ceil(count / 10) > selectedTaskPage) {
      setFetching(true)
    }
  }, [count, tasks, selectedTaskPage])

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
        } else {
          setTasks([...tasks, ...responce.tasks])
        }
        setSelectedTaskPage(prevState => prevState + 1)
      }).finally(() => {
        setFetching(false)
        setIsRefetch(false)
      })
    },
    [sort, filters, selectedTaskPage, tasks, resultFilter, isRefetch]
  )

  useEffect(() => {
    if (height !== 0 && Math.ceil(count / 10) > selectedTaskPage && window.innerHeight > height || fetching && localStorage.getItem("token")) {
      taskListFn()
      console.log(123);
    }
  }, [fetching, height, isRefetch])

  // console.log(window.innerHeight);
  useEffect(() => {
    setHeight(containerBox.current.clientHeight)
  })

  // useEffect(() => {
  //   console.log(window.innerHeight);
  //   console.log(height);

  //   if (window.innerHeight > height) {
  //     setFetching(true)
  //     console.log("больше");
  //   }
  // }, [height])

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [fetching])

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleFilter = () => {
    setOpenFilter(!isOpenFilter);
  };

  const FetchData = useCallback(() => {
    setSelectedTaskPage(0)
    setFetching(true)
    setTasks([])
    setIsRefetch(true)
  });

  const deleteTask = async (task) => {
    const result = await delete_task({ task_id: task });
    if (result.message !== "OK") {
      console.log(result.message);
    }
    FetchData();
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
                filterList={filters}
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
