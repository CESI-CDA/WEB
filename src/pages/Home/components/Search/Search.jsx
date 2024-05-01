import style from "./Search.module.scss";
function Search({ setFilter }) {
  function handleInput(e) {
    const titleFilter = e.target.value;
    setFilter(titleFilter.trim().toLowerCase());
  }
  return (
    <div
      className={`d-flex flex-row justify-content-center align-items-center my-30 ${style.searchBar}`}
    >
      <i className="fa-solid fa-magnifying-glass mr-15"></i>
      <input
        className="flex-fill"
        type="text"
        placeholder="Rechercher"
        onInput={handleInput}
      />
    </div>
  );
}

export default Search;
