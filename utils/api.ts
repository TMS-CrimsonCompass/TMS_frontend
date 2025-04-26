import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://ccmain-hzcbg5c8hzh4dwfc.centralus-01.azurewebsites.net/api";

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const session = await getSession();

  // Check if accessToken exists
  if (!session?.user?.accessToken) {
    throw new Error("User is not authenticated");
  }

  // Check if the token has expired
  // const isTokenExpired = (token: string) => {
  //   const payload = JSON.parse(atob(token.split(".")[1]));
  //   return payload.exp * 1000 < Date.now(); // Compare expiration time with current time
  // };

  // if (isTokenExpired(session.user.accessToken)) {
  //   throw new Error("Access token has expired");
  // }
  
  const headers = {
    "Content-Type": "application/json",
    ...(session?.user?.accessToken && { 
      Authorization: `Bearer ${session.user.accessToken}` 
    }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "An error occurred while fetching data");
  }

  return response.json();
}

export const api = {
  // Auth endpoints
  auth: {
    register: (userData: { 
      firstName: string; 
      lastName: string; 
      email: string; 
      password: string;
    }) => 
      fetchWithAuth("/api/users/register", {
        method: "POST",
        body: JSON.stringify(userData),
      }),
  },
  
  // Tours endpoints
  tours: {
    getAll: () => fetchWithAuth("/tours"),
    getById: (id: string) => fetchWithAuth(`/tours/${id}`),
  },
  
  // Bookings endpoints
  bookings: {
    getMyBookings: () => fetchWithAuth("/bookings/my-bookings"),
    createBooking: (bookingData: any) => 
      fetchWithAuth("/bookings", {
        method: "POST",
        body: JSON.stringify(bookingData),
      }),
  },
  
  // User profile
  profile: {
    get: () => fetchWithAuth("/users/profile"),
    update: (profileData: any) => 
      fetchWithAuth("/users/profile", {
        method: "PUT",
        body: JSON.stringify(profileData),
      }),
  },
};