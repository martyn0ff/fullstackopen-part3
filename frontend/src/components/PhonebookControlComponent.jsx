import HeaderComponent from "./HeaderComponent.jsx";
import AddNewPhonebookEntryFormComponent from "./AddNewPhonebookEntryFormComponent.jsx";
import FilterPhonebookComponent from "./FilterPhonebookComponent.jsx";

function PhonebookControlComponent({ phonebook, updatePhonebook, displayedPhonebook, setDisplayedPhonebook, newName, setNewName, notifications, setNotifications, newPhoneNumber, setNewPhoneNumber, phonebookClient }) {

  return (
    <div id="phonebook-control">
      <HeaderComponent value="Phonebook" />
      <AddNewPhonebookEntryFormComponent
        phonebook={phonebook}
        updatePhonebook={updatePhonebook}
        newName={newName}
        setNewName={setNewName}
        newPhoneNumber={newPhoneNumber}
        setNewPhoneNumber={setNewPhoneNumber}
        notifications={notifications}
        setNotifications={setNotifications}
        phonebookClient={phonebookClient}
      />
      <br />
      <FilterPhonebookComponent
        displayedPhonebook={displayedPhonebook}
        setDisplayedPhonebook={setDisplayedPhonebook}
      />
    </div>
  );
}

export default PhonebookControlComponent;