import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  Card,
  Modal,
  Space,
  Popconfirm,
} from "antd";
import { UploadOutlined, PlusCircleOutlined } from "@ant-design/icons";

import "./Profile.scss";
import useUser from "../../hooks/useUser";
import Header from "../../components/header/Header";
import CreateCharacterModal from "../../components/CreateCharacterModal/CreateCharacterModal";
import { getCharacters } from "../../service/characters";
import Loader from "../../components/loader/Loader";
import CharacterCard from "../../components/CharacterCard/CharacterCard";

const Profile = () => {
  const { user } = useUser();

  const [characters, setCharacters] = useState([]);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("Можно загружать только изображения!");
      }
      return isImage || Upload.LIST_IGNORE;
    },
    maxCount: 1,
  };

  const fetchCharacters = () => {
    setLoading(true);

    getCharacters({ name: search })
      .then((res) => {
        setCharacters(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCharacters();
  }, [search]);

  return (
    <>
      <Header authorized={true} outOfMain={true} />
      <div className="profile-page">
        <h1 className="profile-page__title">Профиль: {user?.name}</h1>
        <span className="profile-page__phone">
          Номер телефона: {user?.phone}
        </span>
        <Button
          className="profile-page__add"
          onClick={() => setCreateModalOpen(true)}
        >
          <PlusCircleOutlined width={30} height={30} />
        </Button>

        {/* Форма добавления нового персонажа */}

        {/* Список персонажей */}
        <div className="profile-page__head">
          <h2 className="profile-page__title">Все персонажи</h2>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            className="profile-page__search"
            placeholder="Поиск по персонажу..."
          />
        </div>
        {loading ? (
          <div className="loader__wrapper">
            <Loader size={50} />
          </div>
        ) : (
          <div className="profile-page__characters">
            {characters?.map((c, index) => (
              <CharacterCard
                character={c}
                characters={characters}
                setCharacters={setCharacters}
                openEditModal={(character) => {
                  setEditModalOpen(true);
                  setSelectedCharacter(character);
                }}
              />
            ))}
          </div>
        )}

        {/* Модальное окно редактирования */}
        <Modal
          title="Редактировать персонажа"
          visible={editModalVisible}
          onCancel={() => setEditModalVisible(false)}
          footer={null}
          centered
        >
          <Form form={editForm} layout="vertical" onFinish={() => {}}>
            <Form.Item
              label="Имя персонажа"
              name="name"
              rules={[{ required: true, message: "Введите имя персонажа" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Описание"
              name="bio"
              rules={[{ required: true, message: "Введите описание" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item label="Картинка" name="image">
              <Upload {...uploadProps} listType="picture">
                <Button icon={<UploadOutlined />}>Выберите файл</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Сохранить изменения
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <CreateCharacterModal
        fetchCharacters={fetchCharacters}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        characters={characters}
        setCharacters={setCharacters}
        isEdit={false}
      />

      <CreateCharacterModal
        fetchCharacters={fetchCharacters}
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        characters={characters}
        setCharacters={setCharacters}
        isEdit={true}
        character={selectedCharacter}
      />
    </>
  );
};

export default Profile;
