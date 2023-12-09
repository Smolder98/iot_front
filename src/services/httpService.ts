import axios, { AxiosInstance } from 'axios'
import { useUserStore } from '@/stores/user'

// htttp service singleton

export class HttpService {
  private static instance: HttpService
  // private static URL_BASE = 'http://localhost:8000/api'
  private static URL_BASE = 'https://iot.aelehn.com/api'

  public http!: AxiosInstance
  private constructor() {
  }

  public static getInstance(): HttpService {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService()

      HttpService.instance.http = axios.create({
        baseURL: HttpService.URL_BASE,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      HttpService.instance.http = axios.create({
        baseURL: HttpService.URL_BASE,
      })

      HttpService.instance.http.interceptors.response.use(function (response) {
        return response
      }, function (error) {
        const { response: { status} } = error

        if (status === 401) {
          const userStore = useUserStore()
          userStore.logout()
          return Promise.reject(error)
        }

        return Promise.reject(error)
      })
    }

    return HttpService.instance
  }
}