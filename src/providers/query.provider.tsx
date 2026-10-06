"use client"

import { environmentManager, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Children, ReactNode } from "react";


function makeQueryClient() {
    return new QueryClient({
        defaultOptions:{
            queries:{
                staleTime : 60*1000, 
            }
        }

    })
}

let browserQueryClinet : QueryClient | undefined  = undefined;
 function  getQueryClient () {
     if (environmentManager.isServer()){
        return makeQueryClient();

     }else{
        if (!browserQueryClinet){
            browserQueryClinet=makeQueryClient();

        }
        return browserQueryClinet ;
     }
    
     
 }

export default function QueryProvider({children}:{children: ReactNode}) {
    const queryClient =getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
           {children}
        </QueryClientProvider>
    )
    
}