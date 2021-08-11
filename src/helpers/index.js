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
      filter: "name", name: "Название",
    },
    {
      filter: "client", name: "Клиент", type: "select"
    },
    {
      filter: "date", name: "Дата", type: "date"
    },
    {
      filter: "price", name: "Цена",
    },
    {
      filter: "paid", name: "Оплачено/Неоплачено", type: "select"
    }
  ],
  clients: [
    {
      filter: "name", name: "Название",
    },
    {
      filter: "otype", name: "Тип", type: "select"
    },
    {
      filter: "phone", name: "Номер Телефона",
    },
    {
      filter: "unp", name: "УНП",
    }
  ],
  payments: [
    {
      filter: "payments_type", name: "Тип платежа", type: "select"
    },
    {
      filter: "client", name: "Клиент",
    },
    {
      filter: "date_pay", name: "Дата", type: "date"
    },
    {
      filter: "price", name: "Цена",
    }
  ]
}
