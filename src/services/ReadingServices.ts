import { Ref, ref } from 'vue'
import { HttpService } from './httpService';
import { AxiosError } from 'axios';
import { IReadings } from '@/interfaces/readings.interface';
import { useUserStore } from '@/stores/user';

const useReadignFetch = () => {
  const readigns: Ref<IReadings[]> = ref([])
  const isLoading: Ref<boolean> = ref(false)
  const errors = ref({} as any)
  const message = ref('')

  const fetchReadings = async (user_id: string) => {
    isLoading.value = true
    message.value = ''
    errors.value = {}

    const httpService = HttpService.getInstance()

    try {
      const { token } = useUserStore()

      httpService.http.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const { data } = await httpService.http.get(`/readings/search/${user_id}`)

      readigns.value = data as IReadings[]

    } catch (error) {
      console.log(error);
    }
    finally {
      isLoading.value = false
    }

  }

  return {
    readigns,
    fetchReadings,
    message,
    errors,
    isLoading
  }
}

export default useReadignFetch