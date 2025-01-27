export interface Ilogin {
  message: string
  data: IData
}
export interface IData {
  accessToken: string
  refreshToken: string
  profile: IProfile
}
export interface IProfile {
  _id: string
  first_name: string
  last_name: string
  email: string
  status: string
  role: string
}
