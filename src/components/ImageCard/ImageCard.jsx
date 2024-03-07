import css from './ImageCard.module.css';

export default function ImageCard({ image: { urls, alt_description } }) {
  return (
    <div className={css.container}>
      <img
        className={css.pic}
        width="500"
        height="500"
        src={urls.small}
        alt={alt_description}
      />
    </div>
  );
}
