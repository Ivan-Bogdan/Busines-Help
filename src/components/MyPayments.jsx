import React, { useState } from 'react';
import Footer from '../Footer';
import Navbar from '../Navbar';
import AddPayment from './payments/AddPayment';

const MyPayments = () => {
  const [isCreatePayment, setIsCreatePayment] = useState(false)
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
          />
        )}
      </div>
    </div>
  );
};

export default MyPayments;