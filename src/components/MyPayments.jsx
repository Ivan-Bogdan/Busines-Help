import React, { useCallback, useState, useEffect } from 'react';
import { delete_payment, get_payments_list, payment_create } from '../API/http';
import Footer from '../Footer';
import { filterForPage } from '../helpers';
import Navbar from '../Navbar';
import FilterComponent from './FilterComponent';
import AddPayment from './payments/AddPayment';
import PaymentItem from './payments/PaymentItem';

const MyPayments = () => {
  const [isCreatePayment, setIsCreatePayment] = useState(false)
  const [isOpenFilter, setOpenFilter] = useState(false);
  const [selectedTaskPage, setSelectedTaskPage] = useState(0);
  const [sort, setSort] = useState('date_pay')

  const [fetching, setFetching] = useState(true)
  const [isRefetch, setIsRefetch] = useState(false)

  const [count, setCount] = useState(0)
  const [payments, setPayments] = useState([]);

  const [filters, setFilters] = useState(filterForPage.payments.map((item) => { return { ...item, value: "" } }))
  const [resultFilter, setResultFilter] = useState([])

  const toggleFilter = () => {
    setOpenFilter(!isOpenFilter);
  };

  const scrollHandler = useCallback((e) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && Math.ceil(count / 10) > selectedTaskPage) {
      setFetching(true)
    }
  }, [count, payments, selectedTaskPage])

  const taskListFn = useCallback(
    () => {
      get_payments_list({
        limit: 10,
        sort,
        desc: false,
        offset: selectedTaskPage * 10,
        filters: resultFilter.filter(item => item.value) || []
      }).then((responce) => {
        setCount(responce.count)
        setPayments([...payments, ...responce.payments])
        setSelectedTaskPage(prevState => prevState + 1)
      }).finally(() => {
        setFetching(false)
        setIsRefetch(false)
      })
    },
    [sort, filters, selectedTaskPage, payments, resultFilter, isRefetch]
  )

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [fetching])

  // const FetchData = useCallback(async (filters, sort = "date_pay") => {
  //   let payload = {
  //     limit: 10,
  //     offset: 0,
  //     sort: sort || "date_pay",
  //     desc: true,
  //     filters: filters || []
  //   };
  //   const result = await get_payments_list(payload);
  //   if (result.message) {
  //     console.log(result.message);
  //   } else {
  //     setPayments(result.payments);
  //   }
  // }, [sort]);

  const FetchData = useCallback(() => {
    setSelectedTaskPage(0)
    setFetching(true)
    setPayments([])
    setIsRefetch(true)
  }, []);

  const createPayment = useCallback(
    async (data) => {
      const result = await payment_create(data);
      if (result.id) {
        setIsCreatePayment(false);
        FetchData();
      } else alert("Не удалось выполнить запрос")
    },
    []
  );

  const deletePayment = useCallback(
    async (id) => {
      const result = await delete_payment({ id });
      if (result.message !== "OK") {
      } else
        FetchData();
    },
    [payments]
  );

  // useEffect(() => {
  //   FetchData();
  // }, [FetchData]);

  return (
    <div className='app'>
      <Navbar />
      <section className='main'>
        <div className="container">
          <div className="flex" style={{ marginBottom: "20px" }}>
            <button
              type="submit"
              className="button_create"
              onClick={() => setIsCreatePayment(true)}
            >
              Создать
            </button>
            <div className="filter_div" align="right">
              <button className="sorting" onClick={toggleFilter}></button>
            </div>
          </div>
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
          {payments.map((item, index) => (
            <div key={index} className="client_item">
              <PaymentItem
                item={item}
                deleteItem={deletePayment}
                FetchData={FetchData}
              />
            </div>
          ))}
        </div>
      </section>
      <Footer />
      <div className="App">
        {isCreatePayment && (
          <AddPayment
            onClose={() => setIsCreatePayment(false)}
            FetchData={FetchData}
            createPayment={createPayment}
          />
        )}
      </div>
    </div>
  );
};

export default MyPayments;