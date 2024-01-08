
const createUserAsync = async (user) => {
    return await fetch("/api/User/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });
}

export { createUserAsync }