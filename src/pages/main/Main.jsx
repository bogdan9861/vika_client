import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Card from "../../components/ui/card/Card";
import CardContent from "../../components/ui/card/CardContent";
import Button from "../../components/ui/Button/Button";
import { ChevronLeft, ChevronRight, RefreshCcw } from "lucide-react";

import Footer from "../../components/footer/Footer";
import SignModal from "../../components/signModal/SignModal";
import useUser from "../../hooks/useUser";

import "./Main.scss";
import Header from "../../components/header/Header";
import { getCharacters } from "../../service/characters";
import { useNavigate } from "react-router";

const Main = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [authorized, setAuthorized] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [randomIndex, setRandomIndex] = useState(0);

  const navigate = useNavigate();

  const { user, loading } = useUser();

  useEffect(() => {
    console.log(characters);
  }, [characters]);

  useEffect(() => {
    getCharacters({ name: "" })
      .then((res) => {
        setRandomIndex(Math.floor(Math.random() * res.data.data.length));

        setCharacters(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const [modals, setModals] = useState({
    login: false,
    register: false,
  });

  const randomCharacter = {
    name: "Джинкс (League of Legends)",
    bio: "Авантюристка, исследователь древних цивилизаций и специалист по забытым артефактам. Путешествует по миру в поисках тайн прошлого.",
    image:
      "https://preview.redd.it/sevika-shouldve-been-a-champion-after-arcane-v0-fwnmsx50hhee1.jpg?width=628&format=pjpg&auto=webp&s=aedda3583ce15e2388bfdd414c432f117a4e5812",
  };

  const nextSlide = () => setSlideIndex((slideIndex + 1) % characters.length);
  const prevSlide = () =>
    setSlideIndex((slideIndex - 1 + characters.length) % characters.length);

  useEffect(() => {
    const token = localStorage.getItem("vika_token");

    setAuthorized(!!token);
  }, []);

  return (
    <>
      <div className="main-page">
        <Header
          modals={modals}
          setModals={setModals}
          authorized={authorized}
          outOfMain={false}
        />
        <section id="home" className="slider">
          <button
            className="slider__arrow slider__arrow--left"
            onClick={prevSlide}
          >
            <ChevronLeft />
          </button>

          <motion.div
            key={characters[slideIndex]?.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="slider__content"
          >
            <div className="slider__inner">
              <img
                className="slider__img"
                src={characters[slideIndex]?.photo_url}
              />
              <div className="slider__content">
                <h1 className="slider__title">
                  {characters[slideIndex]?.name}
                </h1>
                <p className="slider__text">
                  {characters[slideIndex]?.description}
                </p>
                <Button
                  className="button"
                  onClick={() =>
                    navigate("/character", { state: characters[slideIndex] })
                  }
                >
                  Подробнее
                </Button>
              </div>
            </div>
          </motion.div>

          <button
            className="slider__arrow slider__arrow--right"
            onClick={nextSlide}
          >
            <ChevronRight />
          </button>
        </section>

        {/* Карточки */}
        <section id="cards" className="cards">
          {characters.map((el) => {
            return (
              <Card key={el?.id} className="card">
                <img src={el?.photo_url} alt="" />
                <CardContent className="card-content">
                  <h3 className="card-title">{el?.name}</h3>
                  <p className="card-text">{el?.description}</p>
                  <Button
                    className="button"
                    onClick={() => navigate("/character", { state: el })}
                  >
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </section>

        {/* Персонаж */}
        <section id="character" className="character-block">
          <img
            src={characters[randomIndex]?.photo_url}
            className="character-block__image"
          />
          <div>
            <h2 className="character-block__name">
              {characters[randomIndex]?.name}
            </h2>
            <p className="character-block__bio">
              {characters[randomIndex]?.description}
            </p>
            <Button
              className="button"
              onClick={() =>
                setRandomIndex(Math.floor(Math.random() * characters.length))
              }
            >
              <RefreshCcw /> <span>Случайный персонаж</span>
            </Button>
          </div>
        </section>

        <Footer />
      </div>

      {!authorized && (
        <SignModal
          open={modals.register}
          onClose={() => setModals({ ...modals, register: false })}
          isRegister={true}
          setAuthorized={setAuthorized}
        />
      )}

      <SignModal
        open={modals.login}
        onClose={() => setModals({ ...modals, login: false })}
        setAuthorized={setAuthorized}
      />
    </>
  );
};

export default Main;
