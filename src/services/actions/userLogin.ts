// api/auth.js

export const loginUser = async (email: any, password: any) => {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error || "Login failed");
    }

    return responseData;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
