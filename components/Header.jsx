import { NavLink } from "react-router-dom";
const Header = ({ setFilteredData }) => {
  const handleSearch = (value) => {
    setFilteredData(value);
  };
  return (
    <>
      <header className="bg-light text-dark">
        <div className="container d-flex justify-content-between align-items-center py-4">
          <div className="display-5">
            <NavLink
              className="navbar-brand text-danger m-0"
              style={{ fontFamily: "Monoton, cursive" }}
              to="/"
            >
              Meetup
            </NavLink>
          </div>
          <div>
            <form className="d-flex align-items-center" role="search">
              <input
                className="form-control me-2 w-100"
                type="search"
                placeholder="🔍 Search by title and event type"
                aria-label="Search"
                onChange={(event) => handleSearch(event.target.value)}
              />
            </form>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
