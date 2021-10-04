import React from 'react';
import { Container, Divider, Segment } from 'semantic-ui-react';
import ContactsList from '../ContactsList/ContactsList';
import TopBar from '../TopBar/TopBar';

import cls from './App.module.sass';

function App() {
  return (
    <Container className={cls.appContainer}>
      <Segment stacked>
        <TopBar className={cls.appTitle} />
        <Divider />
        <ContactsList />
      </Segment>
    </Container>
  );
}

export default App;
