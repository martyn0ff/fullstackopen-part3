import HeaderComponent from "./HeaderComponent.jsx";
import PhonebookEntryComponent from "./PhonebookEntryComponent.jsx";

function PhonebookComponent({ phonebook, updatePhonebook, displayedPhonebook, phonebookClient }) {

  let displayedPhonebook1;
  if (displayedPhonebook.properties.isFiltered) {
    displayedPhonebook1 = {
      ...displayedPhonebook,
      items: displayedPhonebook.items.filter(entry => entry.properties.highlightedRanges.length > 0)
    }
  }
  else {
    displayedPhonebook1 = displayedPhonebook;
  }

  return (
    <div id='phonebook'>
      <HeaderComponent value="Numbers" />
      <ul>
        {displayedPhonebook1.items.map(entry => {
            return <PhonebookEntryComponent
              key={entry.value.id}
              entryObject={entry}
              updatePhonebook={updatePhonebook}
              phonebook={phonebook}
              phonebookClient={phonebookClient}
            />;
          }
        )}
      </ul>
    </div>
  );
}

export default PhonebookComponent;