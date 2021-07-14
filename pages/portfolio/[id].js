/* eslint-disable @next/next/no-img-element */
import styles from '../../styles/Portfolio.module.css';
import { MdPhone, MdMail, MdLocationOn } from 'react-icons/md';
import Card from '../../components/Card';

export default function Portfolio() {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.info}>
          <img
            className={styles.img}
            src="https://unsplash.it/512/512/?random"
            width="512"
            height="512"
            alt="profile picture"
          />
          <div className={styles.textdetails}>
            <div className={styles.hello}>Hello everyone, I am</div>
            <div className={styles.name}>John Doe</div>
            <div className={styles.profession}>UI/UX Designer</div>
            <div className={styles.aboutme}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip
            </div>
            <div className={styles.contactinfo}>
              <div className={styles.contact}>
                <MdPhone className={styles.icon} />
                <span>+1 13489349593</span>
              </div>
              <div className={styles.contact}>
                <MdMail className={styles.icon} />
                <span>johndoe@gmail.com</span>
              </div>
              <div className={styles.contact}>
                <MdLocationOn className={styles.icon} />
                <span>New York, USA</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.skillsandprojects}>
          <h1 className={styles.heading}>Skills</h1>
          <div className={styles.grid}>
            <Card text='NextJS'/>
            <Card text='NextJS'/>
            <Card text='NextJS'/>
            <Card text='NextJS'/>
            <Card text='NextJS'/>
            <Card text='NextJS'/>
          </div>
        </div>
        <div className={styles.skillsandprojects}>
          <h1 className={styles.heading}>Projects</h1>
          <div className={styles.grid}>
            <Card text='NextJS'/>
            <Card text='NextJS'/>
            <Card text='NextJS'/>
            <Card text='NextJS'/>
            <Card text='NextJS'/>
            <Card text='NextJS'/>
          </div>
        </div>
      </div>
    </div>
  );
}
