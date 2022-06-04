import Navbar from '../components/Navbar';
import Textbox from '../components/Textbox';
import { signIn, signOut, useSession } from 'next-auth/client';
import styles from '../styles/Edit.module.css';
import { useEffect, useState } from 'react';
import 'spinkit/spinkit.css';
import Loading from '../components/Loading';
import randomstring from 'randomstring';
import apiURL from '../utils/url';

export default function Edit() {
  const [session, loading] = useSession();
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [data, setData] = useState({
    username: '',
    aboutMe: '',
    email: '',
    phone: '',
    address: '',
    color: '',
    skills: [],
    projects: [],
    url: '',
  });

  // console.log('session', session);
  useEffect(async () => {
    if (session) {
      console.log('yes session');
      const response = await fetch(`${apiURL}/api/create`, {
        method: 'POST',
        body: JSON.stringify({ email: session.user.email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const user = await response.json();
      console.log(user);
    }
  }, [session]);

  useEffect(async () => {
    if (session && data.url === '') {
      console.log('getting user data');
      const response = await fetch(`${apiURL}/api/get`, {
        method: 'POST',
        body: JSON.stringify({ email: session.user.email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // const data1 = { ...data };
      const data1 = await response.json();
      if (!data1.url) {
        data1.url = randomstring.generate({ length: 7, charset: 'numeric' });
      }
      setData(data1);
      console.log('edited data');
      setSkills(data1.skills);
      setProjects(data1.projects);
    }
  }),
    [session];

  useEffect(() => {
    console.log(skills);
  }, [skills]);
  return (
    <div className={styles.container}>
      {session && !loading ? (
        <>
          <Navbar />
          <div className={styles.textfields}>
            <div className={styles.textfieldsdiv}>
              <a
                href={`https://portfoliocreator.netlify.app/portfolio/${data.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.selected}
              >{`https://portoliocreator.netlify.app/${data.url}`}</a>
            </div>
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className={styles.textfieldsdiv}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder={`Name`}
                  id="name"
                  required
                  defaultValue={data.username}
                />
                <input
                  className={styles.input}
                  type="url"
                  placeholder={`Image URL (1:1 ratio)`}
                  required
                  id="image"
                  defaultValue={data.image}
                />
              </div>
              <div className={styles.textfieldsdiv}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder={`Profession`}
                  required
                  id="profession"
                  defaultValue={data.profession}
                />
                <input
                  className={styles.input}
                  type="text"
                  placeholder={`Color Theme (Hex Code)`}
                  required
                  id="color"
                  defaultValue={data.color}
                />
              </div>
              <div className={styles.textfieldsdiv}>
                <input
                  className={styles.input}
                  type="tel"
                  placeholder={`Mobile number`}
                  required
                  id="phone"
                  defaultValue={data.phone}
                />
                <input
                  className={styles.input}
                  type="text"
                  placeholder={`Address`}
                  required
                  id="address"
                  defaultValue={data.address}
                />
              </div>
              <div className={styles.textfieldsdiv}>
                <textarea
                  className={styles.textarea}
                  // type="text"
                  placeholder={`About me`}
                  required
                  id="aboutme"
                  defaultValue={data.aboutMe}
                />
              </div>
              <div className={styles['skills-container']}>
                {skills.map((name, i) => (
                  <div
                    key={name + i.toString()}
                    className={styles.textfieldsdiv}
                  >
                    <input
                      className={styles.input}
                      defaultValue={name}
                      type="text"
                      id={name + i.toString()}
                      disabled
                    />
                    <button
                      type="button"
                      className={styles.button}
                      onClick={() =>
                        setSkills([
                          ...skills.filter((skill) => {
                            // console.log(name, skill);
                            return skill !== name;
                            // ...skills.splice(i-1. i+1)
                          }),
                        ])
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className={styles.textfieldsdiv}>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder={`Skill`}
                    id="addSkill"
                  />
                  <button
                    className={styles.button}
                    type="button"
                    onClick={() => {
                      if (!document.querySelector('#addSkill').value) return;
                      setSkills([
                        ...skills,
                        document.querySelector('#addSkill').value,
                      ]);
                      document.querySelector('#addSkill').value = '';
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className={styles['projects-container']}>
                {projects.map((name, i) => (
                  <div
                    key={name + i.toString()}
                    className={styles.textfieldsdiv}
                  >
                    <input
                      className={styles.input}
                      defaultValue={name}
                      type="text"
                      id={name + i.toString()}
                      disabled
                    />
                    <button
                      type="button"
                      className={styles.button}
                      onClick={() =>
                        setProjects([
                          ...projects.filter((project) => {
                            // console.log(name, project);
                            return project !== name;
                            // ...projects.splice(i-1. i+1)
                          }),
                        ])
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className={styles.textfieldsdiv}>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder={`Project`}
                    id="addProject"
                  />
                  <button
                    className={styles.button}
                    type="button"
                    onClick={() => {
                      if (!document.querySelector('#addProject').value) return;
                      setProjects([
                        ...projects,
                        document.querySelector('#addProject').value,
                      ]);
                      document.querySelector('#addProject').value = '';
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className={styles.textfieldsdiv}>
                <button
                  type="submit"
                  onClick={() => {
                    const username = document.getElementById('name').value;
                    const email = session.user.email;
                    const image = document.getElementById('image').value;
                    const profession =
                      document.getElementById('profession').value;
                    const phone = document.getElementById('phone').value;
                    const color = document.getElementById('color').value;
                    const address = document.getElementById('address').value;
                    const aboutMe = document.getElementById('aboutme').value;
                    // const url = String(
                    //   randomstring.generate({ length: 7, charset: 'numeric' })
                    // );
                    console.log(aboutMe);
                    setData({
                      ...data,
                      username,
                      email,
                      image,
                      profession,
                      phone,
                      color,
                      address,
                      aboutMe,
                      skills,
                      projects,
                      url: data.url,
                    });

                    async function updateUser() {
                      console.log(data.aboutMe);
                      await fetch(`${apiURL}/api/update`, {
                        method: 'POST',
                        body: JSON.stringify({
                          username,
                          email,
                          image,
                          profession,
                          phone,
                          color,
                          address,
                          aboutMe,
                          skills,
                          projects,
                          url: data.url,
                        }),
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      });
                    }
                    updateUser();
                  }}
                  className={styles.button}
                >
                  Save
                </button>
                <button
                  className={styles.button}
                  onClick={() => {
                    signOut({
                      callbackUrl: 'https://portfoliocreator.vercel.app',
                    });
                  }}
                >
                  Sign Out
                </button>
              </div>
            </form>
          </div>
        </>
      ) : loading ? (
        <Loading />
      ) : (
        <div>Access Denied, Please Sign In first https://portfoliocreator.vercel.app</div>
      )}
    </div>
  );
}
