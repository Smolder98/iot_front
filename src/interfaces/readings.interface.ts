export interface IReadings {
  id: string
  temperature: number
  frequency_cardiac: number
  pressure_sistolic: number
  pressure_diastolic: number
  oxygen_saturation: number
  patient_id: number
  device_id: number
  created_at: string
  updated_at: string
}