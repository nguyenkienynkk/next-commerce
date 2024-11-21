// Utility functions for cookies (separate server-side and client-side logic)
export function useUtils() {
    function getCookieOnClient(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    async function getCookieOnServer(name) {
        if (typeof window === 'undefined') {
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            const { cookies } = require('next/headers');
            const cookieStore = await cookies();
            return cookieStore.get(name)?.value || null;
        }
        return null;
    }

    async function getCookie(name) {
        if (typeof window === 'undefined') {
            // Server-side logic
            return await getCookieOnServer(name);
        } else {
            // Client-side logic
            return getCookieOnClient(name);
        }
    }

    return {
        getCookieOnServer,
        getCookieOnClient,
        getCookie
    };
}
