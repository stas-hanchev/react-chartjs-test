import { useState } from 'react'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from '@mui/material'

const CHART_COMPONENTS = [
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

type ChartComponentName = (typeof CHART_COMPONENTS)[number]

function App() {
  const [component, setComponent] = useState<ChartComponentName>('Line')

  const handleChange = (event: SelectChangeEvent<ChartComponentName>) => {
    setComponent(event.target.value as ChartComponentName)
  }

  return (
    <Box sx={{ p: 3, maxWidth: 400 }}>
      <FormControl fullWidth>
        <InputLabel id="chart-component-label">Компонент</InputLabel>
        <Select
          labelId="chart-component-label"
          value={component}
          label="Компонент"
          onChange={handleChange}
        >
          {CHART_COMPONENTS.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default App
