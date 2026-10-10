// // "use client"

// // import { useState } from "react"
// // import { useForm } from "@tanstack/react-form"
// // import { toast } from "sonner"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import {
// //   Field,
// //   FieldError,
// //   FieldGroup,
// //   FieldLabel,
// //   FieldDescription,
// // } from "@/components/ui/field"
// // import { Textarea } from "@/components/ui/textarea"
// // import { Badge } from "@/components/ui/badge"
// // import { Spinner } from "@/components/ui/spinner"
// // import { X } from "lucide-react"
// // import { useUpdateGuideProfile } from "@/hooks"
// // import { LANGUAGE_OPTIONS } from "@/constants/guide.constants"
// // import type { GuideProfile } from "@/types/guide.type"

// // interface ProfileFormProps {
// //   profile: GuideProfile
// //   onCancel: () => void
// //   onSuccess: () => void
// // }

// // export function ProfileForm({
// //   profile,
// //   onCancel,
// //   onSuccess,
// // }: ProfileFormProps) {
// //   const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
// //     profile.languages || []
// //   )

// //   const { mutate: update, isPending } = useUpdateGuideProfile()

// //   const form = useForm({
// //     defaultValues: {
// //       licenseNumber: profile.licenseNumber || "",
// //       yearsExperience: profile.yearsExperience || 0,
// //       baseLocation: profile.baseLocation || "",
// //       bio: profile.bio || "",
// //       hourlyRate: profile.hourlyRate || 0,
// //     },
// //     onSubmit: ({ value }) => {
// //       update(
// //         {
// //           ...value,
// //           languages: selectedLanguages,
// //         },
// //         {
// //           onSuccess: () => {
// //             toast.success("Profile updated successfully")
// //             onSuccess()
// //           },
// //           onError: (err) => {
// //             toast.error("Update failed", {
// //               description: err.message || "Something went wrong",
// //             })
// //           },
// //         }
// //       )
// //     },
// //   })

// //   const toggleLanguage = (lang: string) => {
// //     setSelectedLanguages((prev) =>
// //       prev.includes(lang)
// //         ? prev.filter((l) => l !== lang)
// //         : [...prev, lang]
// //     )
// //   }

// //   return (
// //     <form
// //       onSubmit={(e) => {
// //         e.preventDefault()
// //         form.handleSubmit()
// //       }}
// //     >
// //       <FieldGroup className="gap-5">
// //         {/* License Number */}
// //         <form.Field name="licenseNumber">
// //           {(field) => {
// //             const isInvalid =
// //               field.state.meta.isTouched && !field.state.meta.isValid
// //             return (
// //               <Field data-invalid={isInvalid} className="gap-2">
// //                 <FieldLabel htmlFor={field.name}>
// //                   License Number
// //                 </FieldLabel>
// //                 <Input
// //                   id={field.name}
// //                   name={field.name}
// //                   value={field.state.value}
// //                   onChange={(e) => field.handleChange(e.target.value)}
// //                   onBlur={field.handleBlur}
// //                   placeholder="GUIDE-2024-001"
// //                   aria-invalid={isInvalid}
// //                 />
// //                 {isInvalid && (
// //                   <FieldError errors={field.state.meta.errors} />
// //                 )}
// //               </Field>
// //             )
// //           }}
// //         </form.Field>

// //         {/* Years of Experience */}
// //         <form.Field name="yearsExperience">
// //           {(field) => {
// //             const isInvalid =
// //               field.state.meta.isTouched && !field.state.meta.isValid
// //             return (
// //               <Field data-invalid={isInvalid} className="gap-2">
// //                 <FieldLabel htmlFor={field.name}>
// //                   Years of Experience
// //                 </FieldLabel>
// //                 <Input
// //                   id={field.name}
// //                   name={field.name}
// //                   type="number"
// //                   min={0}
// //                   value={field.state.value}
// //                   onChange={(e) =>
// //                     field.handleChange(Number(e.target.value))
// //                   }
// //                   onBlur={field.handleBlur}
// //                   aria-invalid={isInvalid}
// //                 />
// //                 {isInvalid && (
// //                   <FieldError errors={field.state.meta.errors} />
// //                 )}
// //               </Field>
// //             )
// //           }}
// //         </form.Field>

// //         {/* Base Location */}
// //         <form.Field name="baseLocation">
// //           {(field) => {
// //             const isInvalid =
// //               field.state.meta.isTouched && !field.state.meta.isValid
// //             return (
// //               <Field data-invalid={isInvalid} className="gap-2">
// //                 <FieldLabel htmlFor={field.name}>Base Location</FieldLabel>
// //                 <Input
// //                   id={field.name}
// //                   name={field.name}
// //                   value={field.state.value}
// //                   onChange={(e) => field.handleChange(e.target.value)}
// //                   onBlur={field.handleBlur}
// //                   placeholder="Dhaka"
// //                   aria-invalid={isInvalid}
// //                 />
// //                 {isInvalid && (
// //                   <FieldError errors={field.state.meta.errors} />
// //                 )}
// //               </Field>
// //             )
// //           }}
// //         </form.Field>

// //         {/* Hourly Rate */}
// //         <form.Field name="hourlyRate">
// //           {(field) => {
// //             const isInvalid =
// //               field.state.meta.isTouched && !field.state.meta.isValid
// //             return (
// //               <Field data-invalid={isInvalid} className="gap-2">
// //                 <FieldLabel htmlFor={field.name}>
// //                   Hourly Rate (৳)
// //                 </FieldLabel>
// //                 <Input
// //                   id={field.name}
// //                   name={field.name}
// //                   type="number"
// //                   min={0}
// //                   value={field.state.value}
// //                   onChange={(e) =>
// //                     field.handleChange(Number(e.target.value))
// //                   }
// //                   onBlur={field.handleBlur}
// //                   aria-invalid={isInvalid}
// //                 />
// //                 {isInvalid && (
// //                   <FieldError errors={field.state.meta.errors} />
// //                 )}
// //               </Field>
// //             )
// //           }}
// //         </form.Field>

// //         {/* Languages */}
// //         <Field className="gap-2">
// //           <FieldLabel>Languages</FieldLabel>
// //           <FieldDescription>
// //             Select all languages you can communicate in
// //           </FieldDescription>

// //           {/* Selected */}
// //           {selectedLanguages.length > 0 && (
// //             <div className="flex flex-wrap gap-2 mb-2">
// //               {selectedLanguages.map((lang) => (
// //                 <Badge
// //                   key={lang}
// //                   variant="secondary"
// //                   className="gap-1 pr-1 cursor-pointer"
// //                   onClick={() => toggleLanguage(lang)}
// //                 >
// //                   {lang}
// //                   <X className="h-3 w-3" />
// //                 </Badge>
// //               ))}
// //             </div>
// //           )}

// //           {/* Options */}
// //           <div className="flex flex-wrap gap-2">
// //             {LANGUAGE_OPTIONS.filter(
// //               (l) => !selectedLanguages.includes(l)
// //             ).map((lang) => (
// //               <Badge
// //                 key={lang}
// //                 variant="outline"
// //                 className="cursor-pointer hover:bg-muted"
// //                 onClick={() => toggleLanguage(lang)}
// //               >
// //                 + {lang}
// //               </Badge>
// //             ))}
// //           </div>
// //         </Field>

// //         {/* Bio */}
// //         <form.Field name="bio">
// //           {(field) => {
// //             const isInvalid =
// //               field.state.meta.isTouched && !field.state.meta.isValid
// //             return (
// //               <Field data-invalid={isInvalid} className="gap-2">
// //                 <FieldLabel htmlFor={field.name}>Bio</FieldLabel>
// //                 <Textarea
// //                   id={field.name}
// //                   name={field.name}
// //                   value={field.state.value}
// //                   onChange={(e) => field.handleChange(e.target.value)}
// //                   onBlur={field.handleBlur}
// //                   placeholder="Tell tourists about yourself, your expertise, and what makes you a great guide..."
// //                   rows={5}
// //                   aria-invalid={isInvalid}
// //                 />
// //                 {isInvalid && (
// //                   <FieldError errors={field.state.meta.errors} />
// //                 )}
// //               </Field>
// //             )
// //           }}
// //         </form.Field>

// //         {/* Actions */}
// //         <div className="flex justify-end gap-3 pt-2">
// //           <Button
// //             type="button"
// //             variant="outline"
// //             onClick={onCancel}
// //             disabled={isPending}
// //           >
// //             Cancel
// //           </Button>
// //           <Button type="submit" disabled={isPending}>
// //             {isPending && <Spinner className="mr-2 h-4 w-4" />}
// //             Save Changes
// //           </Button>
// //         </div>
// //       </FieldGroup>
// //     </form>
// //   )
// // }


// // "use client"

// // import { useState, useRef } from "react"
// // import { useForm } from "@tanstack/react-form"
// // import { toast } from "sonner"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// // import {
// //   Field,
// //   FieldError,
// //   FieldGroup,
// //   FieldLabel,
// //   FieldDescription,
// // } from "@/components/ui/field"
// // import { Textarea } from "@/components/ui/textarea"
// // import { Badge } from "@/components/ui/badge"
// // import { Spinner } from "@/components/ui/spinner"
// // import { Camera, X } from "lucide-react"
// // import { useUpdateGuideProfile } from "@/hooks"
// // import { LANGUAGE_OPTIONS } from "@/constants/guide.constants"
// // import type { GuideProfile } from "@/types/guide.type"

// // interface ProfileFormProps {
// //   profile: GuideProfile
// //   onCancel: () => void
// //   onSuccess: () => void
// // }

// // export function ProfileForm({
// //   profile,
// //   onCancel,
// //   onSuccess,
// // }: ProfileFormProps) {
// //   const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
// //     profile.languages || []
// //   )
// //   const [imagePreview, setImagePreview] = useState<string | null>(null)
// //   const [imageFile, setImageFile] = useState<File | null>(null)

// //   const fileInputRef = useRef<HTMLInputElement>(null)

// //   const { mutate: update, isPending } = useUpdateGuideProfile()

// //   const form = useForm({
// //     defaultValues: {
// //       licenseNumber: profile.licenseNumber || "",
// //       yearsExperience: profile.yearsExperience || 0,
// //       baseLocation: profile.baseLocation || "",
// //       bio: profile.bio || "",
// //       hourlyRate: profile.hourlyRate || 0,
// //     },
// //     onSubmit: ({ value }) => {
// //       // Build FormData
// //       const formData = new FormData()

// //       if (value.licenseNumber) formData.append("licenseNumber", value.licenseNumber)
// //       formData.append("yearsExperience", String(value.yearsExperience || 0))
// //       formData.append("languages", JSON.stringify(selectedLanguages))
// //       if (value.baseLocation) formData.append("baseLocation", value.baseLocation)
// //       if (value.bio) formData.append("bio", value.bio)
// //       if (value.hourlyRate) formData.append("hourlyRate", String(value.hourlyRate))

// //       // Profile image
// //       if (imageFile) {
// //         formData.append("profileImage", imageFile)
// //       }

// //       // update(formData, {
// //       //   onSuccess: () => {
// //       //     toast.success("Profile updated successfully")
// //       //     onSuccess()
// //       //   },
// //       //   onError: (err) => {
// //       //     toast.error("Update failed", {
// //       //       description: err.message || "Something went wrong",
// //       //     })
// //       //   },
// //       // })
// //       update(formData, {
// //   onSuccess: () => {
// //     console.log("✅ 1. Mutation onSuccess called")
// //     toast.success("Profile updated successfully")
// //     onSuccess()
// //     console.log("✅ 2. Parent onSuccess called")
// //   },
// //   onError: (err) => {
// //     console.log("❌ Error:", err)
// //   },
// // })
// //     },
// //   })

// //   const toggleLanguage = (lang: string) => {
// //     setSelectedLanguages((prev) =>
// //       prev.includes(lang)
// //         ? prev.filter((l) => l !== lang)
// //         : [...prev, lang]
// //     )
// //   }

// //   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0]
// //     if (!file) return

// //     // Validate size (max 5MB)
// //     if (file.size > 5 * 1024 * 1024) {
// //       toast.error("Image too large", {
// //         description: "Please select an image under 5MB",
// //       })
// //       return
// //     }

// //     // Validate type
// //     if (!file.type.startsWith("image/")) {
// //       toast.error("Invalid file type", {
// //         description: "Please select an image file",
// //       })
// //       return
// //     }

// //     setImageFile(file)
// //     setImagePreview(URL.createObjectURL(file))
// //   }

// //   const removeImage = () => {
// //     setImageFile(null)
// //     if (imagePreview) URL.revokeObjectURL(imagePreview)
// //     setImagePreview(null)
// //     if (fileInputRef.current) fileInputRef.current.value = ""
// //   }

// //   return (
// //     <form
// //       onSubmit={(e) => {
// //         e.preventDefault()
// //         form.handleSubmit()
// //       }}
// //     >
// //       <FieldGroup className="gap-5">
// //         {/* Profile Image Upload */}
// //         <Field className="gap-2">
// //           <FieldLabel>Profile Image</FieldLabel>
// //           <FieldDescription>
// //             Upload a clear photo of yourself (max 5MB)
// //           </FieldDescription>

// //           <div className="flex items-center gap-4 mt-2">
// //             <div className="relative">
// //               <Avatar className="h-24 w-24">
// //                 <AvatarImage
// //                   src={imagePreview || profile.user.imageUrl}
// //                   alt={profile.user.name}
// //                 />
// //                 <AvatarFallback className="text-2xl">
// //                   {profile.user.name?.charAt(0)?.toUpperCase() || "G"}
// //                 </AvatarFallback>
// //               </Avatar>

// //               {imagePreview && (
// //                 <button
// //                   type="button"
// //                   onClick={removeImage}
// //                   className="absolute -top-1 -right-1 bg-destructive text-white rounded-full p-1 shadow-md hover:bg-destructive/90"
// //                   aria-label="Remove image"
// //                 >
// //                   <X className="h-3 w-3" />
// //                 </button>
// //               )}
// //             </div>

// //             <div className="flex-1">
// //               <input
// //                 ref={fileInputRef}
// //                 type="file"
// //                 accept="image/*"
// //                 onChange={handleImageChange}
// //                 className="hidden"
// //                 id="profileImage"
// //               />
// //               <Button
// //                 type="button"
// //                 variant="outline"
// //                 onClick={() => fileInputRef.current?.click()}
// //               >
// //                 <Camera className="mr-2 h-4 w-4" />
// //                 {imagePreview ? "Change Image" : "Upload Image"}
// //               </Button>
// //             </div>
// //           </div>
// //         </Field>

// //         {/* License Number */}
// //         <form.Field name="licenseNumber">
// //           {(field) => {
// //             const isInvalid =
// //               field.state.meta.isTouched && !field.state.meta.isValid
// //             return (
// //               <Field data-invalid={isInvalid} className="gap-2">
// //                 <FieldLabel htmlFor={field.name}>License Number</FieldLabel>
// //                 <Input
// //                   id={field.name}
// //                   name={field.name}
// //                   value={field.state.value}
// //                   onChange={(e) => field.handleChange(e.target.value)}
// //                   onBlur={field.handleBlur}
// //                   placeholder="GUIDE-2024-001"
// //                   aria-invalid={isInvalid}
// //                 />
// //                 {isInvalid && (
// //                   <FieldError errors={field.state.meta.errors} />
// //                 )}
// //               </Field>
// //             )
// //           }}
// //         </form.Field>

// //         {/* Years of Experience */}
// //         <form.Field name="yearsExperience">
// //           {(field) => (
// //             <Field className="gap-2">
// //               <FieldLabel htmlFor={field.name}>
// //                 Years of Experience
// //               </FieldLabel>
// //               <Input
// //                 id={field.name}
// //                 name={field.name}
// //                 type="number"
// //                 min={0}
// //                 value={field.state.value}
// //                 onChange={(e) => field.handleChange(Number(e.target.value))}
// //                 onBlur={field.handleBlur}
// //               />
// //             </Field>
// //           )}
// //         </form.Field>

// //         {/* Base Location */}
// //         <form.Field name="baseLocation">
// //           {(field) => (
// //             <Field className="gap-2">
// //               <FieldLabel htmlFor={field.name}>Base Location</FieldLabel>
// //               <Input
// //                 id={field.name}
// //                 name={field.name}
// //                 value={field.state.value}
// //                 onChange={(e) => field.handleChange(e.target.value)}
// //                 onBlur={field.handleBlur}
// //                 placeholder="Dhaka"
// //               />
// //             </Field>
// //           )}
// //         </form.Field>

// //         {/* Hourly Rate */}
// //         <form.Field name="hourlyRate">
// //           {(field) => (
// //             <Field className="gap-2">
// //               <FieldLabel htmlFor={field.name}>Hourly Rate (৳)</FieldLabel>
// //               <Input
// //                 id={field.name}
// //                 name={field.name}
// //                 type="number"
// //                 min={0}
// //                 value={field.state.value}
// //                 onChange={(e) => field.handleChange(Number(e.target.value))}
// //                 onBlur={field.handleBlur}
// //               />
// //             </Field>
// //           )}
// //         </form.Field>

// //         {/* Languages */}
// //         <Field className="gap-2">
// //           <FieldLabel>Languages</FieldLabel>
// //           <FieldDescription>
// //             Select all languages you can communicate in
// //           </FieldDescription>

// //           {selectedLanguages.length > 0 && (
// //             <div className="flex flex-wrap gap-2 mb-2">
// //               {selectedLanguages.map((lang) => (
// //                 <Badge
// //                   key={lang}
// //                   variant="secondary"
// //                   className="gap-1 pr-1 cursor-pointer"
// //                   onClick={() => toggleLanguage(lang)}
// //                 >
// //                   {lang}
// //                   <X className="h-3 w-3" />
// //                 </Badge>
// //               ))}
// //             </div>
// //           )}

// //           <div className="flex flex-wrap gap-2">
// //             {LANGUAGE_OPTIONS.filter(
// //               (l) => !selectedLanguages.includes(l)
// //             ).map((lang) => (
// //               <Badge
// //                 key={lang}
// //                 variant="outline"
// //                 className="cursor-pointer hover:bg-muted"
// //                 onClick={() => toggleLanguage(lang)}
// //               >
// //                 + {lang}
// //               </Badge>
// //             ))}
// //           </div>
// //         </Field>

// //         {/* Bio */}
// //         <form.Field name="bio">
// //           {(field) => (
// //             <Field className="gap-2">
// //               <FieldLabel htmlFor={field.name}>Bio</FieldLabel>
// //               <Textarea
// //                 id={field.name}
// //                 name={field.name}
// //                 value={field.state.value}
// //                 onChange={(e) => field.handleChange(e.target.value)}
// //                 onBlur={field.handleBlur}
// //                 placeholder="Tell tourists about yourself..."
// //                 rows={5}
// //               />
// //             </Field>
// //           )}
// //         </form.Field>

// //         {/* Actions */}
// //         <div className="flex justify-end gap-3 pt-2">
// //           <Button
// //             type="button"
// //             variant="outline"
// //             onClick={onCancel}
// //             disabled={isPending}
// //           >
// //             Cancel
// //           </Button>
// //           <Button type="submit" disabled={isPending}>
// //             {isPending && <Spinner className="mr-2 h-4 w-4" />}
// //             Save Changes
// //           </Button>
// //         </div>
// //       </FieldGroup>
// //     </form>
// //   )
// // }


// "use client"

// import { useState, useRef } from "react"
// import { useForm } from "@tanstack/react-form"
// import { toast } from "sonner"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import {
//   Field,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
//   FieldDescription,
// } from "@/components/ui/field"
// import { Textarea } from "@/components/ui/textarea"
// import { Badge } from "@/components/ui/badge"
// import { Spinner } from "@/components/ui/spinner"
// import { Camera, X } from "lucide-react"
// import { useUpdateGuideProfile } from "@/hooks"
// import { LANGUAGE_OPTIONS } from "@/constants/guide.constants"
// import type { GuideProfile } from "@/types/guide.type"

// interface ProfileFormProps {
//   profile: GuideProfile
//   onCancel: () => void
//   onSuccess: () => void
// }

// export function ProfileForm({
//   profile,
//   onCancel,
//   onSuccess,
// }: ProfileFormProps) {
//   const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
//     profile.languages || []
//   )
//   const [imageFile, setImageFile] = useState<File | null>(null)
//   const [imagePreview, setImagePreview] = useState<string | null>(null)

//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const { mutate: update, isPending } = useUpdateGuideProfile()

//   const form = useForm({
//     defaultValues: {
//       licenseNumber: profile.licenseNumber || "",
//       yearsExperience: profile.yearsExperience || 0,
//       baseLocation: profile.baseLocation || "",
//       bio: profile.bio || "",
//       hourlyRate: profile.hourlyRate || 0,
//     },
//     onSubmit: ({ value }) => {
//       const formData = new FormData()

//       formData.append("licenseNumber", value.licenseNumber || "")
//       formData.append("yearsExperience", String(value.yearsExperience || 0))
//       formData.append("languages", JSON.stringify(selectedLanguages))
//       formData.append("baseLocation", value.baseLocation || "")
//       formData.append("bio", value.bio || "")
//       if (value.hourlyRate) {
//         formData.append("hourlyRate", String(value.hourlyRate))
//       }

//       if (imageFile) {
//         formData.append("profileImage", imageFile)
//       }

//       update(formData, {
//         onSuccess: () => {
//           toast.success("Profile updated successfully")
//           onSuccess()
//         },
//         onError: (err) => {
//           toast.error("Update failed", {
//             description: err.message || "Something went wrong",
//           })
//         },
//       })
//     },
//   })

//   const toggleLanguage = (lang: string) => {
//     setSelectedLanguages((prev) =>
//       prev.includes(lang)
//         ? prev.filter((l) => l !== lang)
//         : [...prev, lang]
//     )
//   }

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (!file) return

//     if (file.size > 5 * 1024 * 1024) {
//       toast.error("Image too large", {
//         description: "Please select an image under 5MB",
//       })
//       return
//     }

//     if (!file.type.startsWith("image/")) {
//       toast.error("Invalid file type", {
//         description: "Please select an image file",
//       })
//       return
//     }

//     setImageFile(file)
//     setImagePreview(URL.createObjectURL(file))
//   }

//   const removeImage = () => {
//     setImageFile(null)
//     if (imagePreview) URL.revokeObjectURL(imagePreview)
//     setImagePreview(null)
//     if (fileInputRef.current) fileInputRef.current.value = ""
//   }

//   return (
//     <form
//       onSubmit={(e) => {
//         e.preventDefault()
//         form.handleSubmit()
//       }}
//     >
//       <FieldGroup className="gap-5">
//         {/* Profile Image */}
//         <Field className="gap-2">
//           <FieldLabel>Profile Image</FieldLabel>
//           <FieldDescription>
//             Upload a clear photo (max 5MB)
//           </FieldDescription>

//           <div className="flex items-center gap-4 mt-2">
//             <div className="relative">
//               <Avatar className="h-24 w-24">
//                 <AvatarImage
//                   src={imagePreview || profile.user.imageUrl}
//                   alt={profile.user.name}
//                 />
//                 <AvatarFallback className="text-2xl">
//                   {profile.user.name?.charAt(0)?.toUpperCase() || "G"}
//                 </AvatarFallback>
//               </Avatar>

//               {imagePreview && (
//                 <button
//                   type="button"
//                   onClick={removeImage}
//                   className="absolute -top-1 -right-1 bg-destructive text-white rounded-full p-1 shadow-md hover:bg-destructive/90"
//                   aria-label="Remove image"
//                 >
//                   <X className="h-3 w-3" />
//                 </button>
//               )}
//             </div>

//             <div className="flex-1">
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="hidden"
//                 id="profileImage"
//               />
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => fileInputRef.current?.click()}
//               >
//                 <Camera className="mr-2 h-4 w-4" />
//                 {imagePreview ? "Change Image" : "Upload Image"}
//               </Button>
//             </div>
//           </div>
//         </Field>

//         {/* License Number */}
//         <form.Field name="licenseNumber">
//           {(field) => (
//             <Field className="gap-2">
//               <FieldLabel htmlFor={field.name}>License Number</FieldLabel>
//               <Input
//                 id={field.name}
//                 name={field.name}
//                 value={field.state.value}
//                 onChange={(e) => field.handleChange(e.target.value)}
//                 onBlur={field.handleBlur}
//                 placeholder="GUIDE-2024-001"
//               />
//             </Field>
//           )}
//         </form.Field>

//         {/* Years of Experience */}
//         <form.Field name="yearsExperience">
//           {(field) => (
//             <Field className="gap-2">
//               <FieldLabel htmlFor={field.name}>
//                 Years of Experience
//               </FieldLabel>
//               <Input
//                 id={field.name}
//                 name={field.name}
//                 type="number"
//                 min={0}
//                 value={field.state.value}
//                 onChange={(e) => field.handleChange(Number(e.target.value))}
//                 onBlur={field.handleBlur}
//               />
//             </Field>
//           )}
//         </form.Field>

//         {/* Base Location */}
//         <form.Field name="baseLocation">
//           {(field) => (
//             <Field className="gap-2">
//               <FieldLabel htmlFor={field.name}>Base Location</FieldLabel>
//               <Input
//                 id={field.name}
//                 name={field.name}
//                 value={field.state.value}
//                 onChange={(e) => field.handleChange(e.target.value)}
//                 onBlur={field.handleBlur}
//                 placeholder="Dhaka"
//               />
//             </Field>
//           )}
//         </form.Field>

//         {/* Hourly Rate */}
//         <form.Field name="hourlyRate">
//           {(field) => (
//             <Field className="gap-2">
//               <FieldLabel htmlFor={field.name}>Hourly Rate (৳)</FieldLabel>
//               <Input
//                 id={field.name}
//                 name={field.name}
//                 type="number"
//                 min={0}
//                 value={field.state.value}
//                 onChange={(e) => field.handleChange(Number(e.target.value))}
//                 onBlur={field.handleBlur}
//               />
//             </Field>
//           )}
//         </form.Field>

//         {/* Languages */}
//         <Field className="gap-2">
//           <FieldLabel>Languages</FieldLabel>
//           <FieldDescription>Select languages</FieldDescription>

//           {selectedLanguages.length > 0 && (
//             <div className="flex flex-wrap gap-2 mb-2">
//               {selectedLanguages.map((lang) => (
//                 <Badge
//                   key={lang}
//                   variant="secondary"
//                   className="gap-1 pr-1 cursor-pointer"
//                   onClick={() => toggleLanguage(lang)}
//                 >
//                   {lang}
//                   <X className="h-3 w-3" />
//                 </Badge>
//               ))}
//             </div>
//           )}

//           <div className="flex flex-wrap gap-2">
//             {LANGUAGE_OPTIONS.filter(
//               (l) => !selectedLanguages.includes(l)
//             ).map((lang) => (
//               <Badge
//                 key={lang}
//                 variant="outline"
//                 className="cursor-pointer hover:bg-muted"
//                 onClick={() => toggleLanguage(lang)}
//               >
//                 + {lang}
//               </Badge>
//             ))}
//           </div>
//         </Field>

//         {/* Bio */}
//         <form.Field name="bio">
//           {(field) => (
//             <Field className="gap-2">
//               <FieldLabel htmlFor={field.name}>Bio</FieldLabel>
//               <Textarea
//                 id={field.name}
//                 name={field.name}
//                 value={field.state.value}
//                 onChange={(e) => field.handleChange(e.target.value)}
//                 onBlur={field.handleBlur}
//                 placeholder="Tell tourists about yourself..."
//                 rows={5}
//               />
//             </Field>
//           )}
//         </form.Field>

//         {/* Actions */}
//         <div className="flex justify-end gap-3 pt-2">
//           <Button
//             type="button"
//             variant="outline"
//             onClick={onCancel}
//             disabled={isPending}
//           >
//             Cancel
//           </Button>
//           <Button type="submit" disabled={isPending}>
//             {isPending && <Spinner className="mr-2 h-4 w-4" />}
//             Save Changes
//           </Button>
//         </div>
//       </FieldGroup>
//     </form>
//   )
// }



"use client"

import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { X } from "lucide-react"
import { useUpdateGuideProfile } from "@/hooks"
import { LANGUAGE_OPTIONS } from "@/constants/guide.constants"
import type { GuideProfile } from "@/types/guide.type"

interface ProfileFormProps {
  profile: GuideProfile
  onCancel: () => void
  onSuccess: () => void
}

export function ProfileForm({
  profile,
  onCancel,
  onSuccess,
}: ProfileFormProps) {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    profile.languages || []
  )

  const { mutate: update, isPending } = useUpdateGuideProfile()

  const form = useForm({
    defaultValues: {
      licenseNumber: profile.licenseNumber || "",
      yearsExperience: profile.yearsExperience || 0,
      baseLocation: profile.baseLocation || "",
      bio: profile.bio || "",
      hourlyRate: profile.hourlyRate || 0,
    },
    onSubmit: ({ value }) => {
      update(
        {
          licenseNumber: value.licenseNumber,
          yearsExperience: Number(value.yearsExperience),
          languages: selectedLanguages,
          baseLocation: value.baseLocation,
          bio: value.bio,
          hourlyRate: value.hourlyRate ? Number(value.hourlyRate) : null,
        },
        {
          onSuccess: () => {
            toast.success("Profile updated successfully")
            onSuccess()
          },
          onError: (err: any) => {
            toast.error("Update failed", {
              description: err.message || "Something went wrong",
            })
          },
        }
      )
    },
  })

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang)
        ? prev.filter((l) => l !== lang)
        : [...prev, lang]
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup className="gap-5">
        {/* License Number */}
        <form.Field name="licenseNumber">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid} className="gap-2">
                <FieldLabel htmlFor={field.name}>License Number</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="GUIDE-2024-001"
                  aria-invalid={isInvalid}
                />
                {isInvalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            )
          }}
        </form.Field>

        {/* Years of Experience */}
        <form.Field name="yearsExperience">
          {(field) => (
            <Field className="gap-2">
              <FieldLabel htmlFor={field.name}>
                Years of Experience
              </FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                min={0}
                value={field.state.value}
                onChange={(e) =>
                  field.handleChange(Number(e.target.value))
                }
                onBlur={field.handleBlur}
              />
            </Field>
          )}
        </form.Field>

        {/* Base Location */}
        <form.Field name="baseLocation">
          {(field) => (
            <Field className="gap-2">
              <FieldLabel htmlFor={field.name}>Base Location</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Dhaka"
              />
            </Field>
          )}
        </form.Field>

        {/* Hourly Rate */}
        <form.Field name="hourlyRate">
          {(field) => (
            <Field className="gap-2">
              <FieldLabel htmlFor={field.name}>Hourly Rate (৳)</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                min={0}
                value={field.state.value}
                onChange={(e) =>
                  field.handleChange(Number(e.target.value))
                }
                onBlur={field.handleBlur}
              />
            </Field>
          )}
        </form.Field>

        {/* Languages */}
        <Field className="gap-2">
          <FieldLabel>Languages</FieldLabel>
          <FieldDescription>
            Select all languages you can communicate in
          </FieldDescription>

          {selectedLanguages.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedLanguages.map((lang) => (
                <Badge
                  key={lang}
                  variant="secondary"
                  className="gap-1 pr-1 cursor-pointer"
                  onClick={() => toggleLanguage(lang)}
                >
                  {lang}
                  <X className="h-3 w-3" />
                </Badge>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {LANGUAGE_OPTIONS.filter(
              (l) => !selectedLanguages.includes(l)
            ).map((lang) => (
              <Badge
                key={lang}
                variant="outline"
                className="cursor-pointer hover:bg-muted"
                onClick={() => toggleLanguage(lang)}
              >
                + {lang}
              </Badge>
            ))}
          </div>
        </Field>

        {/* Bio */}
        <form.Field name="bio">
          {(field) => (
            <Field className="gap-2">
              <FieldLabel htmlFor={field.name}>Bio</FieldLabel>
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Tell tourists about yourself..."
                rows={5}
              />
            </Field>
          )}
        </form.Field>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending && <Spinner className="mr-2 h-4 w-4" />}
            Save Changes
          </Button>
        </div>
      </FieldGroup>
    </form>
  )
}