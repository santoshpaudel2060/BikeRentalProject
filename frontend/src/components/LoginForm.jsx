





import { useState } from "react";
import PasswordInput from "./PasswordInput";
import axiosInstance from "../api/axiosInstance"; // Import the axios instance

/**
 * LoginForm component to handle user login
 *
 * @param {function} navigate - React Router's navigate function to redirect
 * @param {function} setIsForgotPassword - Function to set the state of ForgotPassword component
 *
 * @returns {ReactElement} - The LoginForm component
 */

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

            // Store token and user data in localStorage
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("userEmail", response.data.email);
            localStorage.setItem('userName', response.data.userName);
            localStorage.setItem("isAdmin", response.data.admin); // Storing admin status
            console.log("Admin Status:", response.data);
            // Navigate based on the admin status
            if (response.data.admin) {
                navigate("/admin-dashboard");  // Redirect to Admin Panel if user is admin
            } else {
                navigate("/");  // Redirect to home page if not an admin
            }

            window.location.reload();  // Optional: Reload the page to update the app state

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
