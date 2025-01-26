const { PhonebookEntryFactory } = require("../../domain/model/PhonebookEntryFactory")
const mongoose = require("mongoose");

class PhonebookDatabaseClient {
  phoneBookEntries;

  constructor(mongoose) {
    this.phoneBookEntries = PhonebookEntryFactory.phonebookEntries(mongoose);
  }

  async getAll() {
    try {
      return await this.phoneBookEntries.find({});
    }
    catch (error) {
      console.error(error);
    }
  }

  async get(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return Promise.resolve(null);
      }
      return await this.phoneBookEntries.findById(id);
    }
    catch (error) {
      console.error(error);
    }
  }

  async save(entryObject) {
    try {
      const newEntry = PhonebookEntryFactory.newInstance(this.phoneBookEntries, entryObject);
      return await newEntry.save();
    }
    catch (error) {
      console.error(error)
    }
  }

  async update(id, newEntryObject) {
    // { new: true } will make the findByIdAndUpdate call
    // return new document instead of old one
    try {
      return await this.phoneBookEntries.findByIdAndUpdate(id, newEntryObject, { new: true });
    }
    catch (error) {
      console.error(error);
    }
  }

  async remove(id) {
    try {
      return await this.phoneBookEntries.findOneAndDelete({ _id: id });
    }
    catch (error) {
      console.error(error);
    }
  }
}

module.exports = { PhonebookDatabaseClient };



