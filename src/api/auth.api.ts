import apiClient from "@/lib/apiClient";
import { VerifyAccount } from "@/types/auth.type";



export function userLogin(payload :{email:string, password:string}) {

    return apiClient("auth/login", {method:"POST", body:payload})
    
}


export function userVerifyAccount(payload : VerifyAccount) {

    return apiClient("auth/verify-email", {method:"POST", body:payload})
    
}



export function userLogout() {
    return apiClient("auth/logout", {method:"POST"})
    
}


export function getMe() {
        return apiClient("auth/me")
    
}

 export function googleAuth(paylaod :{idToken: string}){
     return apiClient("auth/google", {method :"POST",body:paylaod})

 }


 export function userRegisterTourist(payload: {
  name: string
  email: string
  password: string
}) {
  return apiClient("auth/register/tourist", { method: "POST", body: payload })
}


export function userRegisterGuide(payload: {
  name: string
  email: string
  password: string
  guide?: {
    licenseNumber?: string
    yearsExperience?: number
    languages?: string[]
    baseLocation?: string
    bio?: string
    hourlyRate?: number | null
  }
}) {
  return apiClient("auth/register/guide", {
    method: "POST",
    body: payload,
  })
}