
const TOKEN_KEY = "accessToken";

const getTokenFromLocalStorage = () => {
    return sessionStorage.getItem(TOKEN_KEY);
}

const getTokenFromServerAsync = async (user) => {
    const response = await fetch("/api/Token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });

    const data = await response.json();

    if (response.ok === true) {
        sessionStorage.setItem(TOKEN_KEY, data.access_token);
    }

    return data 
}

export { getTokenFromLocalStorage, getTokenFromServerAsync }