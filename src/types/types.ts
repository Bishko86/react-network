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

//profile reducer type

export type ProfileType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string | null
  fullName: string
  contacts: ContactsType
  photos: PhotoType

}

export type PhotoType = {
  small: string | null
  large: string | null
}
export type ContactsType = {
  github: string | null
  vk: string | null
  facebook: string | null
  instagram: string | null
  twitter: string | null
  website: string | null
  youtube: string | null
  mainLink: string | null
}

export type PostType = {
  id: number
  post: string
  likes: number
  liked: boolean
  date: Date | string
}
export type InitialStateType = {
  posts: Array<PostType>
  profile: ProfileType | null
  status: string
  error: boolean | { error: {}; request: string | null; }
}


// function return types to literal types

export function inferLiteralFromString<T extends string>(arg: T): T {
  return arg;
}
export function inferLiteral<U, T extends U>(arg: T): T {
  return arg;
}
export function inferStringLiteral<T extends string>(arg: T): T {
  return inferLiteral<string, T>(arg);
}

