import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../api/api";
import styles from "../SignForm.module.css";
import { useNavigate } from "react-router-dom";

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Обязательное поле")
    .max(100, "Имя должно быть не более 100 символов"),
  surname: Yup.string()
    .required("Обязательное поле")
    .max(100, "Фамилия должно быть не более 100 символов"),
  email: Yup.string()
    .email("Неверный email")
    .required("Обязательное поле")
    .max(300, "Почта не должна быть больше 300 символов"),
  password: Yup.string()
    .min(8, "Пароль должен быть не менее 8 символа")
    .max(100, "Пароль должен быть не более 100 символов")
    .required("Обязательное поле"),
});

const RegisterForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const data = await registerUser(values);
      // Сохраняем JWT токен, если его возвращает сервер после регистрации
      localStorage.setItem("token", data.accessToken);
      navigate("/institutions");
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      setErrors({ general: error.message });
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={{
          firstName: "",
          username: "",
          birthDate: "",
          email: "",
          password: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form className={styles.form}>
            <div className={styles.fieldContainer}>
              <label htmlFor="firstName" className={styles.label}>
                Имя:
              </label>
              <Field
                type="text"
                name="firstName"
                className={styles.field}
                placeholder="Иван"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.fieldContainer}>
              <label htmlFor="surname" className={styles.label}>
                Фамилия:
              </label>
              <Field
                type="text"
                name="surname"
                className={styles.field}
                placeholder="Иванов"
              />
              <ErrorMessage
                name="surname"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.fieldContainer}>
              <label htmlFor="email" className={styles.label}>
                Email:
              </label>
              <Field
                type="email"
                name="email"
                className={styles.field}
                placeholder="ivan_ivanov@mail.ru"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.fieldContainer}>
              <label htmlFor="password" className={styles.label}>
                Пароль:
              </label>
              <Field
                type="password"
                name="password"
                className={styles.field}
                placeholder="Пароль от 8 символов"
              />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.error}
              />
            </div>

            {errors.general && (
              <div className={styles.generalError}>{errors.general}</div>
            )}

            <button
              type="submit"
              className={styles.button}
              disabled={isSubmitting}
            >
              Зарегистрироваться
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
