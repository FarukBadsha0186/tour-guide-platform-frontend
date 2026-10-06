import { getMe, googleAuth, userLogin, userLogout, userRegisterTourist, userVerifyAccount, } from "@/api";
import { Mutation, useMutation, useQueries, useQuery } from "@tanstack/react-query";


 export function useLogin() {
    return useMutation({
        mutationFn:userLogin
    })
    
 }


  export function useVerifyAccount() {
    return useMutation({
        mutationFn:userVerifyAccount
    })
    
 }





  export function useLogout() {
    return useMutation({
        mutationFn:userLogout
    })
    
 }

 export function useGoogleOAuth(){
    return useMutation ({
      mutationFn:googleAuth
       
    })

 }
export function useRegisterTourist() {
   
  return useMutation({ mutationFn: userRegisterTourist })
}
 
    
export function useGetMe() {
     return useQuery ({
        queryKey:["user"],
        queryFn:getMe,
        retry:false,

     })
    
}

