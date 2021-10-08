import React from 'react';
import { Route, Switch } from 'react-router';
import { Divider } from 'semantic-ui-react';
import ContactModalTrigger from '../Contact/ContactModalTrigger';
import ContactsList from '../Contact/ContactsList';
import TopBar from '../TopBar/TopBar';

export default function PhonebookApp() {
  return (
    <>
      <TopBar
        action={
          <Switch>
            <Route exact path="/" component={ContactModalTrigger} />
            <Route exact path="/contacts/new">
              <ContactModalTrigger isOpen />
            </Route>
            <Route exact path="/contacts/:id">
              {({ match }) => (
                <ContactModalTrigger isOpen contactId={match?.params.id} />
              )}
            </Route>
          </Switch>
        }
      />
      <Divider hidden />
      <ContactsList />
    </>
  );
}
