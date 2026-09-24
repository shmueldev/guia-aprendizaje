// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'SHMUELDEV',
  tagline: 'Data Engineer · Data Science · Cloud',
  favicon: 'img/logo.svg',

  future: {
    v4: true,
  },

  url: 'https://shmueldev.github.io',
  baseUrl: '/',
  organizationName: 'shmueldev',
  projectName: 'guia',
  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/logo.svg',
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'SHMUELDEV',
        logo: {
          alt: 'SHMUELDEV',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'guiaSidebar',
            position: 'left',
            label: 'Guía',
          },
          {
            href: 'https://github.com/shmueldev',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://shmueldev.github.io/portfolio/',
            label: 'Portafolio',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Ruta',
            items: [
              {label: 'Empezar', to: '/docs/intro'},
              {label: 'Backend', to: '/docs/fastapi'},
              {label: 'Pipelines', to: '/docs/airflow'},
              {label: 'Cloud', to: '/docs/aws'},
            ],
          },
          {
            title: 'Datos y ciencia',
            items: [
              {label: 'SQL', to: '/docs/sql'},
              {label: 'Estadística', to: '/docs/estadistica'},
              {label: 'Machine Learning', to: '/docs/machine-learning'},
              {label: 'Airflow', to: '/docs/airflow'},
            ],
          },
          {
            title: 'Samuel Ruiz',
            items: [
              {label: 'GitHub', href: 'https://github.com/shmueldev'},
              {label: 'Portafolio', href: 'https://shmueldev.github.io/portfolio/'},
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/shmueldev',
              },
            ],
          },
        ],
        copyright: `SHMUELDEV · Guía de aprendizaje · Data Engineer y Data Science · Medellín`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.nightOwl,
        additionalLanguages: ['python', 'sql', 'bash', 'json', 'yaml'],
      },
    }),
};

export default config;
