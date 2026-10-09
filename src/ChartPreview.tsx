import { Component, type ComponentType, type ReactNode } from 'react'
import { Alert } from '@mui/material'
import {
  Chart as ChartJS,
  registerables,
  type ChartData,
  type ChartOptions,
  type ChartType,
} from 'chart.js'
import {
  Bar,
  Bubble,
  Chart,
  Doughnut,
  Line,
  Pie,
  PolarArea,
  Radar,
  Scatter,
} from 'react-chartjs-2'
import type { ChartComponentName } from './chartPresets'

ChartJS.register(...registerables)

export type ChartConfig = {
  type?: ChartType
  data: ChartData
  options?: ChartOptions
}

type TypedChartProps = Pick<ChartConfig, 'data' | 'options'>

const TYPED_CHARTS = {
  Bar,
  Bubble,
  Doughnut,
  Line,
  Pie,
  PolarArea,
  Radar,
  Scatter,
} as unknown as Record<Exclude<ChartComponentName, 'Chart'>, ComponentType<TypedChartProps>>

class ChartErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return <Alert severity="error">Error: {this.state.error.message}</Alert>
    }
    return this.props.children
  }
}

type Props = {
  component: ChartComponentName
  config: ChartConfig
}

function ChartPreview({ component, config }: Props) {
  const { type, data, options } = config

  let chart: ReactNode
  if (component === 'Chart') {
    chart = <Chart type={type ?? 'bar'} data={data} options={options} />
  } else {
    const TypedChart = TYPED_CHARTS[component]
    chart = <TypedChart data={data} options={options} />
  }

  return (
    <ChartErrorBoundary key={`${component}:${JSON.stringify(config)}`}>
      {chart}
    </ChartErrorBoundary>
  )
}

export default ChartPreview
