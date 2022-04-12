import storeContext from "../store/store-context";
import "./Search.css";

import styles from "./Search.module.css";
import React, { useEffect, useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";

const API_SEARCH = "https://api.themoviedb.org/3/search/tv?api_key=";

const Search = ({ setRender, setEpisode }) => {
  const ctx = useContext(storeContext);
  const [state, setState] = useState("");
  const [tvData, setTvData] = useState([]);
  const [isTv, setIsTv] = useState(false);
  const inputRef = useRef("");

  const changedInput = () => {
    setState(inputRef.current.value);
  };

  const dataApi = async () => {
    const inputClicked = inputRef.current.value;
    if (inputRef.current.selectionEnd < 3) return setIsTv(false);
    const res = await fetch(
      `${API_SEARCH}${ctx.API_KEY}&query=${inputClicked}`
    );
    const data = await res.json();
    setTvData(data.results);

    // console.log(data.results);

    if (data.results.length > 0) {
      setIsTv(true);
    }
  };

  useEffect(() => {
    const timerApi = setTimeout(() => {
      dataApi();
    });

    return () => {
      clearTimeout(timerApi);
    };
  }, [state]);

  const ratingColor = rating => {
    if (rating >= 8) {
      return "greenCl";
    }
    if (rating >= 6) {
      return "orangeCl";
    }
    if (rating < 6) {
      return "redCl";
    }
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.search_input}
        onChange={changedInput}
        ref={inputRef}
        placeholder="Hledat seriály"
        type="text"
      />
      {isTv && (
        <div className={styles.search_result}>
          <div className={styles.search_result_content}>
            {tvData.map(item => (
              <Link
                key={item.id}
                to={`/serial/${item.name
                  .split(" ")
                  .join("-")
                  .toLowerCase()
                  .replace(/:|!/g, "")}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  onClick={() => {
                    if (setRender) setRender(item.id);
                    if (setEpisode) setEpisode("");
                    ctx.ID = item.id;
                    setIsTv(false);
                    inputRef.current.value = "";
                  }}
                  key={item.id}
                  className={styles.item_result}
                >
                  <div className={styles.left_part}>
                    <span>
                      <img
                        className={styles.poster}
                        src={
                          item.poster_path
                            ? `${ctx.API_PHOTO}${item.poster_path}`
                            : ctx.IMAGE_SECOND
                        }
                      />
                    </span>
                    <span className={styles.name_year}>
                      <span className={styles.tv_name}>{item.name}</span>
                      <span className={styles.tv_year}>
                        {item.first_air_date}
                      </span>
                    </span>
                  </div>
                  <span
                    className={`${styles.tv_rating} ${ratingColor(
                      item.vote_average
                    )}`}
                  >
                    {item.vote_average === 10
                      ? item.vote_average
                      : item.vote_average === 0
                      ? "--"
                      : item.vote_average.toFixed(1)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
