import { Link } from "react-router-dom";
import logo from "../img/logo-cz.svg";
import styles from "./Navbar.module.css";
import Search from "./Search";

function Navbar({ setRender, setEpisode }) {
  return (
    <div className={styles.container}>
      <div className={styles.container_navbar}>
        <span>
          <Link to="/">
            <img src={logo} alt="Logo Moje Serialy" />
          </Link>
        </span>
        <div>
          <Search setRender={setRender} setEpisode={setEpisode} />
        </div>
        <ul>
          <li></li>
          <li></li>
        </ul>
        <ul>
          <li></li>
          <li></li>
        </ul>
      </div>

      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}

export default Navbar;
