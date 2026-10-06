
import Footer from "@/components/layout/public/footer";
import Header from "@/components/layout/public/header";
import { ReactNode } from "react";

export default function layput({children}:{children: ReactNode}) {

     return (

      <div className="flex flex-col min-h-screen">
         <Header/>
         <main className="flex-1">{children}</main>
         <Footer/>
      </div>
      
        
     )
    
}