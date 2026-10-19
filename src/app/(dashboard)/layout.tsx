// import AuthGuard from "@/components/auth/auth.guard";
// import { ReactNode } from "react";

// export default function layout({children}:{children:ReactNode}) {
    

//     return (
//         <AuthGuard >This is layout Guard{children}</AuthGuard>
//     )
    
// }


import AuthGuard from "@/components/auth/auth.guard";
import Header from "@/components/layout/public/header"; // 👈 Header import korun
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col">
      
        <Header />
  
        <div className="flex flex-1">
          
          <main className="flex-1 p-4 md:p-6 bg-background">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}