import { jwtDecode } from "jwt-decode";

class TokenService {
  static setToken(token: string): void {
    
    localStorage.setItem("token", token);
  }

  static getToken(): string | null {
    return localStorage.getItem("token");
  }

  static decodeToken(): { id: string; role: string , memberId : string } | null {
    const token = this.getToken();
    if (!token) return null;

    try {
        const decoded = jwtDecode<{ id: string; role: string; memberId:string }>(token);
      
        return decoded;
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  }

  static getRole(): string | null {
    const decodedRole = this.decodeToken()?.role || null;
    if (decodedRole) return decodedRole;
    // Fallback to localStorage for static testing
    return localStorage.getItem("role");
  }

  static setRole(role: string): void {
    localStorage.setItem("role", role);
  }

  static getMemberId() : string | null {
    return this.decodeToken()?.memberId || null;
  }

  static getUserId(): string | null {
    const decodedId = this.decodeToken()?.id || null;
    if (decodedId) return decodedId;
    // Fallback to localStorage for static testing
    return localStorage.getItem("userId");
  }

  static setUserId(userId: string): void {
    localStorage.setItem("userId", userId);
  }

  static removeToken(): void {
    localStorage.removeItem("token");
  }
}

export default TokenService;
