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
  const [sort, setSort] = useState('date_pay')
  const [payments, setPayments] = useState([]);

  const toggleFilter = () => {
    setOpenFilter(!isOpenFilter);
  };

  const FetchData = useCallback(async (filters) => {
    let payload = {
      limit: 10,
      offset: 0,
      sort: "date_pay",
      desc: true,
      filters: filters || []
    };
    const result = await get_payments_list(payload);
    if (result.message) {
      console.log(result.message);
    } else {
      setPayments(result.payments);
    }
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


  useEffect(() => {
    FetchData();
  }, [FetchData, localStorage]);

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
              refetchSort={setSort}
              filterList={filterForPage.payments}
              refetch={FetchData}
              onClose={toggleFilter}
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