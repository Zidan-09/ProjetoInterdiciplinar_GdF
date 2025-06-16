// utils/auth.ts

export function saveToken(token: string) {
    if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', token);
    }
}
  
export function getToken(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('auth_token');
    }
    return null;
}  