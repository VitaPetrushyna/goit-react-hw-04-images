import styles from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ btnLoadMore }) => {
  return (
    <button className={styles.button} onClick={btnLoadMore}>
      Load more
    </button>
  );
};

Button.propTypes = {
  btnLoadMore: PropTypes.func.isRequired,
};

export default Button;
