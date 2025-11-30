import React from "react";
import { useLocation } from "react-router";

import "./Character.scss";
import { Card } from "antd";
import Header from "../../components/header/Header";
import useUser from "../../hooks/useUser";
import "../../components/header/Header.scss";

const Character = () => {
  const { state } = useLocation();
  const character = state;
  const { user } = useUser();

  console.log(character);

  if (!character) {
    return (
      <div className="character-page">
        <h2 className="character-page__error">Персонаж не найден</h2>
      </div>
    );
  }

  return (
    <div className="character-page">
      <Header outOfMain={true} authorized={!!user} />
      <Card className="character-page__card">
        {character?.photo_url && (
          <img
            src={character?.photo_url}
            alt={character.name}
            className="character-page__image"
          />
        )}
        <h1 className="character-page__name">{character.name}</h1>
        <p className="character-page__bio">{character.description}</p>
      </Card>
    </div>
  );
};

export default Character;
