class StorageService {
  setItem(key, value) {
    sessionStorage.setItem(key, window.btoa(JSON.stringify(value)));
  }

  getItem(key) {
    const data = sessionStorage.getItem(key);
    if (data) {
      return JSON.parse(window.atob(data));
    }
    return null;
  }

  removeItem(key) {
    sessionStorage.removeItem(key);
  }

  clear() {
   sessionStorage.clear();
    sessionStorage.clear();
  }
}

export default new StorageService();
