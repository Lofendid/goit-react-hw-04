import css from './ImageGallery.module.css';

import ImageCard from '../ImageCard/ImageCard';

export default function ImageGallery({ picData, setModal, setModalData }) {
  function handleClick(pic) {
    setModalData(pic);
    setModal(true);
  }

  return (
    <ul className={css.list}>
      {picData.map(pic => {
        return (
          <li key={pic.id} onClick={() => handleClick(pic)}>
            <ImageCard image={pic} />
          </li>
        );
      })}
    </ul>
  );
}
