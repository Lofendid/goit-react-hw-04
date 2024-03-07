import css from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ setPage }) {
  function handleClick() {
    setPage(prevPage => prevPage + 1);
  }

  return (
    <button className={css.loadBtn} onClick={handleClick}>
      Load more
    </button>
  );
}
