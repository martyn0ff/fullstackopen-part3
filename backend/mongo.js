const mongoose = require("mongoose");

// first two elements in process.argv array
// are the command itself
if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log(`Usage: ${process.argv[0]} ${process.argv[1]} <password> [<person> <phone number>]`);
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const phoneNumber = process.argv[4];

const url =
  `mongodb+srv://roman:${password}@test-cluster.76dex.mongodb.net/?`
  + "retryWrites=true"
  + "&w=majority"
  + "&appName=test-cluster";

mongoose.set("strictQuery", false);
mongoose.connect(url);

const phonebookEntrySchema = new mongoose.Schema({
  name: String,
  phoneNumber: String
});

const PhonebookEntry = mongoose.model("PhonebookEntry", phonebookEntrySchema);
const newEntry = new PhonebookEntry({ name, phoneNumber });

if (password && name && phoneNumber) {
  newEntry.save().then(entry => {
    console.log(`Added ${entry.name} (${entry.phoneNumber}) to phonebook.`);
    mongoose.connection.close();
  });
}

if (password && !name && !phoneNumber) {
  PhonebookEntry.find({}).then((result) => {
    result.forEach(entry => {
      console.log(`${entry.name}: ${entry.phoneNumber}`);
    })
    mongoose.connection.close();
  });
}