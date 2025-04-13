// This would connect to your actual backend API
export const ServerConfig = {
    backendUrl : process.env.BACKEND_URL || "http://localhost:8080/api"
}

export const ClientConfig = {
    backendUrl : process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080/api"
}