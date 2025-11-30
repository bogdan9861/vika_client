import { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { X } from "lucide-react";
import axios from "axios";

import "./SignModal.scss";
import { loginUser, registerUser } from "../../service/auth";

export default function SignModal({
  open,
  onClose,
  isRegister,
  setAuthorized,
}) {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const register = () => {
    setLoading(true);

    const data = form.getFieldsValue();

    registerUser(data)
      .then((res) => {
        localStorage.setItem("vika_token", res.data.token);

        setAuthorized(true);
        onClose();
        form.resetFields();
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const login = () => {
    setLoading(true);

    const data = form.getFieldsValue();

    loginUser(data)
      .then((res) => {
        localStorage.setItem("vika_token", res.data.token);

        setAuthorized(true);
        onClose();

        form.resetFields();
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
      title={isRegister ? "Регистрация" : "Войдите в аккаунт"}
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      closeIcon={<X size={20} color="#fff" />}
    >
      <Form form={form} layout="vertical">
        {isRegister && (
          <Form.Item
            label="Имя пользователя"
            name="name"
            rules={[{ required: true, message: "Введите имя пользователя" }]}
          >
            <Input placeholder="Ваш логин" />
          </Form.Item>
        )}

        <Form.Item
          label="Номер телефона"
          name="phone"
          rules={[
            { required: true, message: "Введите номер телефона" },
            {
              pattern:
                /^(\+7|8)?[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/,
              message: "Введите корректный номер телефона",
            },
          ]}
        >
          <Input placeholder="+7(999) 999-99-99" />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Введите пароль" }]}
        >
          <Input.Password placeholder="••••••••" />
        </Form.Item>

        <Form.Item>
          {isRegister ? (
            <Button type="primary" block loading={loading} onClick={register}>
              Зарегистрироваться
            </Button>
          ) : (
            <Button type="primary" block loading={loading} onClick={login}>
              Войти
            </Button>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
}
