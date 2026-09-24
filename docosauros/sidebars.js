// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  guiaSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Ruta de aprendizaje',
    },
    {
      type: 'category',
      label: '1. Fundamentos',
      collapsed: false,
      items: [
        'SQL/GUIA/sql',
        'NUMPY/GUIA/numpy',
        'PANDAS/GUIA/pandas',
        'MATPLOTLIB/GUIA/matplotlib',
        'SEABORN/GUIA/seaborn',
        'ESTADISTICA/GUIA/estadistica',
      ],
    },
    {
      type: 'category',
      label: '2. Backend',
      collapsed: false,
      items: ['FASTAPI/GUIA/fastapi', 'DJANGO/GUIA/django'],
    },
    {
      type: 'category',
      label: '3. Data Science',
      collapsed: false,
      items: [
        'MACHINE-LEARNING/GUIA/machine-learning',
        'VALIDACION/GUIA/validacion',
        'MODELOS-PRODUCCION/GUIA/modelos-produccion',
      ],
    },
    {
      type: 'category',
      label: '4. Pipelines',
      collapsed: false,
      items: [
        'PYSPARK/GUIA/pyspark',
        'DATABRICKS/GUIA/databricks',
        'AIRFLOW/GUIA/airflow',
      ],
    },
    {
      type: 'category',
      label: '5. Cloud',
      collapsed: false,
      items: ['AWS/GUIA/aws', 'AZURE/GUIA/azure'],
    },
    {
      type: 'category',
      label: '6. Frontend',
      collapsed: false,
      items: [
        'DASH/GUIA/dash',
        'JAVASCRIPT/GUIA/javascript',
        'REACT/GUIA/react',
      ],
    },
  ],
};

export default sidebars;
