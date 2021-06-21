export const getNameOtype = ((otype) => {
  switch (otype) {
    case 0:
      return "ИП";
    case 1:
      return "ООО";
    case 2:
      return "ОАО";
    case 3:
      return "ЧУП";
    case 4:
      return "ЧТУП";
    case 5:
      return "ИНОЕ";
    case 6:
      return "ФИЗ ЛИЦО";
    case 7:
      return "СООО";
    case 8:
      return "ЧП";
    case 9:
      return "УП";
  }
});