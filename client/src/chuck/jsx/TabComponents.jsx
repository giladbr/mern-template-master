import React from 'react';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { allTab } from '../js/consts';
import { makeStyles } from '@material-ui/core/styles';
import jokeHTML from './Joke';
import { Paging } from './Paging';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  }
}));

export const DynamicTabs = (props) => {
  const { tabs, selectedTab, tabChange } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={selectedTab}
          onChange={(e, selectedTab) => tabChange(selectedTab)}>
          {tabs.map((tab, i) => (
            <Tab key={i} label={tab} {...a11yProps(i)}></Tab>
          ))}
        </Tabs>
      </AppBar>

      {tabs.map((tab, i) => (
        <TabPanel value={selectedTab} index={i} key={i}>
          <TabContent tab={tab} {...props} />
        </TabPanel>
      ))}
    </div>
  )
}

const TabContent = (props) => {
  const { tab, activePage, jokesPerPage, jokes, pagingChange } = props;

  let tabJokes = [];
  if (tab === allTab) {
    for (let key in jokes) { //Object of arrays - "all" category
      tabJokes.push(...jokes[key]);
    }
  } else {
    tabJokes = jokes[tab]; //Conventional category tab
  };
  const startIndex = jokesPerPage * activePage;
  const visibleJokes = tabJokes.slice(startIndex, startIndex + jokesPerPage);
  return <div>
    <Paging activePage={activePage}
      numPages={tabJokes.length / jokesPerPage}
      onClick={pagingChange}
    />
    {visibleJokes.map(jokeHTML)}
  </div>
}

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`} {...other}>
      {value === index && (
        <Box p={3}>
          {children}
        </Box>)}
    </div>);
}
//*Accessibility - from Material UI
const a11yProps = (index) => ({
  id: `nav-tab-${index}`,
  'aria-controls': `nav-tabpanel-${index}`,
})