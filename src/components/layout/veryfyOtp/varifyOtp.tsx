"use client"


import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useVerifyAccount } from "@/hooks";

import { REGEXP_ONLY_DIGITS } from "input-otp";

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react";
import { toast } from "sonner";
import { isValid } from "zod/v3";

export default function  VerifyotpForm() {

const router = useRouter()

const searchParams= useSearchParams();
const email =searchParams.get("email") // "";
const [isInvalid, setIsInvalid] = useState(false);

 
const {mutate:verify, isPending:verifyPending}=useVerifyAccount();


   const [otp, setOtp]= useState( "");

   
   if(!email){
    router.push("/");
    return null
   }



   const handleOtp= ()=>{
    if(otp.length !==7){
        setIsInvalid(true);
      return;

    }
     const verifyData={
    email,otp
   }

     verify(verifyData, {
        onSuccess: () => {
          toast.success("Account created!", {
            description: "Please login to continue",
          })
        
          
          router.push(`/`)
        },
        onError: (err) => {
          toast.error("Registration failed", {
            description: err.message || "Something went wrong",
          })
        },
      })

 


   }



     return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Veryfy Account
                    <CardDescription>
                        Please provide your OTP which send your mail 
                    </CardDescription>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form 
                id="otp-form"
                onSubmit={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    handleOtp();

                }}>

     <Field data-invalid={isInvalid}>

    
    <FieldLabel htmlFor="otp">OTP</FieldLabel>
    <InputOTP maxLength={7} 
    onChange={(value)=>setOtp(value)}
     value={otp}
     autoComplete="off"
     name="otp"
     id="otp"
     pattern={REGEXP_ONLY_DIGITS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
         <InputOTPSlot index={6} />
      </InputOTPGroup>
    </InputOTP>
       {isInvalid && (
              <FieldError
                errors={[{ message: "Invalid Code. Please try again" }]}
              />
            )}
    </Field>
  
                </form>
            </CardContent>


            <CardFooter>
                <Button type="submit" form="otp-form">Submit</Button>
                <Button >Resend</Button>
            </CardFooter>
        </Card>
     )
    
    }