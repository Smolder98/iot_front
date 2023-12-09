import { Ref, ref } from 'vue'
import { HttpService } from './httpService';
import { useUserStore } from '@/stores/user';
import { IPatient } from '@/interfaces/patient.interface';
import { AxiosError } from 'axios';

const usePatientFetch = () => {
  const patients: Ref<IPatient[]> = ref([])
  const isLoading: Ref<boolean> = ref(false)
  const errors = ref({} as any)
  const message = ref('')

  const fetchPatients = async () => {
    isLoading.value = true
    message.value = ''
    errors.value = {}

    const httpService = HttpService.getInstance()

    try {
      const { token } = useUserStore()

      httpService.http.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const { data } = await httpService.http.get('/patients')

      patients.value = data as IPatient[]

    } catch (error) {
      console.log(error);
    }
    finally {
      isLoading.value = false
    }

  }

  const createPatient = async (patient: IPatient) => {
    isLoading.value = true
    message.value = ''
    errors.value = {}

    try {

      const httpService = HttpService.getInstance()
      const { token } = useUserStore()
      httpService.http.defaults.headers.common['Authorization'] = `Bearer ${token}`

      const { data } = await httpService.http.post('/patients', patient)

      patients.value.push(data)

      message.value = 'Paciente creado correctamente'

    } catch (error: AxiosError | any) {
      if (error instanceof AxiosError) {
        errors.value = error.response?.data.errors
      }
    }
    finally {
      isLoading.value = false
    }


  }

  const findById = async (id: string): Promise<IPatient> => {
    try {
      isLoading.value = true
      const httpService = HttpService.getInstance()
      const { token } = useUserStore()

      httpService.http.defaults.headers.common['Authorization'] = `Bearer ${token}`

      const { data } = await httpService.http.get(`/patients/${id}`)

      return data as IPatient
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        errors.value = error.response?.data.errors
      }

      return {} as IPatient
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    patients,
    fetchPatients,
    createPatient,
    findById,
    message,
    errors,
    isLoading
  }
}

export default usePatientFetch