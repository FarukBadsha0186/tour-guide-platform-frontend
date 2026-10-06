

import TourisLayout from "@/components/layout/tourist/tourist.dashboard";
import TouristhomeLayout from "@/components/layout/tourist/tourist.home";
import { UserRole } from "@/types";
import { ReactNode } from "react";

export default function TouristDashboard({children ,role}:{ children :ReactNode ,role:UserRole}) {

     return( 

       
      <h1>hello this is dashboard </h1>
     )
    
}