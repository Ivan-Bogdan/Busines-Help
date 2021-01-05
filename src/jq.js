const burgerWrap = document.querySelector(".menu-icon-wrapper");
const burger = document.querySelector(".menu-icon");
const menuContainer = document.querySelector(".mobile-container");
if(burgerWrap){
  burgerWrap.addEventListener("click", () => {
    burger.classList.toggle("menu-icon-active");
    menuContainer.classList.toggle("display-none");
});
}



const dropdowns = document.querySelectorAll('.dropdown');
if(dropdowns){
dropdowns.forEach(dropdown => {
  dropdown.addEventListener('click', (e) => {
    dropdown.classList.toggle('dropdown__options--visible')
  })
  
 dropdown.querySelectorAll('.dropdown__options .dropdown__option').forEach(opt => {
    opt.addEventListener('click', (e) => {      
      dropdown.querySelector('.dropdown__selected').innerHTML = opt.innerHTML;
    })
  })
})
}

var modal = document.getElementById("id01");

      // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
<<<<<<< HEAD
        if (event.target === modal) {
=======
        if (event.target == modal) {
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
          modal.style.display = "none";
        }
      };



/*       {
        "email":"vanobogdan@yandex.by",
        "password":"12345AsS",
        "phone":"+375292541222",
        "role_id":1,
        "fingerprint":"5b5373b11813eb70460a",
        "data":
        {
          "otype":"2",
          "name":"admin",
          "unp":"12345678",
          "city_id":"48095431-6f4d-4432-9fcd-bc9ad53acab6",
          "address":"gaf21",
          "oked":"12345678",
          "full_name":"12345678"
        }
   } */