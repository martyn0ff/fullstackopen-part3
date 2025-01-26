const { toJSON } = require("../../out/db");

class PhonebookEntryFactory {
  static phonebookEntries(mongoose) {
    const schema = new mongoose.Schema({
      name: {
        type: String,
        minLength: [3, "Name should be at least 3 characters long"],
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
        validate: {
          validator: (value) => /\d{2,3}-\d+$/.test(value),
          message: "Invalid phone number",
        },
      },
    });

    schema.set("toJSON", toJSON());
    return mongoose.model("PhonebookEntry", schema);
  }

  static newInstance(phonebookEntries, name, phoneNumber) {
    return phonebookEntries(name, phoneNumber);
  }
}

module.exports = { PhonebookEntryFactory };
