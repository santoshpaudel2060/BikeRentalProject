



import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function SignupForm({ setIsLogin }) {  // Accept setIsLogin as a prop
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosInstance.post("/auth/register", { name, email, password });
            console.log("Signup successful:", response.data);
            setIsLogin(true);  // Set isLogin to true to show the login form
        } catch (error) {
            console.error("Signup failed:", error.response ? error.response.data : error.message);
            alert("Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <div className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">Name</label>
                    <input
                        id="name"
                        type="text"
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter your Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
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
                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium">Password</label>
                    <input
                        id="password"
                        type="password"
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter your Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <button type="submit" className="w-full mt-4 bg-blue-600 text-white py-2 rounded" disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
            </button>
        </form>
    );
}
