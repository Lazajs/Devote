
export interface SignData {
  username: string,
  password: string
}

export interface SignDataFromDB extends SignData{
  __id: string,
  _v: number
}

export interface User {
  username: string,
  id: string,
  passwordHash: string,
  reminders?: any, //put reminders
  notes?: any, //put notes
}