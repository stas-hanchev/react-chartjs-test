export const CHART_COMPONENTS = [
  'Chart',
  'Bar',
  'Bubble',
  'Doughnut',
  'Line',
  'Pie',
  'PolarArea',
  'Radar',
  'Scatter',
] as const

export type ChartComponentName = (typeof CHART_COMPONENTS)[number]

export const getDocsUrl = (name: ChartComponentName) =>
  `https://react-chartjs-2.js.org/components/${name.replace(/(?<!^)([A-Z])/g, '-$1').toLowerCase()}`

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
const colors = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']

const palette = {
  red: 'rgba(255, 99, 132, 0.5)',
  redBorder: 'rgb(255, 99, 132)',
  blue: 'rgba(53, 162, 235, 0.5)',
  blueBorder: 'rgb(53, 162, 235)',
  green: 'rgba(75, 192, 192, 0.5)',
  greenBorder: 'rgb(75, 192, 192)',
}

const pieColors = {
  backgroundColor: [
    'rgba(255, 99, 132, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(153, 102, 255, 0.5)',
    'rgba(255, 159, 64, 0.5)',
  ],
  borderColor: [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 206, 86)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
    'rgb(255, 159, 64)',
  ],
  borderWidth: 1,
}

const titled = (text: string) => ({
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text },
  },
})

export const CHART_PRESETS: Record<ChartComponentName, object> = {
  Chart: {
    type: 'bar',
    data: {
      labels: months,
      datasets: [
        {
          type: 'line',
          label: 'Dataset 1',
          borderColor: palette.redBorder,
          borderWidth: 2,
          fill: false,
          data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
          type: 'bar',
          label: 'Dataset 2',
          backgroundColor: palette.green,
          data: [28, 48, 40, 19, 86, 27, 90],
        },
        {
          type: 'bar',
          label: 'Dataset 3',
          backgroundColor: palette.blue,
          data: [45, 25, 60, 70, 30, 50, 20],
        },
      ],
    },
    options: titled('Chart.js Multitype Chart'),
  },

  Bar: {
    data: {
      labels: months,
      datasets: [
        {
          label: 'Dataset 1',
          backgroundColor: palette.red,
          data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
          label: 'Dataset 2',
          backgroundColor: palette.blue,
          data: [28, 48, 40, 19, 86, 27, 90],
        },
      ],
    },
    options: titled('Chart.js Bar Chart'),
  },

  Bubble: {
    data: {
      datasets: [
        {
          label: 'Red dataset',
          backgroundColor: palette.red,
          data: [
            { x: -50, y: 20, r: 10 },
            { x: 30, y: -40, r: 15 },
            { x: 70, y: 60, r: 8 },
            { x: -20, y: -70, r: 12 },
          ],
        },
        {
          label: 'Blue dataset',
          backgroundColor: palette.blue,
          data: [
            { x: 10, y: 50, r: 18 },
            { x: -60, y: -30, r: 6 },
            { x: 40, y: 10, r: 14 },
            { x: 80, y: -50, r: 9 },
          ],
        },
      ],
    },
    options: {
      ...titled('Chart.js Bubble Chart'),
      scales: { y: { beginAtZero: true } },
    },
  },

  Doughnut: {
    data: {
      labels: colors,
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          ...pieColors,
        },
      ],
    },
    options: titled('Chart.js Doughnut Chart'),
  },

  Line: {
    data: {
      labels: months,
      datasets: [
        {
          label: 'Dataset 1',
          borderColor: palette.redBorder,
          backgroundColor: palette.red,
          data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
          label: 'Dataset 2',
          borderColor: palette.blueBorder,
          backgroundColor: palette.blue,
          data: [28, 48, 40, 19, 86, 27, 90],
        },
      ],
    },
    options: titled('Chart.js Line Chart'),
  },

  Pie: {
    data: {
      labels: colors,
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          ...pieColors,
        },
      ],
    },
    options: titled('Chart.js Pie Chart'),
  },

  PolarArea: {
    data: {
      labels: colors,
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: pieColors.backgroundColor,
          borderWidth: 1,
        },
      ],
    },
    options: titled('Chart.js Polar Area Chart'),
  },

  Radar: {
    data: {
      labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
      datasets: [
        {
          label: '# of Votes',
          data: [2, 9, 3, 5, 2, 3],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: palette.redBorder,
          borderWidth: 1,
        },
      ],
    },
    options: titled('Chart.js Radar Chart'),
  },

  Scatter: {
    data: {
      datasets: [
        {
          label: 'A dataset',
          backgroundColor: palette.red,
          data: [
            { x: -10, y: 0 },
            { x: 0, y: 10 },
            { x: 10, y: 5 },
            { x: 0.5, y: 5.5 },
            { x: -5, y: -8 },
            { x: 7, y: -3 },
          ],
        },
      ],
    },
    options: {
      ...titled('Chart.js Scatter Chart'),
      scales: { y: { beginAtZero: true } },
    },
  },
}

export const getPresetJson = (name: ChartComponentName) =>
  JSON.stringify(CHART_PRESETS[name], null, 2)
