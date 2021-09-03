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

  const containerBox = useRef(null);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  const [height, setHeight] = useState(0)

  const [resultFilter, setResultFilter] = useState([])

  const scrollHandler = useCallback((e) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && Math.ceil(count / 10) > selectedTaskPage) {
      setFetching(true)
    }
  }, [count, tasks, selectedTaskPage])

  const handleResize = useCallback(() => {
    setWindowHeight(window.innerHeight)
  }, []);

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
    [sort, selectedTaskPage, tasks, resultFilter, isRefetch]
  )

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

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [fetching])

  useEffect(() => {
    console.log(fetching);
    if (fetching && localStorage.getItem("token") || height !== 0 && windowHeight !== 0 && windowHeight > height) {
      taskListFn()
    }
  }, [fetching, height, windowHeight])

  useEffect(() => {
    setHeight(containerBox.current.clientHeight)
  })

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
