import styles from '../../styles/Portfolio.module.css';
import { MdPhone, MdMail, MdLocationOn } from 'react-icons/md';
import { useRouter } from 'next/router';
import Card from '../../components/Card';
import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Portfolio({
  children,
  as,
  settings = {},
  title = 'default text',
}) {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState({
    username: 'Loading...',
    aboutMe: 'Loading...',
    email: 'Loading...',
    phone: 'Loading...',
    address: 'Loading...',
    color: '#181818',
    skills: ['Loading...'],
    projects: ['Loading...'],
  });

  // console.log(id);
  useEffect(async () => {
    if (router.isReady) {
      const { id } = router.query;
      console.log(`loading ${id}`);
      if (id) {
        const response = await fetch(`http://localhost:5000/api/getURL`, {
          method: 'POST',
          body: JSON.stringify({ url: id }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const user = await response.json();
        console.log(user);
        setPortfolio(user);
        document.title = `Portfolio`;
      }
    }
  }, [router.isReady]);
  return portfolio ? (
    <div
      className={styles.container}
      style={{
        backgroundColor: portfolio.color,
      }}
    >
      <Head>
        <title>{portfolio.username}</title>
      </Head>
      <div className={styles.box}>
        <div className={styles.info}>
          <img
            className={styles.img}
            src={portfolio.image}
            width="512"
            height="512"
            alt="profile picture"
          />
          <div className={styles.textdetails}>
            <div className={styles.hello}>Hello everyone, I am</div>
            <div className={styles.name}>{portfolio.username}</div>
            <div className={styles.profession}>{portfolio.profession}</div>
            <div className={styles.aboutme}>{portfolio.aboutMe}</div>
            <div className={styles.contactinfo}>
              <div className={styles.contact}>
                <MdPhone className={styles.icon} />
                <span>{portfolio.phone}</span>
              </div>
              <div className={styles.contact}>
                <MdMail className={styles.icon} />
                <span>{portfolio.email}</span>
              </div>
              <div className={styles.contact}>
                <MdLocationOn className={styles.icon} />
                <span>{portfolio.address}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.skillsandprojects}>
          <h1 className={styles.heading}>Skills</h1>
          <div className={styles.grid}>
            {portfolio.skills.map((skill, index) => (
              <Card key={index} text={skill} />
            ))}
          </div>
        </div>
        <div className={styles.skillsandprojects}>
          <h1 className={styles.heading}>Projects</h1>
          <div className={styles.grid}>
            {portfolio.projects.map((project, index) => (
              <Card key={index} text={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <div className={styles.notfound}>Error: Portfolio Not Found</div>
    </div>
  );
}
