import { Ref, ref } from 'vue'
import { HttpService } from './httpService';
import { useUserStore } from '@/stores/user';
import { IDoctor } from '@/interfaces/doctor.interface';
import { AxiosError } from 'axios';

const useDoctorFetch = () => {
  const doctors: Ref<IDoctor[]> = ref([])
  const isLoading: Ref<boolean> = ref(false)
  const errors = ref({} as any)
  const message = ref('')

  const fetchDoctors = async () => {
    isLoading.value = true

    const httpService = HttpService.getInstance()

    try {
      const { token } = useUserStore()

      httpService.http.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const { data } = await httpService.http.get<IDoctor[]>('/doctors')

      doctors.value = data as IDoctor[]

    } catch (error) {
      // console.log(error);

    }

    isLoading.value = false
  }

  const sendMail = async (patientId: string, doctorId: string) => {
    isLoading.value = true
    message.value = ''
    errors.value = {}

    try {

      const httpService = HttpService.getInstance()
      const { token } = useUserStore()
      httpService.http.defaults.headers.common['Authorization'] = `Bearer ${token}`

      await httpService.http.get(`/mail/readings/${patientId}/${doctorId}`)
      message.value = 'Email enviado correctamente'

    } catch (error: AxiosError | any) {
      
      if (error instanceof AxiosError) {
        if (error.response?.data.errors) {
          errors.value = error.response?.data.errors
        }
        else  {
          errors.value = error.response?.data
        }
      }
    }
    finally {
      isLoading.value = false
    }
  }


  return {
    doctors,
    fetchDoctors,
    message,
    sendMail,
    errors,
    isLoading
  }
}

export default useDoctorFetch