
// "use client"
// import VerifyotpForm from "@/components/layout/veryfyOtp/varifyOtp";
// import { Suspense } from "react";

// export default function VerifyAccount() {

    
//     return (

//        <div>
//         <Suspense fallback ={<p>Loading .....</p>}>
//              <VerifyotpForm></VerifyotpForm>
//         </Suspense>
       
//        </div>

      
//     )
    
// }


import { Suspense } from "react"
import { Spinner } from "@/components/ui/spinner"
import { VerifyOtpForm } from "@/components/layout/registration/verify-otp-form"

export default function VerifyAccountPage() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Suspense
        fallback={
          <div className="flex justify-center">
            <Spinner className="h-8 w-8" />
          </div>
        }
      >
        <VerifyOtpForm />
      </Suspense>
    </div>
  )
}