// import GuideRegisterPage from "@/components/layout/guide/guideRegister";

import { GuideRegisterForm } from "@/components/layout/guide/guideRegister";

// export default function GuidePage() {
//   return (
//     <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
//       <div className="w-full max-w-sm">
//         <GuideRegisterPage/>
//       </div>
//     </div>
//   )
// }



export default function GuideRegisterPage() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <GuideRegisterForm />
    </div>
  )
}