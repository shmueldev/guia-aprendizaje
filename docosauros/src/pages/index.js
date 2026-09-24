import {useEffect, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function TypeLine({text, as = 'span', className, delay = 0, speed = 28}) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setCount(text.length);
      setDone(true);
      return undefined;
    }
    let index = 0;
    let timer;
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        index += 1;
        setCount(index);
        if (index >= text.length) {
          window.clearInterval(timer);
          setDone(true);
        }
      }, speed);
    }, delay);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(timer);
    };
  }, [text, delay, speed]);

  const shown = (
    <span aria-hidden="true">
      {text.slice(0, count)}
      <span className={clsx(styles.caret, done && styles.caretDone)} />
    </span>
  );

  if (as === 'h1' || as === 'h2' || as === 'h3') {
    return (
      <Heading as={as} className={className} aria-label={text}>
        {shown}
      </Heading>
    );
  }

  const Tag = as;
  return (
    <Tag className={className} aria-label={text}>
      {shown}
    </Tag>
  );
}

const tracks = [
  {
    step: '01',
    title: 'Fundamentos',
    text: 'SQL, tablas limpias y estadística. La base del ingeniero y del científico de datos.',
    links: [
      {label: 'SQL', to: '/docs/sql'},
      {label: 'Pandas', to: '/docs/pandas'},
      {label: 'Estadística', to: '/docs/estadistica'},
    ],
  },
  {
    step: '02',
    title: 'Backend',
    text: 'Crear APIs y entender un patrón de diseño, no solo consumirlas.',
    links: [
      {label: 'FastAPI', to: '/docs/fastapi'},
      {label: 'Django', to: '/docs/django'},
    ],
  },
  {
    step: '03',
    title: 'Data Science',
    text: 'Modelos con una métrica honesta y un resultado que se puede repetir.',
    links: [
      {label: 'Machine Learning', to: '/docs/machine-learning'},
      {label: 'Validación', to: '/docs/validacion'},
      {label: 'Producción', to: '/docs/modelos-produccion'},
    ],
  },
  {
    step: '04',
    title: 'Pipelines',
    text: 'Construir flujos de datos en distintos ambientes y plataformas.',
    links: [
      {label: 'PySpark', to: '/docs/pyspark'},
      {label: 'Databricks', to: '/docs/databricks'},
      {label: 'Airflow', to: '/docs/airflow'},
    ],
  },
  {
    step: '05',
    title: 'Cloud',
    text: 'Nube más allá de lo esencial: datos, seguridad y costo.',
    links: [
      {label: 'AWS', to: '/docs/aws'},
      {label: 'Azure', to: '/docs/azure'},
    ],
  },
  {
    step: '06',
    title: 'Frontend',
    text: 'Interfaces y dashboards con una UX clara sobre tus datos.',
    links: [
      {label: 'Dash', to: '/docs/dash'},
      {label: 'JavaScript', to: '/docs/javascript'},
      {label: 'React', to: '/docs/react'},
    ],
  },
];

const skills = ['Python', 'SQL', 'ML', 'Airflow', 'Spark', 'Cloud'];

const bits = ['0', '1', '01', '10', '0', '1', '11', '0', '10', '1', '0', '01'];

function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.streams} aria-hidden="true" />
      <div className={styles.streamsFast} aria-hidden="true" />
      <div className={styles.bits} aria-hidden="true">
        {bits.map((bit, index) => (
          <span key={index} className={styles.bit} style={{'--i': index}}>
            {bit}
          </span>
        ))}
      </div>
      <div className={clsx('container', styles.content)}>
        <TypeLine as="p" className={styles.kicker} text="Guía de aprendizaje" delay={80} speed={34} />
        <TypeLine as="h1" className={styles.title} text="SHMUELDEV" delay={700} speed={70} />
        <TypeLine
          as="p"
          className={styles.tagline}
          text="DATA ENGINEER · DATA SCIENCE · CLOUD"
          delay={1500}
          speed={32}
        />
        <div className={styles.skills}>
          {skills.map((skill, index) => (
            <span key={skill} className={styles.skill} style={{'--i': index}}>
              {skill}
            </span>
          ))}
        </div>
        <TypeLine
          as="p"
          className={styles.lead}
          text="El orden para llegar a ser un buen ingeniero de datos y un buen data scientist: sistemas que se pueden operar y modelos que se pueden defender."
          delay={2900}
          speed={16}
        />
        <div className={styles.actions}>
          <Link className={clsx('button button--lg', styles.primary)} to="/docs/intro">
            Empezar la ruta
          </Link>
          <Link
            className={clsx('button button--lg', styles.ghost)}
            to="/docs/machine-learning">
            Abrir Machine Learning
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Guía de aprendizaje"
      description={siteConfig.tagline}>
      <Hero />
      <main>
        <section className={styles.tracks}>
          <div className="container">
            <TypeLine as="h2" className={styles.sectionTitle} text="Orden para aprender" delay={200} speed={38} />
            <TypeLine
              as="p"
              className={styles.sectionLead}
              text="Samuel David Ruiz Angulo · Medellín. Cada bloque tiene una guía con fases, práctica y un criterio claro de cuándo avanzar."
              delay={900}
              speed={14}
            />
            <div className={styles.grid}>
              {tracks.map((track, index) => (
                <article key={track.step} className={styles.card} style={{'--i': index}}>
                  <span className={styles.step}>{track.step}</span>
                  <TypeLine as="h3" text={track.title} delay={400 + index * 180} speed={36} />
                  <p>{track.text}</p>
                  <div className={styles.links}>
                    {track.links.map((link) => (
                      <Link key={link.to} to={link.to}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className={styles.method}>
          <div className="container">
            <TypeLine as="h2" className={styles.sectionTitle} text="Cómo usar la guía" delay={200} speed={38} />
            <div className={styles.methodGrid}>
              <div className={styles.panel}>
                <TypeLine as="h3" text="Teoría corta" delay={500} speed={34} />
                <p>Cada fase dice qué dominar y por qué importa en un sistema o en un análisis.</p>
              </div>
              <div className={styles.panel}>
                <TypeLine as="h3" text="Práctica marcada" delay={800} speed={34} />
                <p>Los checkboxes son el avance. No pases de fase sin el mini-proyecto.</p>
              </div>
              <div className={styles.panel}>
                <TypeLine as="h3" text="Dos oficios, una ruta" delay={1100} speed={34} />
                <p>Ingeniería para mover y servir datos. Ciencia de datos para medir, modelar y decidir.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
