import { defineStore } from 'pinia'
import { IUser } from '../interfaces/user.interface';
import { HttpService } from '../services/httpService';
import { router } from '@/router';
export const useUserStore = defineStore('user', {
  state: () => ({
    user: getUserFromStorage(),
    token: getTokenFromStorage(),
    isAuthenticated: false
  }),
  actions: {
    setUser(user: IUser) {
      this.user = user
    },
    setToken(token: string) {
      this.token = token
    },
    setIsAuthenticated(isAuthenticated: boolean) {
      this.isAuthenticated = isAuthenticated
    },

    async login(email: string, password: string) {
      try {
        const httpService = HttpService.getInstance()

        const { data } = await httpService.http.post('/login', {
          email,
          password,
          deviceName: "web"
        })

        this.setToken(data.token)
        this.setIsAuthenticated(true)

        this.setUser({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
        })

        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))

        router.push({ name: 'home' })
      } catch (error) {
        console.log(error)
      }

    },

    logout() {
      this.token = ''
      this.user = {} as IUser
      this.isAuthenticated = false
      localStorage.clear()
      router.push({ name: 'login' })
    },


  }
})

const getUserFromStorage = (): IUser => {
  const user = localStorage.getItem('user')

  if (user) {
    const temp = JSON.parse(user) 

    return {
      id: temp.id,
      name: temp.name,
      email: temp.email
    }
  }

  return {} as IUser
}

const getTokenFromStorage = () => {
  const token = localStorage.getItem('token')

  if (token) {
    return token
  }

  return ''
}