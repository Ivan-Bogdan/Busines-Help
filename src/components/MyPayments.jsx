import React, { useCallback, useState, useEffect } from 'react';
import { delete_payment, get_payments_list, payment_create } from '../API/http';
import Footer from '../Footer';
import Navbar from '../Navbar';
import AddPayment from './payments/AddPayment';
import PaymentItem from './payments/PaymentItem';

const MyPayments = () => {
  const [isCreatePayment, setIsCreatePayment] = useState(false)
  const [payments, setPayments] = useState([]);

  const FetchData = useCallback(async () => {
    let payload = {
      limit: 10,
      offset: 0,
      sort: "name",
      desc: true,
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
  }, []);

  return (
    <div>
      <Navbar />
      <section>
        <div className="container">
          <div className="flex" style={{ marginBottom: "20px" }}>
            <button
              type="submit"
              className="button_create"
              onClick={() => setIsCreatePayment(true)}
            >
              Создать
            </button>
          </div>
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