import React, { useMemo, memo } from "react";
import { connect } from "react-redux";
import { Input, Select } from "semantic-ui-react";
import { FILTER_OPTIONS } from "../../app/constants";
import { Filter, selectCriteria, selectFilter, updateCriteria, updateFilter } from "../../app/reducers/searchSlice";
import { AppDispatch, RootState } from "../../app/store";

type Props = {
  currentCriteria: string;
  currentFilter: Filter;
  onCriteriaChange: (newCriteria: string) => void;
  onFilterChange: (newFilter: Filter) => void;
};

const SearchBar = memo(function ({
  currentCriteria,
  currentFilter,
  onCriteriaChange,
  onFilterChange,
}: Props) {
  const searchPlaceholder = useMemo(() => {
    if (currentFilter === 'any') return 'Search...';

    const selectedOption = FILTER_OPTIONS.find(option => option.value === currentFilter);
    return `Search by ${selectedOption?.text?.toLowerCase()}...`
  }, [currentFilter]);

  return (
    <Input
      fluid
      value={currentCriteria}
      icon='search'
      iconPosition='left'
      placeholder={searchPlaceholder}
      onChange={event => onCriteriaChange(event.target.value)}
      action={
        <Select
          button
          basic
          floating
          options={[...FILTER_OPTIONS]}
          defaultValue={FILTER_OPTIONS[0].value}
          selected
          onChange={
            (_, dropdownProps) => onFilterChange(dropdownProps.value as Filter)
          }
        />
      }
    />
  );
})

export default connect(
  (state: RootState) => ({
    currentCriteria: selectCriteria(state),
    currentFilter: selectFilter(state),
  }),
  (dispatch: AppDispatch) => ({
    onFilterChange(newFilter: Filter) {
      dispatch(updateFilter(newFilter));
    },
    onCriteriaChange(newCriteria: string) {
      dispatch(updateCriteria(newCriteria));
    },
  }),
)(SearchBar);
