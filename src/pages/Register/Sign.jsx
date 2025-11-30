import React, { useMemo, useState } from "react";
import { Form, Input, Button, Card } from "antd";
import "./Register.scss";
import { useLocation, useNavigate } from "react-router";
import { loginUser, registerUser } from "../../service/auth";

const Sign = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState();

  const navigate = useNavigate();

  const location = useLocation();

  const isRegister = useMemo(() => {
    return location?.state?.isRegister || false;
  }, [location]);

  const register = () => {
    setLoading(true);

    const data = form.getFieldsValue();

    registerUser(data)
      .then((res) => {
        localStorage.setItem("vika_token", res.data.token);

        navigate("/");
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
        navigate("/");

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
    <div className="registration-page">
      <Card className="registration-page__card">
        <h1 className="registration-page__title">
          {isRegister ? "Регистрация" : "Вход"}
        </h1>

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

          {isRegister ? (
            <button
              className="redirect__btn"
              onClick={() =>
                navigate("/sign", { state: { isRegister: false } })
              }
            >
              войти
            </button>
          ) : (
            <button
              className="redirect__btn"
              onClick={() => navigate("/sign", { state: { isRegister: true } })}
            >
              Создать аккаунт
            </button>
          )}

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
      </Card>
    </div>
  );
};

export default Sign;
