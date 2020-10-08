import axios from "axios";

export const cityList = (payload) => {
  return axios
    .post("http://altproduction.ru:8080/rest/v1/city/", JSON.stringify(payload))
    .then((response) => {
      console.log(response.data.city);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const Reg = (payload) => {
  return axios
    .post(
      "http://178.21.8.225:8080/rest/account/create/",
      JSON.stringify(payload)
    )
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const Login = (payload) => {
  return axios
    .post(
      "http://178.21.8.225:8080/rest/account/login/",
      JSON.stringify(payload)
    )
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const updateToken = (data) => {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(JSON.parse(xhttp.responseText));
    } else {
      console.log(JSON.parse(xhttp.responseText).message);
    }
  };

  xhttp.open(
    "POST",
    "https://cors-anywhere.herokuapp.com/http://178.21.8.225:8080/rest/account/update/",
    true
  );
  xhttp.setRequestHeader("Authorization", localStorage.getItem("token"));
  xhttp.send(JSON.stringify(data));
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    if (data !== undefined) {
      localStorage.setItem("token", data.data.token);
    } else {
      return false;
    }
  }
  next();
};

export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("token")) {
    return localStorage.getItem("token");
  } else {
    return false;
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
  next();
};

export const getUser = (event) => {
  event.preventDefault();
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(JSON.parse(xhttp.responseText));
    } else if (this.status == 400) {
    } else {
      console.log("error");
    }
  };

  xhttp.open(
    "GET",
    "https://cors-anywhere.herokuapp.com/http://178.21.8.225:8080/rest/account/get-user/",
    true
  );
  xhttp.setRequestHeader("Authorization", localStorage.getItem("token"));
  xhttp.send();
};

export const createTask = (payload) => {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(JSON.parse(xhttp.responseText));
    } else {
      console.log("error");
    }
  };

  xhttp.open(
    "POST",
    "https://cors-anywhere.herokuapp.com/http://178.21.8.225:8080/rest/task/create_task/",
    true
  );
  xhttp.setRequestHeader("Authorization", localStorage.getItem("token"));
  xhttp.send(JSON.stringify(payload));
};

export const get_Tasklist = (payload) => {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(JSON.parse(xhttp.responseText));
      let array = JSON.parse(xhttp.responseText).tasks;
      document.getElementById("items").innerHTML = "";
      array.map((item) => {
        let el = document.getElementById("items");
        let it = document.createElement("div");
        it.className = "item";
        it.id = item.id;
        it.onclick = () => {
          console.log(it.id);
        };
        let sp1 = document.createElement("span");
        let sp2 = document.createElement("span");
        let sp3 = document.createElement("span");
        sp2.innerHTML = item.date;
        sp1.innerHTML = item.name;
        sp3.innerHTML = item.price + " USD";
        it.appendChild(sp1);
        it.appendChild(sp2);
        it.appendChild(sp3);
        el.appendChild(it);
      });
    } else {
      console.log("error");
    }
  };

  xhttp.open(
    "POST",
    "https://cors-anywhere.herokuapp.com/http://178.21.8.225:8080/rest/task/get_task_list/",
    true
  );
  xhttp.setRequestHeader("Authorization", localStorage.getItem("token"));
  xhttp.send(JSON.stringify(payload));
};

export const delete_Task = (task) => {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(JSON.parse(xhttp.responseText));
    } else {
      console.log("error");
    }
  };
  xhttp.open(
    "POST",
    "https://cors-anywhere.herokuapp.com/http://178.21.8.225:8080/rest/task/delete_task/",
    true
  );
  xhttp.setRequestHeader("Authorization", localStorage.getItem("token"));
  xhttp.send(JSON.stringify(task));
};
