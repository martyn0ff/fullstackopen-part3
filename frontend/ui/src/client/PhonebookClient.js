import axios from "axios";

class PhonebookClient {
  static BASE_URL= new URL(import.meta.env.VITE_PHONEBOOK_BACKEND_URI || "https://localhost:3002");

  getAll() {
    return axios.get(`${PhonebookClient.BASE_URL}/api/persons`)
      .then(res => res.data)
      .catch(err => console.error(err));
  }

  save(entryObject) {
    return axios.post(`${PhonebookClient.BASE_URL}/api/persons`, entryObject)
      .then(res => res.data)
      .catch(err => console.error(err));
  }

  update(id, newEntryObject) {
    return axios.put(`${PhonebookClient.BASE_URL}/api/persons/${id}`, newEntryObject)
      .then(res => res.data)
      .catch(err => console.error(err));
  }

  /**
   *
   * @param id
   * @returns {Promise<axios.AxiosResponse<any>>} removed person
   */
  delete(id) {
    return axios.delete(`${PhonebookClient.BASE_URL}/api/persons/${id}`)
      .then(res => res.data)
      .catch(err => console.error(err));
  }
}

export default PhonebookClient