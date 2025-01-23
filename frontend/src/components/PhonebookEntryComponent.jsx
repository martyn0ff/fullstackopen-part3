function PhonebookEntryComponent({ entryObject, phonebook, updatePhonebook, phonebookClient }) {
  function buildJsx(entryObject) {
    // no highlighting if there are no ranges
    if (entryObject.properties.highlightedRanges.length === 0) {
      return entryObject.value.name;
    }

    const jsxBuilder = [];
    let i = 0;
    let keyIdx = 0;
    for (const range of entryObject.properties.highlightedRanges) {
      const plainText = <span key={entryObject.value.id + "-" + keyIdx++}>
      {entryObject.value.name.slice(i, range.start)}
    </span>;
      const markedText = <mark key={entryObject.value.id + "-" + keyIdx++}>
        {entryObject.value.name.slice(range.start, range.end+1)}
      </mark>
      jsxBuilder.push(plainText);
      jsxBuilder.push(markedText);
      i = range.end+1;
    }
    // handle case where highlighted text
    // is not at the end of a name
    if (i <= entryObject.value.name.length - 1) {
      jsxBuilder.push(<span key={entryObject.value.id + "-" + keyIdx++}>{entryObject.value.name.slice(i)}</span>);
    }
    return jsxBuilder;
  }

  function handleOnDeleteClick() {
    phonebookClient.delete(entryObject.value.id)
      .then(() => {
        const newPhonebook = phonebook.filter(e => e.id !== entryObject.value.id);
        updatePhonebook(newPhonebook);
      });
  }

  return (
    <li
      key={entryObject.value.id}
    >
      <span>
      [
      <a
        href="#"
        onClick={handleOnDeleteClick}
      >
        del
      </a>
      ]
      </span> <strong>{buildJsx(entryObject)}</strong>: {entryObject.value.phoneNumber}
    </li>);
}


export default PhonebookEntryComponent;