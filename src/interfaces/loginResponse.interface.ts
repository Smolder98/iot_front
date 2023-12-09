
import { IUser } from './user.interface'

export interface ILoginResponse {
  token: string
  token_type: string
  user: IUser
}