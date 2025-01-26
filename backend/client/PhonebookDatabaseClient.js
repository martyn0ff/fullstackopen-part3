const { PhonebookEntryFactory } = require("../model/PhonebookEntryFactory")

class PhonebookDatabaseClient {
  PhonebookEntry;

  constructor(mongoose) {
    this.PhonebookEntry = PhonebookEntryFactory.newPhonebookEntry(mongoose);
  }

  getAll() {
    return this.PhonebookEntry
      .find({})
      .catch(error => console.error(error));
  }

  get(id) {
    return this.PhonebookEntry
      .findById(id)
      .catch(error => console.error(error));
  }

  save(entryObject) {
    const newEntry = new this.PhonebookEntry(entryObject);
    return newEntry.save()
      .catch(error => console.error(error));
  }

  update(id, newEntryObject) {
    return this.PhonebookEntry.updateOne({ _id: id }, newEntryObject)
      .catch(error => console.error(error));
  }

  remove(id) {
    return this.PhonebookEntry.deleteOne({ _id: id })
      .catch(error => console.error(error));
  }
}

module.exports = PhonebookDatabaseClient;



