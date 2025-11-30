import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Upload } from "antd";
import { UploadIcon } from "lucide-react";
import { createCharacter, editCharacter } from "../../service/characters";

const CreateCharacterModal = ({
  open,
  onClose,
  characters,
  setCharacters,
  isEdit,
  fetchCharacters,
  character,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!character) return;

    form.setFieldValue("name", character?.name);
    form.setFieldValue("description", character?.description);
  }, [character]);

  useEffect(() => {
    if (!isEdit) {
      form.resetFields();
    }
  }, [open]);

  const handleAdd = () => {
    setLoading(true);

    const { name, description, image } = form.getFieldValue();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image.file.originFileObj);

    createCharacter(formData)
      .then((res) => {
        console.log(res);

        setCharacters([...characters, res.data.data]);
        onClose();
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEdit = () => {
    const { name, description, image } = form.getFieldValue();
    const formData = new FormData();

    formData.append("id", character?.id);

    if (name) {
      formData.append("name", name);
    }

    if (description) {
      formData.append("description", description);
    }

    if (image) {
      formData.append("image", image.file.originFileObj);
    }

    editCharacter(formData)
      .then((res) => {
        fetchCharacters();

        onClose();
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      title={isEdit ? "Изменение" : "Создание"}
      open={open}
      onCancel={onClose}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleAdd}
        className="profile-page__form"
      >
        <Form.Item
          label="Имя персонажа"
          name="name"
          rules={[{ required: true, message: "Введите имя персонажа" }]}
        >
          <Input placeholder="Лара Вентурис" />
        </Form.Item>

        <Form.Item
          label="Описание"
          name="description"
          rules={[{ required: true, message: "Введите описание" }]}
        >
          <Input.TextArea rows={4} placeholder="Описание персонажа..." />
        </Form.Item>

        {character?.photo_url && (
          <img width={200} height={200} src={character?.photo_url} />
        )}

        <Form.Item
          label="Картинка"
          name="image"
          rules={[{ required: true, message: "Выберите изображение" }]}
        >
          <Upload listType="picture">
            <Button icon={<UploadIcon />}>Выберите файл</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          {isEdit ? (
            <Button
              type="primary"
              onClick={handleEdit}
              loading={loading}
              disabled={loading}
            >
              Сохранить изменения
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={handleAdd}
              loading={loading}
              disabled={loading}
            >
              Добавить персонажа
            </Button>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateCharacterModal;
