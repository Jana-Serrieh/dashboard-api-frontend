const users_url = "http://localhost/dashboard-backend/get_users.php";

export async function fetchUsers() {
    const response = await fetch(users_url);

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    return await response.json();
}