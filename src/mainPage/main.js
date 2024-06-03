import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './main.css';
import DailyProcessPage from './DailyProcessPage';
import Settings from '../settingsPage/settings';
import UserNeeded from './userNeeded';

const Main = () => {
  return (
    <div>
        <div className='title'>
        <img src={process.env.PUBLIC_URL + '/gpcLogo.png'} alt='greatPointCapital' className='logo' />
        <h2 className='name'>Great Point Capital</h2>
        </div>
      <Tabs>
        <TabList>
          <Tab>Scripts</Tab>
          <Tab>Files</Tab>
          <Tab>User Needed</Tab>
          <Tab>Settings</Tab>
        </TabList>

        <TabPanel>
          <DailyProcessPage />
        </TabPanel>
        <TabPanel>
          <h2>Content for Tab 2</h2>
          <p>This is the content for Tab 2.</p>
        </TabPanel>
        <TabPanel>
          <h2>Content for Tab 3</h2>
          < UserNeeded />
        </TabPanel>
        <TabPanel>
          <h2>Content for Tab 4</h2>
          < Settings />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Main;
