import styles from './Searchbar.module.css';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  return (
    <header className={styles.searchBar}>
      <form className={styles.searchForm} onSubmit={onSubmit}>
        <button type="submit" className={styles.searchFormButton}>
          <SearchIcon className={styles.searchIcon} />
        </button>

        <input
          className={styles.searchFormInput}
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
