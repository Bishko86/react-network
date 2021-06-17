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
  resultCode: 0
  messages: Array<string>
  data: {
    userId: number
  }
}

export type LogoutApiType = {
  resultCode: 1 | 0
  messages: Array<string>,
  data: {

  }
}

//profile reducer type

export type ProfileType = {
  userId: number | null
  lookingForAJob: boolean
  lookingForAJobDescription: string | null
  fullName: string
  contacts: ContactsType
  photos: PhotosType

}

export type PhotosType = {
  small: string
  large: string
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
export type ProfileApiType = {
  resultCode: 0 | 1
  messages: Array<string>
  data: {
    userId: number
  } | any
}




//user reducer types


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

