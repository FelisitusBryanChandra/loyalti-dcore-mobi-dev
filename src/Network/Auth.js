import URI from './Uri';
import API from './Api';

import axios from 'axios';


const mAxios = axios.create({
  registerUri: URI.AUTH_API, // Suppose to be login API later
})


class Auth {


  async login(Email, Password) {

    let data = {
      'grant_type': 'confidential',
      'username': 'admin',
      'password': 'admin'
    }

    let formBody = [];

    for (let property in data) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    return new Promise((resolve, reject) => {
      mAxios.post(API.REGISTER, {
        Email: Email,
        Password: Password,
        formBody
      },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic confidential'
          }
        }).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(error);
        });
    });
  }
}


export default new Auth();