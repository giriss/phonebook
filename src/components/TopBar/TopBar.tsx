import React from 'react';
import { Grid, Header, StrictHeaderProps } from 'semantic-ui-react';
import AddContact from '../Contact/AddContact';
import SearchBar from './SearchBar';

type Props = StrictHeaderProps;

export default function TopBar(props: Props) {
  return (
    <>
      <Header {...props}>Phonebook</Header>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={12}>
            <SearchBar />
          </Grid.Column>
          <Grid.Column width={4}>
            <AddContact />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}
