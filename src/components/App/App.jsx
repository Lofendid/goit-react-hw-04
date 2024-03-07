import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import toast from 'react-hot-toast';

import fetchGallery from '../../api/gallery-api';

import SearchBar from '../SearchBar/SearchBar';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import Loader from '../Loader/Loader';
import ImageModal from '../ImageModal/ImageModal';

function App() {
  const [query, setQuery] = useState('');
  const [picData, setPicData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  Modal.setAppElement('#root');

  function onSubmit(userQuery) {
    setPage(1);
    setPicData([]);
    setQuery(userQuery);
  }

  function notify(errMsg) {
    return toast(errMsg);
  }

  useEffect(() => {
    if (!query) return;

    async function fetchData() {
      try {
        setLoadMore(false);
        setLoading(true);

        const data = await fetchGallery(query, page);

        setPicData(prevData => [...prevData, ...data.results]);

        if (data.total_pages === page) {
          throw new Error('The end of collection had been reached');
        }

        setLoadMore(true);
      } catch (err) {
        notify(err.message);
        setLoadMore(false);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [query, page]);

  return (
    <div>
      <ErrorMessage />

      {modalData && (
        <ImageModal modal={modal} setModal={setModal} modalData={modalData} />
      )}

      <SearchBar onSubmit={onSubmit} notify={notify} />

      {picData.lenght !== 0 && (
        <ImageGallery
          picData={picData}
          setModal={setModal}
          setModalData={setModalData}
        />
      )}

      {loading && <Loader />}

      {loadMore && <LoadMoreBtn setPage={setPage} />}
    </div>
  );
}

export default App;
