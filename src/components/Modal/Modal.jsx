import { useEffect } from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

export default function Modal({ url, alt = 'Large image', onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = event => {
    if (event.code === 'Escape' || event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleKeyDown}>
      <div className={styles.modal}>
        <img src={url} alt={alt} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
