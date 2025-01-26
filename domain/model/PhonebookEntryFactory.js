const { toJSON } = require("../../out/db");

class PhonebookEntryFactory {
  static phonebookEntries(mongoose) {
    const schema = new mongoose.Schema({
        name: String,
        phoneNumber: String
      }
    );

    schema.set("toJSON", toJSON());
    return mongoose.model("PhonebookEntry", schema);
  }

  static newInstance(phonebookEntries, name, phoneNumber) {
    return phonebookEntries(name, phoneNumber);
  }
}

module.exports = { PhonebookEntryFactory };