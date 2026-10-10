// import { ofetch } from "ofetch";

// //const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
// const BASE_URL = "/api/backend"
// const apiClient = ofetch.create({
//     baseURL:BASE_URL,
//     credentials: "include", 

// })

// export default apiClient;

import { ofetch } from "ofetch"

const BASE_URL = "/api/backend"

const apiClient = ofetch.create({
  baseURL: BASE_URL,
  credentials: "include",
  onResponseError({ response }) {
    // Backend error response extract
    const backendMessage =
      response._data?.message ||
      response._data?.error?.message ||
      response.statusText ||
      "Something went wrong"

    const error: any = new Error(backendMessage)
    error.statusCode = response.status
    error.data = response._data
    throw error
  },
})

export default apiClient