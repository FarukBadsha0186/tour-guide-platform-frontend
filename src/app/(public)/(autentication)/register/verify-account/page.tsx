
"use client"
import VerifyotpForm from "@/components/layout/veryfyOtp/varifyOtp";
import { Suspense } from "react";

export default function VerifyAccount() {

    
    return (

       <div>
        <Suspense fallback ={<p>Loading .....</p>}>
             <VerifyotpForm></VerifyotpForm>
        </Suspense>
       
       </div>

      
    )
    
}