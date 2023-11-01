import React from "react";

function SelectionCheckbox({ isSelected, onChange }) {
  return (
    <>
      <input type="checkbox" style={{ display: "none" }} />
      <label className="checkbox checkbox-single">
        <input type="checkbox" checked={isSelected} onChange={onChange} />
        <span />
      </label>
    </>
  );
}

function groupingItemOnSelect(props) {
  const { ids, setIds, rowId, selectAllKey } = props;
  if (selectAllKey && ids.some((item) => item.id === rowId.id)) {
    setIds(ids.filter((item) => item.id !== rowId.id));
  } else if (!selectAllKey && ids.some((id) => id === rowId)) {
    setIds(ids.filter((id) => id !== rowId));
  } else {
    const newIds = [...ids];
    newIds.push(rowId);
    setIds(newIds);
  }
}

function groupingAllOnSelect(props, key) {
  const { isSelected, setIds, entities, selectAllKey } = props;
  if (selectAllKey && !isSelected) {
    const allIds = [];
    entities.forEach((el) => allIds.push(el));
    setIds(allIds);
  } else if (!isSelected && !selectAllKey) {
    const allIds = [];
    entities.forEach((el) => allIds.push(el[key]));
    setIds(allIds);
  } else {
    setIds([]);
  }
  return isSelected;
}

// check official documentations: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Row%20Selection&selectedStory=Custom%20Selection%20Column%20Header%20Style&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
export function getSelectRow(props) {
  const {
    entities,
    ids,
    setIds,
    key = "id",
    hideSelectColumn = false,
    hideSelectAll = false,
    selectAllKey = false,
  } = props;
  return {
    mode: "checkbox",
    clickToSelect: true,
    hideSelectAll: hideSelectAll,
    selectionHeaderRenderer: () => {
      const isSelected = entities && entities.length > 0 && entities.length === ids.length;
      const props = { isSelected, entities, setIds, selectAllKey };
      return (
        <SelectionCheckbox
          isSelected={isSelected}
          onChange={() => groupingAllOnSelect(props, key)}
        />
      );
    },
    selectionRenderer: ({ rowIndex }) => {
      const isSelected = ids.some((el) => {
        if (selectAllKey) {
          return el.id === entities[rowIndex].id;
        } else {
          return el === entities[rowIndex][key];
        }
      });
      const props = {
        ids,
        setIds,
        rowId: selectAllKey ? entities[rowIndex] : entities[rowIndex][key],
        selectAllKey,
      };
      return (
        <SelectionCheckbox isSelected={isSelected} onChange={() => groupingItemOnSelect(props)} />
      );
    },
    hideSelectColumn: hideSelectColumn,
  };
}
