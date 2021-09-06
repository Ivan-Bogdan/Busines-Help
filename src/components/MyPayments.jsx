import React, { useCallback, useState, useRef } from 'react';
import { delete_payment, get_payments_list, payment_create } from '../API/http';
import Footer from '../Footer';
import { filterForPage } from '../helpers';
import Navbar from '../Navbar';
import FilterComponent from './FilterComponent';
import { useLazyLoading } from './hooks/useLazyLoading';
import AddPayment from './payments/AddPayment';
import PaymentItem from './payments/PaymentItem';

const MyPayments = () => {
  const [isCreatePayment, setIsCreatePayment] = useState(false)
  const [isOpenFilter, setOpenFilter] = useState(false);
  const [selectedTaskPage, setSelectedTaskPage] = useState(0);
  const [sort, setSort] = useState('date_pay')

  const containerBox = useRef(null);
  const [isRefetch, setIsRefetch] = useState(false)

  const [count, setCount] = useState(0)
  const [payments, setPayments] = useState([]);

  const [filters, setFilters] = useState(filterForPage.payments.map((item) => { return { ...item, value: "" } }))
  const [resultFilter, setResultFilter] = useState([])

  const toggleFilter = () => {
    setOpenFilter(!isOpenFilter);
  };

  const paymentsListFn = useCallback(
    () => {
      get_payments_list({
        limit: 10,
        sort,
        desc: false,
        offset: selectedTaskPage * 10,
        filters: resultFilter.filter(item => item.value) || []
      }).then((responce) => {
        setCount(responce.count)
        if (isRefetch) {
          setPayments(responce.payments)
          setIsRefetch(false)
        } else {
          setPayments([...payments, ...responce.payments])
        }
        setSelectedTaskPage(prevState => prevState + 1)
      }).finally(() => {
        setFetching(false)
      })
    },
    [sort, filters, selectedTaskPage, payments, resultFilter, isRefetch]
  )

  const { setFetching } = useLazyLoading(containerBox, count, paymentsListFn, selectedTaskPage)

  const FetchData = useCallback(() => {
    setSelectedTaskPage(0)
    setPayments([])
    setIsRefetch(true)
    setFetching(true)
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
      if (result.message === "OK") {
        FetchData();
      }
    },
    [payments]
  );

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
        </div>
        <div ref={containerBox} className='container'>
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
    </div >
  );
};

export default MyPayments;