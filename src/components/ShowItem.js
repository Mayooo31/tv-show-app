import styles from "./ShowItem.module.css";
import storeContext from "../store/store-context";
import { Fragment, useContext, useEffect, useState } from "react";

import Navbar from "./Navbar";

const API_BY_ID = `https://api.themoviedb.org/3/tv/`;

const ShowItem = () => {
  const ctx = useContext(storeContext);

  const [render, setRender] = useState("");
  const [tvshow, setTvshow] = useState([]);
  const [clickedSeason, setClickedSeason] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [episode, setEpisode] = useState("");

  // &append_to_response=keywords,alternative_titles,changes,credits,images,keywords,lists,releases,reviews,similar,translations,videos

  const dataByID = async () => {
    const res = await fetch(`${API_BY_ID}${ctx.ID}?api_key=${ctx.API_KEY}`);
    const data = await res.json();

    setTvshow(data);
  };

  useEffect(() => {
    dataByID();
  }, [render]);

  const seasonByID = async item => {
    const res = await fetch(
      `${API_BY_ID}${ctx.ID}/season/${item}?api_key=${ctx.API_KEY}`
    );
    const data = await res.json();

    // console.log(data);
    setClickedSeason(data);
  };

  const arrayOfSeasons = [];

  useEffect(() => {
    for (let i = 1; i <= tvshow.number_of_seasons; i++) {
      arrayOfSeasons.push(i);
    }
    setSeasons(arrayOfSeasons);
  }, [tvshow]);

  // console.log(tvshow);

  if (!tvshow.first_air_date) {
    return (
      <Fragment>
        <Navbar />
        <h1 className={styles.container}>ERROR</h1>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Navbar setRender={setRender} setEpisode={setEpisode} />
      <div className={styles.container}>
        <section className={styles.info}>
          <img
            className={styles.poster}
            src={
              tvshow.poster_path
                ? `${ctx.API_PHOTO}${tvshow.poster_path}`
                : ctx.IMAGE_SECOND
            }
          />
          <div className={styles.right}>
            <div className={styles.name_rating}>
              <div>
                <h1 className={styles.name}>{tvshow.name}</h1>
                <p className={styles.dots}>.....</p>
              </div>
              <div className={styles.rating_name}>
                <p className={styles.rating}>
                  {tvshow.vote_average === 10
                    ? tvshow.vote_average
                    : tvshow.vote_average === 0
                    ? "--"
                    : tvshow.vote_average.toFixed(1)}{" "}
                </p>
                <p className={styles.imdb}>IMDB</p>
              </div>
            </div>
            <div className={styles.year_genre}>
              <p className={styles.year}>
                {`${tvshow.first_air_date?.slice(
                  0,
                  4
                )} - ${tvshow.last_air_date?.slice(0, 4)}`}
              </p>
              <span className={styles.genres}>
                {tvshow.genres?.map((item, i) => (
                  <p key={item.id}>
                    {item.name}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {tvshow.genres.length - 1 === i ? "" : "|"}
                  </p>
                ))}
              </span>
              <span className={styles.networks}>
                {tvshow.networks?.map(item => (
                  <p key={item.id} className={styles.badge}>
                    {item.name}
                  </p>
                ))}
              </span>
            </div>
            <div className={styles.overview}>{tvshow.overview}</div>
            <div className={styles.watch_favourite}>
              <div className={styles.buttons}>
                <button className={styles.watch_button}>Začít sledovat</button>
                <button className={styles.favourite_button}>
                  Přidat do oblíbených
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.tv_series}>
          {seasons.map(item => (
            <div
              className={styles.season}
              onClick={() => {
                let numEp = seasons.find((_, i) => i + 1 === item);
                setEpisode(numEp);
                seasonByID(numEp);
              }}
              key={item}
            >
              <div className={styles.season_header}>
                <h2>{item}. Série</h2>
                <p>V</p>
              </div>
              {episode === item && (
                <div className={styles.container_episodes}>
                  {clickedSeason.episodes?.map((item, i) => (
                    <div key={item.id}>
                      <div className={styles.episodes}>
                        <span className={styles.number_name}>
                          <p className={styles.numb}>{i + 1}</p>
                          <p>{item.name}</p>
                        </span>
                        <p>CC</p>
                      </div>
                      <span className={styles.border}></span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      </div>
    </Fragment>
  );
};

export default ShowItem;
