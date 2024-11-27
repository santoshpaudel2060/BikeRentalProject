import { useState } from "react";
import PasswordInput from "./PasswordInput";
import axiosInstance from "../api/axiosInstance"; // Import the axios instance

export default function LoginForm({ navigate, setIsForgotPassword }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); // To display error messages

    // Handle form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(""); // Clear previous errors

        try {
            const response = await axiosInstance.post("/auth/login", { email, password });
            console.log("Login successful:", response.data);
            // Store token in localStorage or handle login logic
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.userId);
            // Navigate to Home page immediately after login
            navigate("/");  // Redirect to the home page

            window.location.reload();  // Optional: You can reload the page to update the app state, but this isn't always necessary

        } catch (error) {
            setLoading(false);
            console.error("Login failed:", error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data.message : "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleLogin} className="max-w-md mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            
            {/* Display error message if any */}
            {error && <div className="mb-4 text-red-600">{error}</div>}

            <div className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                    <input
                        id="email"
                        type="email"
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter your Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <PasswordInput
                    id="password"
                    label="Password"
                    value={password}
                    setValue={setPassword}
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded"
                disabled={loading}
            >
                {loading ? "Logging in..." : "Login"}
            </button>

            {/* Forgot Password link */}
            <button
                type="button"
                className="w-full mt-2 text-blue-600 underline"
                onClick={() => setIsForgotPassword(true)}
            >
                Forgot password?
            </button>
        </form>
    );
}
