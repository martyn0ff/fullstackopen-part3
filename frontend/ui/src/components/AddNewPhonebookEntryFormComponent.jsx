import PhonebookEntryObject from "../objects/PhonebookEntryObject.js";
import NotificationObject from "../objects/NotificationObject.js";
import { config } from "../config.json";

function AddNewPhonebookEntryFormComponent({ phonebook, updatePhonebook, newName, setNewName, notifications, setNotifications, newPhoneNumber, setNewPhoneNumber, phonebookClient }) {

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const entry = new PhonebookEntryObject(
      form.newName.value,
      form.newPhoneNumber.value,
    );

    const alreadyExistingIdx = phonebook.findIndex(e => e.name === entry.name);
    if (alreadyExistingIdx !== -1) {
      const alreadyExistingEntry = phonebook[alreadyExistingIdx];
      const isNewPhoneNumberConfirmed = confirm(`This name already exists in phonebook. Do you want to update the phone number?`);
      if (isNewPhoneNumberConfirmed) {
        phonebookClient
          .update(alreadyExistingEntry.id, new PhonebookEntryObject(entry.name, entry.phoneNumber))
          .then(updatedEntry => {
            const newPhonebook = phonebook.map(e => e.id === updatedEntry.id ? updatedEntry : e);
            updatePhonebook(newPhonebook);
            const phoneUpdatedNotification = NotificationObject.newInfo(`${entry.name}'s phone number has been updated!`);
            addNotification(phoneUpdatedNotification);
          })
          .catch(error => {
            if (error.status === 404) {
              const alreadyDeletedNotification = NotificationObject.newWarning(`${entry.name}'s phone number has already been deleted!`);
              addNotification(alreadyDeletedNotification);
              phonebookClient
                .getAll()
                .then(persons => {
                  const phonebook = persons.map(person => PhonebookEntryObject.fromJson(person));
                  updatePhonebook(phonebook);
                })
            }
            else {
              throw error;
            }
          })
      }
    }
    else {
      phonebookClient
        .save(entry)
        .then(() => {
          const newPhonebook = phonebook.concat(entry);
          updatePhonebook(newPhonebook);
          setNewName("");
          setNewPhoneNumber("");
          const personAddedNotification = NotificationObject.newInfo(`Added "${entry.name}" to the phonebook!`);
          addNotification(personAddedNotification);
        })
    }
  }

  function addNotification(notification) {
    const removeAt = Date.now() + config.notification.displayTime;
    const newNotifications = new Map([...notifications, [removeAt, notification]]);
    setNotifications(newNotifications);
  }

  function handleOnNameChange(event) {
    const input = event.target;
    setNewName(input.value);
  }

  function handleOnPhoneNumberChange(event) {
    const input = event.target;
    setNewPhoneNumber(input.value);
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <div
        style={{
          alignItems: "flex-start",
          width: "300px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label htmlFor="newName">Name</label>
        <input
          placeholder="Enter a name..."
          type="text"
          name="newName"
          value={newName}
          onChange={handleOnNameChange}
        />
        <br />
        <label htmlFor="newPhoneNumber">Phone number</label>
        <input
          placeholder="Enter a phone number..."
          type="text"
          name="newPhoneNumber"
          value={newPhoneNumber}
          onChange={handleOnPhoneNumberChange}
        />
        <button
          type="submit"
        >
          Add entry
        </button>
      </div>
    </form>
  );
}

export default AddNewPhonebookEntryFormComponent;