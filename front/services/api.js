import session from './session.js'


const Api = {
  get(action, isTokenRequired) {
    return new Promise((resolve, reject) => {
      this.call('GET', action, isTokenRequired).then(
        (result) => { resolve(result) }, (error) => { reject(error) });
    })
  },

  post(action, isTokenRequired, body = {}) {
    return new Promise((resolve, reject) => {
      this.call('POST', action, isTokenRequired, body).then(
        (result) => { resolve(result) }, (error) => { reject(error) });
    })
  },

  patch(action, isTokenRequired, body = {}) {
    return new Promise((resolve, reject) => {
      this.call('PATCH', action, isTokenRequired, body).then(
        (result) => { resolve(result) }, (error) => { reject(error) });
    })
  },

  put(action, isTokenRequired, body = {}) {
    return new Promise((resolve, reject) => {
      this.call('PUT', action, isTokenRequired, body).then(
        (result) => { resolve(result) }, (error) => { reject(error) });
    })
  },

  delete(action, isTokenRequired, body = {}) {
    return new Promise((resolve, reject) => {
      this.call('DELETE', action, isTokenRequired, body).then(
        (result) => { resolve(result) }, (error) => { reject(error) });
    })
  },

  call(method, actionRoute, isTokenRequired, body = {}) {
    // Set headers
    let customHeaders = {
      'Content-Type': 'application/json',
    };
    if (isTokenRequired) {
      customHeaders['Authorization'] = session.getToken();
    }

    // Set requestOptions
    let requestOptions = {
      method: method,
      // mode: "no-cors",
      headers: customHeaders
    };
    if (method != 'GET') {
      requestOptions['body'] = JSON.stringify(body);
    }

    // Send request
    return new Promise((resolve, reject) => {
      fetch(`${process.env.API_ENDPOINT}/${actionRoute}`, requestOptions)
        .then(async response => {
          const data = await response.json();

          if (response.ok) { // Return result
            resolve(data);
          } else { // Return error
            reject({
              "code": data.code,
              "message": data.message,
              "debug": data.debug
            });
          }
        }).catch(() => {
          reject({
            "code": null,
            "message": null
          });
        });
    });
  }
}

export default Api;