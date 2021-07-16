import React, { useCallback, useState, useEffect } from 'react';
import { delete_payment, get_payments_list } from '../API/http';
import Footer from '../Footer';
import Navbar from '../Navbar';
import AddPayment from './payments/AddPayment';

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

  const deletePayment = useCallback(
    async (id) => {
      const result = await delete_payment({ id });
      if (result.message) {
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

        </div>
      </section>
      <Footer />
      <div className="App">
        {isCreatePayment && (
          <AddPayment
            onClose={() => setIsCreatePayment(false)}
            FetchData={FetchData}
          />
        )}
      </div>
    </div>
  );
};

export default MyPayments;