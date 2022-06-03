import styles from '../styles/Card.module.css'

export default function Card({ text }) {
  return (
    <div className={styles.card}>
      <h1 className={styles.text}>{text}</h1>
    </div>
  );
}
