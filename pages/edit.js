import Navbar from '../components/Navbar';
import Textbox from '../components/Textbox';
import { signIn, signOut, useSession } from 'next-auth/client';
import styles from '../styles/Edit.module.css';
import { useEffect, useState } from 'react';
import 'spinkit/spinkit.css';
import Loading from '../components/Loading';
import randomstring from 'randomstring';

export default function Edit() {
  const [session, loading] = useSession();
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async () => {
      if (session) {
        console.log('yes session')
        const response = await fetch(`/api/create`, {
          method: 'POST',
          body: JSON.stringify(session.user.email),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const user = await response.json();
        console.log(user);
      }
    };
  }, [session]);

  /*useEffect(() => {
    async function getData(mail) {
      const response = await fetch(`/api/get`, {
        method: 'POST',
        body: JSON.stringify({ email: mail }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
    }
    const email = session.user.email;
    getData(email);
  });*/

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
              <div className={styles.selected}>portoliocreator.netlify.app</div>
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
                />
                <input
                  className={styles.input}
                  type="url"
                  placeholder={`Image URL (512x512)`}
                  required
                  id="image"
                />
              </div>
              <div className={styles.textfieldsdiv}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder={`Profession`}
                  required
                  id="profession"
                />
                <input
                  className={styles.input}
                  type="text"
                  placeholder={`Color Theme (Hex Code)`}
                  required
                  id="color"
                />
              </div>
              <div className={styles.textfieldsdiv}>
                <input
                  className={styles.input}
                  type="tel"
                  placeholder={`Mobile number`}
                  required
                  id="phone"
                />
                <input
                  className={styles.input}
                  type="text"
                  placeholder={`Address`}
                  required
                  id="address"
                />
              </div>
              <div className={styles.textfieldsdiv}>
                <textarea
                  className={styles.textarea}
                  // type="text"
                  placeholder={`About me`}
                  required
                  id="aboutme"
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
                  onClick={async () => {
                    const email = session.user.email;
                    const image = document.getElementById('image').value;
                    const profession =
                      document.getElementById('profession').value;
                    const phone = document.getElementById('phone').value;
                    const color = document.getElementById('color').value;
                    const address = document.getElementById('address').value;
                    const aboutMe = document.getElementById('aboutme').value;
                    const url = randomstring.generate();

                    await fetch(`/api/update`, {
                      method: 'POST',
                      body: JSON.stringify({
                        email,
                        image,
                        profession,
                        phone,
                        color,
                        address,
                        aboutMe,
                        skills,
                        projects,
                        url,
                      }),
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    });
                  }}
                  className={styles.button}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </>
      ) : loading ? (
        <Loading />
      ) : (
        <div>no</div>
      )}
    </div>
  );
}
