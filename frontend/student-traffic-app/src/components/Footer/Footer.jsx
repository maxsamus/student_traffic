import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <p>Специально для TechConnect хакатона</p>
        <p>© 2mk {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}
