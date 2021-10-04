import React from 'react';
import { Button, Grid, Header, StrictHeaderProps } from 'semantic-ui-react';
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
            <Button fluid>Add Contact</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}
