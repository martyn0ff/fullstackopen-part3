const { toJSON } = require("../db");

class PhonebookEntryFactory {
  static newPhonebookEntry(mongoose) {
    const schema = new mongoose.Schema({
        name: String,
        phoneNumber: String
      }
    );

    schema.set("toJSON", toJSON);
    return mongoose.model("PhonebookEntry", schema);
  }
}

module.exports = { PhonebookEntryFactory };