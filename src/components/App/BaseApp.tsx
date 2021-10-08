import React from 'react';
import { Route, Switch } from 'react-router';
import { Container, Header, Segment } from 'semantic-ui-react';
import { allowedPaths } from '../../app/routeResolver';
import PhonebookApp from './PhonebookApp';

import cls from './BaseApp.module.sass';

function BaseApp() {
  return (
    <Container className={cls.appContainer}>
      <Segment stacked>
        <Switch>
          <Route exact path={allowedPaths}>
            <PhonebookApp />
          </Route>
          <Route>
            <Header>Oops - 404</Header>
          </Route>
        </Switch>
      </Segment>
    </Container>
  );
}

export default BaseApp;
