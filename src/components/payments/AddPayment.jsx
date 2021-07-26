import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Autosuggest from 'react-autosuggest';
import Select from 'react-select';
import { find_client, get_payment, get_unpaid_task, get_client } from '../../API/http';
import { getNameOtype } from '../../helpers';

const CustomStyle = {
  option: (base, state) => ({
    ...base,
    color: "black",
    backgroundColor: state.isSelected ? 'lightblue' : "white",
    fontWeight: 500
  }),
  placeholder: (base, state) => ({
    ...base,
    fontWeight: 500
  })
}

// const options = [
//   { value: "Abe", label: "Abe", date: "25.01.2021", price: "200.00 BYN" },
//   { value: "John", label: "John", date: "18.06.2021", price: "20.00 BYN" },
//   { value: "Dustin", label: "Dustin", date: "06.04.2021", price: "2000.00 BYN" }
// ];

const formatOptionLabel = ({ value, label, date, price }) => (
  <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', cursor: "pointer" }}>
    <div style={{ width: "100%", }}>{date}</div>
    <div style={{ width: "100%", whiteSpace: "nowrap", overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</div>
    <div style={{ width: "100%", marginLeft: 15 }}>{price}</div>
  </div>
);

const renderSuggestion = (client) => <span>{`${client.full_name ? getNameOtype(client.otype, client.full_name.name, client.full_name.patronymic, client.full_name.family) : getNameOtype(client.otype, client.name)}`}</span>;

const AddPayment = ({ paymentId, createPayment, updatePayment, onClose }) => {

  const [suggestions, setSuggestions] = useState([]);

  const [payment, setPayment] = useState(null);

  const [unpaidTask, setUnpaidTask] = useState([])
  const [selectedTasks, setSelectedTasks] = useState([])

  const [client, setClient] = useState("")
  const [clientId, setClientId] = useState("")
  const [typeOfPayment, setTypeOfPayment] = useState("")
  const [numberOfPayment, setNumberOfPayment] = useState("")
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState("BYN");
  const [date_pay, SetDate_pay] = useState("");

  const tasks = useMemo(() => selectedTasks && selectedTasks.map((item) => { return { id: item.value } }), [selectedTasks])

  const onChange = (event, { newValue, method }) => {
    setClient(newValue);
  };

  const getSuggestionValue = (suggestion) => {
    setClientId(suggestion.id);
    return suggestion.full_name && getNameOtype(suggestion.otype, suggestion.full_name.name, suggestion.full_name.patronymic, suggestion.full_name.family) || suggestion.name && getNameOtype(suggestion.otype, suggestion.name)
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    find_client(value)
      .then((responce) => {
        setSuggestions(responce.data.clients);
      });
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Клиент",
    value: client,
    onChange: onChange,
  };

  const getUnpaidTask = useCallback(async (clientId) => {
    try {
      const result = await get_unpaid_task({ client_id: clientId });
      setUnpaidTask(result.tasks.map((item) => { return { value: item.id, label: item.name, date: new Date(item.date).toLocaleDateString(), price: `${item.residue.price.toFixed(2)} ${item.residue.currency}` } }));
    } catch (e) {
      console.log(e);
    }
  }, [])

  const getPayment = useCallback(async (id) => {
    try {
      const result = await get_payment({ id });
      setPayment(result.task);
    } catch (e) {
      console.log(e);
    }
  }, [])

  useEffect(() => {
    if (clientId) {
      getUnpaidTask(clientId)
    }
  }, [clientId])

  useEffect(() => {
    if (paymentId) {
      getPayment(paymentId)
    }
  }, [paymentId])

  useEffect(() => {
    if (payment) {
      setClientId(payment.client)
      setTypeOfPayment(payment.payments_type)
      setNumberOfPayment(payment.payment_number)
      setPrice(payment.price.price)
      setCurrency(payment.price.currency)
      SetDate_pay(payment.date_pay.slice(0, 10))
      setSelectedTasks(payment.task.map((item) => { return { value: item.id, label: item.name } }))
    }
  }, [payment])

  useEffect(() => {
    const func = async () => {
      if (payment && payment.client) {
        const clientCurrent = await get_client({
          id: payment.client,
        });
        const { client } = clientCurrent;
        setClient(client.full_name ? getNameOtype(client.otype, client.full_name.name, client.full_name.patronymic, client.full_name.family) : getNameOtype(client.otype, client.name));
      }
    };
    func();
  }, [payment]);

  return (
    <div className="modal" id="id01">
      <form className="modal-content2 animate">
        <div className="imgcontainer">
          <span
            className="close"
            onClick={onClose}
            title="Close Modal"
          >
            ×
          </span>
          {paymentId ? <p className="reg">Изменение платежа</p> : <p className="reg">Новый платеж</p>}
        </div>

        <div className="container3">
          <div style={{ marginTop: 15 }}>
            <p className="black">Клиент</p>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
            <p className="black">Вид оплаты</p>
            <select
              style={{ border: "1px solid #ccc" }}
              required
              className="select1"
              value={typeOfPayment}
              onChange={({ target: { value } }) => setTypeOfPayment(value)}
            >
              <option value={`CASH`}>Наличные</option>
              <option value={`REMITTANCE`}>Денежный перевод</option>
            </select>
            {typeOfPayment === "REMITTANCE" &&
              <div>
                <p className="black">Номер платежа</p>
                <input
                  type="text"
                  placeholder="123"
                  value={numberOfPayment}
                  onChange={({ target: { value } }) => setNumberOfPayment(value)}
                />
              </div>
            }
            <p className="black">Сумма</p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input
                type="number"
                placeholder="Сумма"
                value={price}
                name="price"
                onChange={({ target: { value } }) => setPrice(value)}
              />
              <select
                className="select_price"
                value={currency}
                onChange={({ target: { value } }) => setCurrency(value)}
                style={{ border: "1px solid lightgrey" }}
              >
                <option value="BYN" defaultValue>
                  BYN
                </option>
                <option value="USD">USD</option>
                <option value="RUB">RUB</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
            <p className="black">Дата оплаты</p>
            <input
              type="date"
              placeholder="15.04.2021"
              value={date_pay}
              onChange={({ target: { value } }) => SetDate_pay(value)}
            />
            <p className="black">Прикрепить акт</p>
            <Select
              isOptionSelected
              controlShouldRenderValue={false}
              hideSelectedOptions={false}
              closeMenuOnSelect={false}
              isMulti
              isLoading={clientId ? false : true}
              options={unpaidTask}
              formatOptionLabel={formatOptionLabel}
              value={selectedTasks}
              onChange={(options) => {
                setSelectedTasks(options);
              }}
              placeholder={selectedTasks && selectedTasks.length > 0 ? "Некоторые задачи выбраны" : "Выберите задачи"}
              removeSelected
              styles={CustomStyle}
            />
            <div style={{ textAlign: "center" }}>
              {paymentId ? (
                <button className="button5" onClick={(e) => {
                  e.preventDefault();
                  const payload = {
                    id: paymentId,
                    payments_type: typeOfPayment,
                    client: clientId,
                    price: { price, currency },
                    payment_number: numberOfPayment,
                    date_pay,
                    tasks
                  };
                  updatePayment(payload);
                }}>
                  Обновить
                </button>
              ) : (
                <button className="button5" onClick={(e) => {
                  e.preventDefault();
                  const payload = {
                    payments_type: typeOfPayment,
                    client: clientId,
                    price: { price, currency },
                    payment_number: numberOfPayment,
                    date_pay,
                    tasks
                  };
                  createPayment(payload);
                }}>
                  Создать
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPayment;