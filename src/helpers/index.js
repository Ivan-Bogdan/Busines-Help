export const getNameOtype = (otype, name, patronymic, family) => {
  switch (otype) {
    case 0:
      return `ИП ${name && patronymic && family ? `${family} ${name} ${patronymic}` : ''
        }`;
    case 1:
      return `ООО ${name ? `"${name}"` : ''}`;
    case 2:
      return `ОАО ${name ? `"${name}"` : ''}`;
    case 3:
      return `ЧУП ${name ? `"${name}"` : ''}`;
    case 4:
      return `ЧТУП ${name ? `"${name}"` : ''}`;
    case 5:
      return `ИНОЕ ${name ? `"${name}"` : ''}`;
    case 6:
      return `Ф/Л ${name && patronymic && family ? `${family} ${name} ${patronymic}` : ''
        }`;
    case 7:
      return `СООО ${name ? `"${name}"` : ''}`;
    case 8:
      return `ЧП ${name ? `"${name}"` : ''}`;
    case 9:
      return `УП ${name ? `"${name}"` : ''}`;
  }
};

export const filterForPage = {
  services: [
    {
      filter: "name", name: "Название", type: "text"
    },
    {
      filter: "client", name: "Клиент", type: "client"
    },
    {
      filter: "date", name: "Дата", type: "date"
    },
    {
      filter: "price", name: "Цена", type: "number"
    },
    {
      filter: "paid", name: "Оплачено/Неоплачено", type: "select",data:[{value: 0, label: "Не оплачено" },{value: 1, label: "Оплачено" }]
    }
  ],
  clients: [
    {
      filter: "name", name: "Название", type: "text"
    },
    {
      filter: "otype", name: "Тип", type: "select", data: [
        { value: 0, label: "ИП" },
        { value: 1, label: "ООО" },
        { value: 2, label: "ОАО" },
        { value: 3, label: "ЧУП" },
        { value: 4, label: "ЧТУП" },
        { value: 5, label: "ИНОЕ" },
        { value: 6, label: "Иностранное предприятие" }
      ]
    },
    {
      filter: "phone", name: "Номер Телефона", type: "text"
    },
    {
      filter: "unp", name: "УНП", type: "text"
    }
  ],
  payments: [
    {
      filter: "payments_type", name: "Тип платежа", type: "select", data: [
        { value: "PAYMENT_ORDER", label: "Платежное поручение (банк)" },
        { value: "RECEIPT", label: "Квитанция (наличные)" },
        { value: "CHEQUE", label: "Чек КСА (наличные)" },
        { value: "POS", label: "Терминал (по карте)" },
        { value: "OTHER", label: "Иное" }
      ]
    },
    {
      filter: "client", name: "Клиент", type: "client"
    },
    {
      filter: "date_pay", name: "Дата", type: "date"
    },
    {
      filter: "price", name: "Цена", type: "number"
    }
  ]
}
