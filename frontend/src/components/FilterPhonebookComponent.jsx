import { useState } from "react";

function FilterPhonebookComponent({ displayedPhonebook, setDisplayedPhonebook }) {

  const [newFilterValue, setNewFilterValue] = useState("");

  function handleOnFilterInput(event) {
    const filterValue = event.target.value;

    if (filterValue === "") {
      const clearedDisplayedPhonebook = clearHighlightedRanges(displayedPhonebook);
      clearedDisplayedPhonebook.properties.isFiltered = false;
      setDisplayedPhonebook(clearedDisplayedPhonebook);
    }
    else {
      const highlightedDisplayedPhonebook = updateHighlightedRanges(displayedPhonebook, filterValue);
      highlightedDisplayedPhonebook.properties.isFiltered = true;
      setDisplayedPhonebook(highlightedDisplayedPhonebook);
    }
    setNewFilterValue(filterValue);
  }

  return (
    <div
      id="phonebook-search"
      style={{
        alignItems: "flex-start",
        width: "300px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <label htmlFor="phonebook-search-input">Filter by name</label>
      <input
        placeholder="Enter a name to filter by..."
        name="filter"
        type="search"
        onInput={handleOnFilterInput}
        value={newFilterValue}
      />
    </div>
  );
}

function clearHighlightedRanges(displayedPhonebook) {
  return {
    ...displayedPhonebook,
    items: displayedPhonebook.items.map(entry => ({
      ...entry,
      properties: {
        highlightedRanges: []
      }
    }))
  };
}

function updateHighlightedRanges(displayedPhonebook, filterValue) {
  return {
    ...displayedPhonebook,
    items: displayedPhonebook.items.map(entry => ({
      ...entry,
      properties: {
        highlightedRanges: allIndexOf(normalize(entry.value.name), normalize(filterValue))
      }
    }))
  };

}

function normalize(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function allIndexOf(str, substr) {
  const indices = [];
  let position = 0;
  let currentIndex = null;
  while ((currentIndex = str.indexOf(substr, position)) !== -1) {
    indices.push(currentIndex);
    position = currentIndex + 1;
  }

  return indices.map(idx => ({
    start: idx,
    end: idx + substr.length - 1,
  }));
}

export default FilterPhonebookComponent;