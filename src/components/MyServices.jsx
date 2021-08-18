import React, { useState, useEffect, useCallback } from "react";
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
// import { useLazyLoading } from "./hooks/useLazyLoading";

const getHashable = (components) => {
  return components.map((component) => component.value).join("");
};

const MyServ = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(false);
  const [modal, setModal] = useState(false);
  const [isOpenFilter, setOpenFilter] = useState(false);
  const [limit] = useState(10);

  const [desc, setDesc] = useState(false);
  const [sort, setSort] = useState("name");

  const [count, setCount] = useState(0);
  const [selectedTaskPage, setSelectedTaskPage] = useState(0);
  const [fetching, setFetching] = useState(true)
  const [isVisible, setIsVisible] = useState(false);

  const [filters, setFilters] = useState(filterForPage.services.map((item) => { return { ...item, value: "" } }))

  const scrollHandler = (e) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && tasks.length < count) {
      setFetching(true)
    }
  }

  useEffect(() => {
    if (fetching) {
      try {
        FetchData(filters)
        setSelectedTaskPage(prevState => prevState + 1)
      }
      catch (e) {
        console.log(e);
      }
      finally {
        setFetching(false)
      }
    }
  }, [fetching, FetchData, filters])

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  useEffect(() => {
    _getFingerprint();
    FetchData();
  }, [_getFingerprint, FetchData, selectedTaskPage]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleFilter = () => {
    setOpenFilter(!isOpenFilter);
  };

  const callbackFilter = (desc, sort) => {
    setDesc(desc);
    setSort(sort);
  };

  const FetchData = useCallback(async (filters, sort = "name") => {
    let payload = {
      limit,
      sort: sort || "name",
      desc,
      offset: selectedTaskPage * 10,
      filters: filters || []
    };
    const result = await get_task_list(payload);
    if (result.message) {
      setError(result.message);
    } else {
      setCount(result.count);
      setTasks([...tasks, ...result.tasks]);
      return setError("");
    }
  }, [selectedTaskPage]);

  const _getFingerprint = () => {
    if (window.requestIdleCallback) {
      requestIdleCallback(() => {
        FPJS.get((components) => {
          const hash = FPJS.x64hash128(getHashable(components));
          localStorage.setItem("fingerprint", hash);
        });
      });
    } else {
      setTimeout(() => {
        FPJS.get((components) => {
          console.log(FPJS.x64hash128(getHashable(components)));
        });
      }, 500);
    }
  };

  const deleteTask = async (task) => {
    const result = await delete_task({ task_id: task });
    if (result.message) {
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
            <p style={{ color: "red" }}>{error}</p>
          </div>
          <div className="container">
            {isOpenFilter && (
              <FilterComponent
                filterList={filters}
                refetch={FetchData}
                setData={setFilters}
                onClose={toggleFilter}
                sortData={sort}
                setSortData={setSort}
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
