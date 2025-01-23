PhonebookUtil.phonebookToDisplayed = function(phonebook) {
  return {
    properties: {
      isFiltered: false
    },
    items: PhonebookUtil.phonebookToDisplayedItems(phonebook)
  };
}

PhonebookUtil.phonebookToDisplayedItems = function(phonebook) {
  return phonebook.map(entry => ({
    value: entry,
    properties: {
      highlightedRanges: []
    }
  }))
}

function PhonebookUtil() {

}

export default PhonebookUtil;
