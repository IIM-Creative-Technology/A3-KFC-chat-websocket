const Session = {

  create(token, payload = {}, stayConnected = false) {
    payload.isUser = payload.isUser !== undefined ? payload.isUser : true;
    payload.isAdmin = payload.isAdmin !== undefined ? payload.isAdmin : false;

    this.destroy();
    this.setToken(token, stayConnected);
    this.setPayload(payload, stayConnected);
  },

  destroy() {
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("sessionPayLoad");
    sessionStorage.removeItem("sessionToken");
    sessionStorage.removeItem("sessionPayLoad");
  },

  setToken(token, stayConnected = false) {
    if (stayConnected) {
      localStorage.setItem("sessionToken", token);
    } else {
      sessionStorage.setItem("sessionToken", token);
    }
  },

  setPayload(payload, stayConnected = false) {
    if (stayConnected) {
      localStorage.setItem("sessionPayLoad", JSON.stringify(payload));
    } else {
      sessionStorage.setItem("sessionPayLoad", JSON.stringify(payload));
    }
  },

  getToken() {
    if (sessionStorage.getItem("sessionToken") !== null) {
      return sessionStorage.getItem("sessionToken");
    } else {
      return localStorage.getItem("sessionToken");
    }

  },

  getPayload(key = null) {
    let payload = null;

    if (sessionStorage.getItem("sessionPayLoad") !== null) {
      payload = JSON.parse(sessionStorage.getItem("sessionPayLoad"));
    } else {
      payload = JSON.parse(localStorage.getItem("sessionPayLoad"));
    }

    if (key === null) {
      return payload
    } else if (payload !== null) {
      return payload[key]
    } else {
      return payload
    }
  },

  isConnected() {
    return this.getToken() != null;
  },

  isAdmin() {
    return (this.isConnected() && this.getPayload("isAdmin"));
  }
}

export default Session;