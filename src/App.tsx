import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  TextField,
  type SelectChangeEvent,
} from '@mui/material'
import {
  CHART_COMPONENTS,
  getDocsUrl,
  getPresetJson,
  type ChartComponentName,
} from './chartPresets'
import ChartPreview, { type ChartConfig } from './ChartPreview'

type AppliedChart = {
  component: ChartComponentName
  config: ChartConfig
}

const parseConfig = (component: ChartComponentName, json: string): ChartConfig => {
  const parsed: unknown = JSON.parse(json)
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new Error('JSON should be an object')
  }
  const config = parsed as Partial<ChartConfig>
  if (typeof config.data !== 'object' || config.data === null) {
    throw new Error('Missing "data" field')
  }
  if (component === 'Chart' && typeof config.type !== 'string') {
    throw new Error('Missing "type" field for Chart component')
  }
  return config as ChartConfig
}

const presetChart = (component: ChartComponentName): AppliedChart => ({
  component,
  config: parseConfig(component, getPresetJson(component)),
})

function App() {
  const [component, setComponent] = useState<ChartComponentName>('Line')
  const [json, setJson] = useState(() => getPresetJson('Line'))
  const [applied, setApplied] = useState<AppliedChart>(() => presetChart('Line'))
  const [error, setError] = useState<string | null>(null)

  const loadPreset = (name: ChartComponentName) => {
    setComponent(name)
    setJson(getPresetJson(name))
    setApplied(presetChart(name))
    setError(null)
  }

  const handleChange = (event: SelectChangeEvent<ChartComponentName>) => {
    loadPreset(event.target.value as ChartComponentName)
  }

  const handleReset = () => loadPreset(component)

  const handleApply = () => {
    try {
      setApplied({ component, config: parseConfig(component, json) })
      setError(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    }
  }

  return (
    <Box
      sx={{
        p: 3,
        display: 'grid',
        gap: 3,
        gridTemplateColumns: { xs: '1fr', md: 'minmax(320px, 1fr) 2fr' },
        alignItems: 'start',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="chart-component-label">Component</InputLabel>
          <Select
            labelId="chart-component-label"
            value={component}
            label="Component"
            onChange={handleChange}
          >
            {CHART_COMPONENTS.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Link href={getDocsUrl(component)} target="_blank" rel="noopener noreferrer">
          {component} documentation ↗
        </Link>

        <TextField
          label="JSON"
          multiline
          minRows={15}
          maxRows={30}
          fullWidth
          value={json}
          onChange={(e) => setJson(e.target.value)}
          error={error !== null}
          helperText={error}
          slotProps={{
            htmlInput: { spellCheck: false, style: { fontFamily: 'monospace', fontSize: 13 } },
          }}
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" onClick={handleApply} sx={{ flex: 1 }}>
            Apply
          </Button>
          <Button variant="outlined" onClick={handleReset} sx={{ flex: 1 }}>
            Reset
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 2 }}>
        <ChartPreview component={applied.component} config={applied.config} />
      </Paper>
    </Box>
  )
}

export default App
