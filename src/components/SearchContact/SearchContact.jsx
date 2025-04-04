import React from "react";
import PropTypes from 'prop-types';
import "./SearchContact.module.css";
import style from "./SearchContact.module.css";

export const SearchContact = ({ value, onFilterChange }) => {
    return (
        <label className={style.searchLabel}>
        <span className={style.searchText}>Find contacts by name</span>
        <input
          className={style.searchInput}
          type="text"
          value={value}
          onChange={onFilterChange}
        />
      </label>
    );
}

SearchContact.propTypes = {
    value: PropTypes.string.isRequired,
    onFilterChange: PropTypes.func.isRequired,
  };

  export default SearchContact;