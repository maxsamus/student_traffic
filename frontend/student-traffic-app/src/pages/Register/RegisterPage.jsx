import React from "react";
import RegisterForm from "./RegisterForm";
import Header from "../../components/Header";
import styles from "../AuthPage.module.css";
import Footer from "../../components/Footer/Footer";

const RegisterPage = () => {
  return (
    <>
      <Header />
      <div className="page-layout">
        <div className={styles.auth_container}>
          <h1>Регистрация</h1>
          <RegisterForm />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
