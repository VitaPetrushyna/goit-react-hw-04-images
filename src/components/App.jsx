import { Component } from 'react';
import styles from './App.styles.css';
import toast, { Toaster } from 'react-hot-toast';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { getImages } from '../ApiRequest/ApiRequest';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    page: 1,
    query: '',
    images: [],
    loading: false,
    error: null,
    showModal: false,
    totalHits: 0,
    modalImgProps: { url: '', alt: '' },
    status: Status.IDLE,
  };

  async componentDidUpdate(_, prevState) {
    const { page, query } = this.state;

    if (query.trim() === '') {
      toast('What to show you?', {
        icon: '👏',
      });
      return;
    }

    if (prevState.page !== page || prevState.query !== query) {
      this.setState({ loading: true });

      try {
        const fetchImages = await getImages(query, page);

        this.setState(prevState => ({
          images: [...prevState.images, ...fetchImages.hits],
          totalHits: fetchImages.totalHits,
        }));

        if (fetchImages.hits.length === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }

        // if (page * 12 > this.state.totalHits) {
        //   toast.warn('Sorry, this is the last page...');
        // }
      } catch (error) {
        toast.error('Something went wrong :(');
        // this.setState({
        //   error: 'Something went wrong :(',
        // });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleSubmit = event => {
    event.preventDefault();

    if (event.target.elements.query.value !== this.state.query) {
      this.setState({
        page: 1,
        query: event.target.elements.query.value,
        images: [],
      });
    } else {
      toast('What to show you?', {
        icon: '👏',
      });
    }

    // event.target.reset();
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleImgClick = ({ largeImageURL: url, tags: alt }) => {
    this.setState({ modalImgProps: { url, alt } });
    this.toggleModal();
  };

  render() {
    const {
      loading,
      error,
      images,
      showModal,

      modalImgProps: { url, alt },
    } = this.state;

    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.handleSubmit} />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {loading && <Loader />}
        {showModal && <Modal url={url} alt={alt} onClose={this.toggleModal} />}
        <ImageGallery images={images} openModal={this.handleImgClick} />
        {images.length !== 0 && <Button btnLoadMore={this.loadMore} />}
        <Toaster position="top-left" />
      </div>
    );
  }
}
