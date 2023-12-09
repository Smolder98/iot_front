import { IDevice } from '@/interfaces/device.interface'
import { Ref, ref } from 'vue'
import { HttpService } from './httpService';
import { useUserStore } from '@/stores/user';
import { AxiosError } from 'axios';

const useDeviceFetch = () => {
  const devices: Ref<IDevice[]> = ref([])
  const isLoading: Ref<boolean> = ref(false)
  const errors = ref({} as any)
  const message = ref('')

  const fetchDevices = async () => {
    isLoading.value = true

    const httpService = HttpService.getInstance()

    try {
      const { token } = useUserStore()

      httpService.http.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const { data } = await httpService.http.get<IDevice[]>('/devices')

      devices.value = data as IDevice[]

    } catch (error) {
      // console.log(error);

    }

    isLoading.value = false
  }

  const assingDevice = async (patientId: string, deviceId: string) => {
    isLoading.value = true
    message.value = ''
    errors.value = {}

    try {

      const httpService = HttpService.getInstance()
      const { token } = useUserStore()
      httpService.http.defaults.headers.common['Authorization'] = `Bearer ${token}`

      await httpService.http.post('/patients/asing/device', { patientId, deviceId })
      message.value = 'Dispositivo asignado correctamente'

    } catch (error: AxiosError | any) {
      if (error instanceof AxiosError) {
        errors.value = error.response?.data.errors
      }
    }
    finally {
      isLoading.value = false
    }


  }

  
  return {
    devices,
    fetchDevices,
    assingDevice,
    message,
    errors,
    isLoading
  }
}

export default useDeviceFetch

// export class PostService {
//   private static url = 'https://jsonplaceholder.typicode.com/posts'
//   private posts: Ref<IPost[]> = ref([])

//   getPosts() {
//     return this.posts
//   }

//   async fetchAll() {
//     try {
//       const response = await fetch(PostService.url)
//       this.posts.value = await response.json()
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }