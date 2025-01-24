import axios from "axios";

class PhonebookClient {
  static PROTOCOL = "http";
  static HOST= process.env.PHONEBOOK_BACKEND_HOST || "localhost";
  static PORT= process.env.PHONEBOOK_BACKEND_PORT || 3002;
  static BASE_URL= `${PhonebookClient.PROTOCOL}://${PhonebookClient.HOST}:${PhonebookClient.PORT}`;

  getAll() {
    return axios.get(`${PhonebookClient.BASE_URL}/api/persons`)
      .then(res => res.data);
  }

  save(entryObject) {
    return axios.post(`${PhonebookClient.BASE_URL}/api/persons`, entryObject)
      .then(res => res.data);
  }

  update(id, newEntryObject) {
    return axios.put(`${PhonebookClient.BASE_URL}/api/persons/${id}`, newEntryObject)
      .then(res => res.data);
  }

  /**
   *
   * @param id
   * @returns {Promise<axios.AxiosResponse<any>>} removed person
   */
  delete(id) {
    return axios.delete(`${PhonebookClient.BASE_URL}/api/persons/${id}`)
      .then(res => res.data);
  }
}

export default PhonebookClient