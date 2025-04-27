import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../api/api";
import styles from "../SignForm.module.css";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Обязательное поле")
    .max(100, "Email должно быть не более 100 символов")
    .email("Неверный email"),
  password: Yup.string()
    .min(8, "Пароль должен быть не менее 4 символов")
    .max(100, "Пароль должен быть не более 100 символов")
    .required("Обязательное поле"),
});

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    loginUser(values)
      .then((data) => {
        // Сохраняем JWT токен
        localStorage.setItem("token", data.accessToken);
        navigate("/");
      })
      .catch((error) => {
        console.error("Ошибка при входе:", error);
        setErrors({ general: error.message });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, errors }) => (
          <Form className={styles.form}>
            <div className={styles.fieldContainer}>
              <label htmlFor="email" className={styles.label}>
                Email:
              </label>
              <Field type="text" name="email" className={styles.field} />
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
              <Field type="password" name="password" className={styles.field} />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.error}
              />
            </div>

            {errors.general && (
              <div className={styles.generalError}>{errors.general}</div>
            )}

            <button type="submit" className={styles.button} disabled={!isValid}>
              Войти
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
