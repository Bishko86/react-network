//user reducer types
export type UsersStateType = {
  items: Array<ItemsUserType>
  totalCount: number
  error: string
}

export type ItemsUserType = {
  id: number
  name: string
  status: string | null
  photos: { small: string | null, large: string | null }
  followed: boolean
}

//api types 'auth/me' 
export type AuthType = {
  resultCode: number
  messages: Array<string>
  data: {
    id: number
    email: string
    login: string
  }
}

export type LoginApiType = {
  resultCode: number
  messages: Array<string>
  data: {
    userId: number
  }
}

export type LogoutApiType = {
  resultCode: number
  messages: Array<string>,
  data: any
}