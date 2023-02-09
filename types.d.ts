
export interface SignData {
  username: string,
  password: string
}

export interface SignDataFromDB extends SignData{
  __id: string,
  _v: number,
}

interface User {
  id: string,
  name: string,
  reminders?: any, //must exist later
  notes?: any //must exist later

}
export interface ProductData {
  id: string,
  userData: User,
}

export interface FormError {
  from: 'name' | 'password' | 'all' | 'none' | 'confirmed',
  message?: string
}

