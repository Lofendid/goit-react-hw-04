import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import toast, { Toaster } from 'react-hot-toast';

import fetchGallery from '../../api/gallery-api';

import SearchBar from '../SearchBar/SearchBar';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import Loader from '../Loader/Loader';
import ImageModal from '../ImageModal/ImageModal';

function App() {
  const [query, setQuery] = useState('cactus');
  const [picData, setPicData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState('');

  Modal.setAppElement('#root');

  function onSubmit(userQuery) {
    setPage(1);
    setPicData([]);
    setQuery(userQuery);
  }

  function increasePage() {
    setPage(prevPage => prevPage + 1);
  }

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return;
    }

    async function fetchData() {
      try {
        setError('');
        setLoadMore(false);
        setLoading(true);

        const data = await fetchGallery(query, page);

        setPicData(prevData => [...prevData, ...data.results]);

        if (data.total_pages === page) {
          notify('The end of collection had been reached');
          setLoadMore(false);
          return;
        }

        setLoadMore(true);
      } catch (err) {
        setError(err.message);
        setLoadMore(false);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [query, page, mounted]);

  function notify(errMsg) {
    return toast(errMsg);
  }

  return (
    <div>
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: 'red',
            color: 'white',
          },
        }}
      />

      {modalData && (
        <ImageModal modal={modal} setModal={setModal} modalData={modalData} />
      )}

      <SearchBar onSubmit={onSubmit} notify={notify} />

      {error ? (
        <ErrorMessage msg={error} />
      ) : (
        <ImageGallery
          picData={picData}
          setModal={setModal}
          setModalData={setModalData}
        />
      )}

      {loading && <Loader />}

      {loadMore && <LoadMoreBtn onClick={increasePage} />}
    </div>
  );
}

export default App;
