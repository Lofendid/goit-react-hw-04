import css from './SearchBar.module.css';
import { HiMagnifyingGlass } from 'react-icons/hi2';

export default function SearchBar({ onSubmit, notify }) {
  function handleSubmit(e) {
    e.preventDefault();

    const userQuery = e.target.elements.userQuery.value.toLowerCase().trim();

    if (!userQuery) {
      notify('No query! Please enter your query.');
      return;
    }

    onSubmit(userQuery);

    e.target.reset();
  }

  return (
    <>
      <header>
        <form className={css.form} onSubmit={handleSubmit}>
          <input
            className={css.queryInput}
            name="userQuery"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button className={css.searchBtn} type="submit">
            <HiMagnifyingGlass className={css.icon} />
          </button>
        </form>
      </header>
    </>
  );
}
