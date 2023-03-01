export interface User {
  id: string,
  name: string,
  reminders?: any, //must exist later
  notes?: any //must exist later
}

export type AuthState = "authenticated" | "loading" | "unauthenticated"