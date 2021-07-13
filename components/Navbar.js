import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  return (
    <div className={styles.nav}>
      <ul className={styles.navlinks} id="nav-links">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">Your Portfolio</a>
        </li>
      </ul>
    </div>
  );
}
