const { PhonebookEntryFactory } = require("../../domain/model/PhonebookEntryFactory")
const mongoose = require("mongoose");

class PhonebookDatabaseClient {
  phoneBookEntries;

  constructor(mongoose) {
    this.phoneBookEntries = PhonebookEntryFactory.phonebookEntries(mongoose);
  }

  getAll() {
    return this.phoneBookEntries.find({});
  }

  get(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Promise.resolve(null);
    }
    return this.phoneBookEntries.findById(id);
  }

  save(entryObject) {
    const newEntry = PhonebookEntryFactory.newInstance(this.phoneBookEntries, entryObject);
    return newEntry.save();
  }

  update(id, newEntryObject) {
    // { new: true } will make the findByIdAndUpdate call
    // return new document instead of old one
    const opts = { new: true, runValidators: true };
    return this.phoneBookEntries.findByIdAndUpdate(id, newEntryObject, opts);
  }

  remove(id) {
    return this.phoneBookEntries.findOneAndDelete({ _id: id });
  }
}

module.exports = { PhonebookDatabaseClient };



