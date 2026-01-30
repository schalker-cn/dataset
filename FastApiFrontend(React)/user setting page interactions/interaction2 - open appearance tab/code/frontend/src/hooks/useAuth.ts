import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"

import {
  type UserPublic,
} from "../client"

const isLoggedIn = () => {
  return true;
}

const useAuth = () => {
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const mockUser: UserPublic = {
    email: "ab12cde@tum.de",
    is_active: true,
    is_superuser: false,
    full_name: "test",
    id: "d9d7fca5-cf19-42c3-a9d5-42cfa3510598",
  };

  // Simulating a constant "loaded" state
  const user = mockUser;
  const isLoading = false; // Always false, no API call


  const logout = () => {
    navigate({ to: "/" })
  }

  return {
    logout,
    user,
    isLoading,
    error,
    resetError: () => setError(null),
  }
}

export { isLoggedIn }
export default useAuth
