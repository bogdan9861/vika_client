import { Button, Card, Popconfirm, Space } from "antd";
import { EditOutlined, DeleteOutlined, DeleteFilled } from "@ant-design/icons";
import { useState } from "react";
import { removeCharacter } from "../../service/characters";

import "./CharacterCard.scss";
import { useNavigate } from "react-router";

const CharacterCard = ({
  character,
  characters,
  setCharacters,
  openEditModal,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const navigate = useNavigate();

  const handleRemoveCharacter = () => {
    const newList = characters.filter((c) => c.id !== character.id);
    setCharacters(newList);
    setConfirmOpen(false);

    removeCharacter({ characterId: character?.id }).catch((e) => {
      console.log(e);
    });
  };

  return (
    <>
      <Card key={character?.id} className="card">
        {character.photo_url ? (
          <img
            onClick={() => navigate("/character", { state: character })}
            src={character.photo_url}
            alt={character.name}
            className="image"
          />
        ) : (
          <img
            onClick={() => navigate("/character", { state: character })}
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDvtwl66VIcCrjK0lc7G-rknlHs5TXgjXrQA&s"
            }
            alt={character.name}
            className="image"
          />
        )}
        <h3 className="name">{character.name}</h3>
        <p className="bio">{character.description}</p>
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => openEditModal(character)}
          >
            Изменить
          </Button>
          <Popconfirm
            open={confirmOpen}
            title="Удалить персонажа?"
            onConfirm={handleRemoveCharacter}
            onCancel={() => setConfirmOpen(false)}
            okText="Да"
            cancelText="Нет"
            icon={<DeleteFilled color="#ff0000ff" />}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => setConfirmOpen(true)}
          >
            Удалить
          </Button>
        </Space>
      </Card>
    </>
  );
};

export default CharacterCard;
