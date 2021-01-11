import axios from "axios";

export const cityName = (payload) => {
  return axios
    .post(
      "http://altproduction.ru:8080/rest/v1/city_by_id/",
      JSON.stringify(payload)
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const cityList = (payload) => {
  return axios
    .post("http://altproduction.ru:8080/rest/v1/city/", JSON.stringify(payload))
    .then((response) => {
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
      "http://altproduction.ru/rest/account/create/",
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
      "http://altproduction.ru/rest/account/login/",
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

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    if (data !== undefined) {
      console.log(data.data.token);
      localStorage.setItem("token", data.data.token);
    } else {
      return false;
    }
  }
  next();
};

export const isAuthenticated = () => {
  if (typeof window === undefined) {
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
    window.location.reload();
  }
  next();
};

export const getUser = () => {
  return axios
    .get("http://altproduction.ru/rest/account/get-user/", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const DeleteTask = (payload) => {
  return axios
    .post(
      "http://altproduction.ru/rest/task/delete_task/",
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
      payload
    )
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const get_Task = (payload) => {
  return fetch(
    "http://altproduction.ru/rest/task/get_task/",
    {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    },
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

export async function get_task_list(payload) {
  let response = await fetch(
    "http://altproduction.ru/rest/task/get_task_list/",
    {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    }
  );
  return await response.json();
}

export async function update_token(payload) {
  return axios
    .post(
      "http://altproduction.ru/rest/account/update/",
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
}

/* export async function update_token(payload) {
  let response = await fetch("http://altproduction.ru/rest/account/update/", {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(payload),
  });
  return await response.json();
} */

export async function create_task(payload) {
  let response = await fetch("http://altproduction.ru/rest/task/create_task/", {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(payload),
  });
  return await response.json();
}

export async function delete_task(payload) {
  let response = await fetch("http://altproduction.ru/rest/task/delete_task/", {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(payload),
  });
  return await response.json();
}

export async function get_task(payload) {
  let response = await fetch("http://altproduction.ru/rest/task/get_task/", {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(payload),
  });
  return await response.json();
}

export async function update_task(payload) {
  let response = await fetch("http://altproduction.ru/rest/task/update_task/", {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(payload),
  });
  return await response.json();
}

export async function city__name(payload) {
  let response = await fetch(
    "http://altproduction.ru:8080/rest/v1/city_by_id/",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
  return await response.json();
}

export async function create_client(payload) {
  let response = await fetch(
    "http://altproduction.ru/rest/client/create_client/",
    {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    }
  );
  return await response.json();
}

export async function get_client_list(payload) {
  let response = await fetch(
    "http://altproduction.ru/rest/client/get_client_list/",
    {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    }
  );
  return await response.json();
}

export async function update_client(payload) {
  let response = await fetch(
    "http://altproduction.ru/rest/client/update_client/",
    {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    }
  );
  return await response.json();
}

export async function get_client(payload) {
  let response = await fetch(
    "http://altproduction.ru/rest/client/get_client/",
    {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    }
  );
  return await response.json();
}

export async function delete_client(payload) {
  let response = await fetch(
    "http://altproduction.ru/rest/client/delete_client/",
    {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    }
  );
  return await response.json();
}
