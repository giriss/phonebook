import React, { ReactNode } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import SearchBar from './SearchBar';

type Props = {
  action: ReactNode;
};

export default function TopBar({ action }: Props) {
  return (
    <>
      <Header textAlign="center">Phonebook</Header>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={12}>
            <SearchBar />
          </Grid.Column>
          <Grid.Column width={4}>
            {action}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}
