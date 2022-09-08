import React, { useState, useEffect } from 'react';
import loadData from '../js/model';
import { DynamicTabs } from './TabComponents';
import Dropdown from './Dropdown';
import '../css/App.css';
import { maxJokesPerPage, initialState, statePropsNames, dropDownDesc, dropdownValues } from '../js/consts';

export default function App() {

  const [state, setStateGeneric] = useState(initialState);

  const setState = (propName) => ( //Generic wrapper fun for useState hook so it can be used for all state values
    (value) => setStateGeneric(prevState => ({
      ...prevState,
      [propName]: value
    }))
  )
  const { selectedTab, tabs, jokes, jokesPerPage, activePage } = statePropsNames; // For the generic setState

  useEffect(() => {
    loadData(setState(tabs), setState(jokes));
  }, []); //Empty array dependency to avoid re-rendering

  const resetPaging = () => setState(activePage)(0);

  const tabsProps = {
    tabChange: (newTab) => {
      setState(selectedTab)(newTab);
      resetPaging();  //reset paging when moving between tabs
    },
    pagingChange: setState(activePage),
    ...state
  };

  const perPageChange = (value) => {
    setState(jokesPerPage)(value);
    resetPaging(); //reset paging when moving between tabs
  };

  return (
    <div>
      <Dropdown maxNumber={maxJokesPerPage} numValues={dropdownValues} onChange={perPageChange}
        selectedValue={state.jokesPerPage}
        descText={dropDownDesc} marginBottom={10} marginLeft={10} />

      {state.tabs ? <DynamicTabs {...tabsProps} /> : null}
    </div>
  );
}