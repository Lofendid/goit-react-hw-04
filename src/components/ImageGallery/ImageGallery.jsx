import css from './ImageGallery.module.css';

import ImageCard from '../ImageCard/ImageCard';

export default function ImageGallery({ picData, openModal }) {
  return (
    <ul className={css.list}>
      {picData.map(pic => {
        return (
          <li key={pic.id} onClick={() => openModal(pic)}>
            <ImageCard image={pic} />
          </li>
        );
      })}
    </ul>
  );
}
