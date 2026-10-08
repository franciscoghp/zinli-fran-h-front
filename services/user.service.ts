import { API_URL } from "../utils/api";
export const UserLogin = async (user: string) => {
        const response = await fetch(API_URL + "/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: user }),
        });
        return response.json()
}