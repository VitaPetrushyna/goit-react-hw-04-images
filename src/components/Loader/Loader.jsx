import { Hearts } from 'react-loader-spinner';
import styles from './Loader.module.css';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Loader = () => {
  return (
    <Hearts
      height="80"
      width="80"
      color="pink"
      ariaLabel="hearts-loading"
      wrapperStyle={{}}
      wrapperClass={styles.loader}
      visible={true}
    />
  );
};

export default Loader;
