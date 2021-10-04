import React from 'react';
import { Header, StrictHeaderProps } from 'semantic-ui-react';
import SearchBar from './SearchBar';

import cls from './TopBar.module.sass';

type Props = StrictHeaderProps;

export default function TopBar(props: Props) {
  return (
    <>
      <Header {...props}>Phonebook</Header>
      <div className={cls.searchBar}>
        <SearchBar />
      </div>
    </>
  );
}
