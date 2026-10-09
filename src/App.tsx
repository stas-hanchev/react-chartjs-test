import { useState } from 'react'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from '@mui/material'
import {
  CHART_COMPONENTS,
  getPresetJson,
  type ChartComponentName,
} from './chartPresets'

function App() {
  const [component, setComponent] = useState<ChartComponentName>('Line')
  const [json, setJson] = useState(() => getPresetJson('Line'))

  const handleChange = (event: SelectChangeEvent<ChartComponentName>) => {
    const name = event.target.value as ChartComponentName
    setComponent(name)
    setJson(getPresetJson(name))
  }

  return (
    <Box sx={{ p: 3, maxWidth: 600, display: 'flex', flexDirection: 'column', gap: 2 }}>
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

      <TextField
        label="JSON"
        multiline
        minRows={15}
        maxRows={30}
        fullWidth
        value={json}
        onChange={(e) => setJson(e.target.value)}
        slotProps={{
          htmlInput: { spellCheck: false, style: { fontFamily: 'monospace', fontSize: 13 } },
        }}
      />
    </Box>
  )
}

export default App
