import styles from '../styles/Textbox.module.css';

export default function Textbox({ text, style, icon }) {
  return (
    <form className={styles.form} onSubmit={() => {}}>
      <input
        className={styles.input}
        type="text"
        name="answer"
        placeholder={`${text}`}
      />
    </form>
  );
}
