import React from "react";
import LoginForm from "./LoginForm";
import Header from "../../components/Header";
import styles from "../AuthPage.module.css";
import Footer from "../../components/Footer/Footer";

const LoginPage = () => {
  return (
    <>
      <Header />
      <div className="page-layout">
        <div className={styles.auth_container}>
          <h1>Войти</h1>
          <LoginForm />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
