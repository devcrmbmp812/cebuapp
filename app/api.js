/**
 * Created by Kash.C on 10/25/18.
 */
import Base64 from "./utils/Base64";
import consts from "./const";
import queryString from "query-string";
import FormData from "FormData";
// work with api goes here

export function newcreateUser(firstname, lastname, username, password) {
  let signupData = new FormData();
  signupData.append("firstname", firstname);
  signupData.append("lastname", lastname);
  signupData.append("username", username);
  signupData.append("password", password);
  

  return fetch(consts.API_ENDPOINT + `auth/userRegister/`, {
    method: "POST",
    headers: consts.BASE_HEADER,
    body: signupData
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.warn(error);
    });
}

export function loginUser(username, password) {
  let loginData = new FormData();
  loginData.append("username", username);
  loginData.append("password", password);

  return fetch(consts.API_ENDPOINT + `auth/userLogin/`, {
    method: "POST",
    headers: consts.BASE_HEADER,
    body: loginData
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.warn(error);
    });

}

export function getDrawresults(token, page, limit) {
  const params = queryString.stringify({
    page: page,
    per_page: limit
  });
  //console.warn('params', params);
  //console.warn('path', `drawresult/drawresultlist?${params}`);
  //console.warn('path',)
  return fetch(consts.API_ENDPOINT + `drawresult/drawresultlist?${params}`, {
    method: "GET",
    headers: {'Authorization': token}
  })
    .then(list => {
    //  console.warn('list',list);
      return list.json();
    })
    .catch(error => {
      console.log(error);
    });
}

export function getRepositories(token, page, limit) {
  const params = queryString.stringify({
    access_token: token,
    page: page,
    per_page: limit
  });
  return fetch(`https://api.github.com/user/repos?${params}`, {
    method: "GET",
    headers: consts.BASE_HEADER
  })
    .then(list => {
      return list.json();
    })
    .catch(error => {
      console.log(error);
    });
}

export function getReadMe(token, username, repository) {
  const params = queryString.stringify({
    access_token: token
  });
  return fetch(
    `https://api.github.com/repos/${username}/${repository}/readme?${params}`,
    {
      method: "GET",
      headers: consts.BASE_HEADER
    }
  )
    .then(readMe => {
      return readMe.json();
    })
    .catch(error => {
      console.log(error);
    });
}

export function getAccessToken(username, password) {
  return fetch(
    `https://api.github.com/authorizations/clients/${consts.CLIENT_ID}`,
    {
      method: "PUT",
      headers: getAuthHeader(username, password),
      body: JSON.stringify({
        client_secret: consts.CLIENT_SECRET
      })
    }
  )
    .then(user => {
      return user.json();
    })
    .catch(error => {
      console.log(error);
    });
}

export function logOut(token) {

  return fetch(consts.API_ENDPOINT + `auth/logout`, {
    method: "DELETE",
    headers: {'Authorization': token}
  })
    .then(list => {
    //  console.warn('list',list);
      return list.json();
    })
    .catch(error => {
      console.log(error);
    });
}
function getAuthHeader(username, password) {
  const baseString = Base64.btoa(`${username}:${password}`).replace(
    "\n",
    "\\n"
  );
  return {
    ...consts.BASE_HEADER,
    Authorization: `Basic ${baseString}`
  };
}
