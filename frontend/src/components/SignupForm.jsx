



// import { useState } from "react";
// import axiosInstance from "../api/axiosInstance";

// export default function SignupForm({ setIsLogin }) {  
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState({ name: "", email: "", password: "" });

//     const handleSignup = async (e) => {
//         e.preventDefault();

//         // Validate email and name
//         if (!email.endsWith("@gmail.com")) {
//             setError({ ...error, email: "Email must end with @gmail.com" });
//             return;
//         }
//         if (name.length < 6) {
//             setError({ ...error, name: "Name must be at least 6 characters long" });
//             return;
//         }

//         setLoading(true);
//         try {
//             const response = await axiosInstance.post("/auth/register", { name, email, password });
//             console.log("Signup successful:", response.data);
//             setIsLogin(true); 
//         } catch (error) {
//             console.error("Signup failed:", error.response ? error.response.data : error.message);
//             alert("Signup failed. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handleSignup}>
//             <div className="space-y-4">
//                 <div className="space-y-2">
//                     <label htmlFor="name" className="block text-sm font-medium">Name</label>
//                     <input
//                         id="name"
//                         type="text"
//                         className={`w-full px-3 py-2 border rounded ${error.name ? "border-red-500" : ""}`}
//                         placeholder="Enter your Name"
//                         required
//                         value={name}
//                         onChange={(e) => {
//                             setName(e.target.value);
//                             setError({ ...error, name: "" });
//                         }}
//                     />
//                     {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
//                 </div>
//                 <div className="space-y-2">
//                     <label htmlFor="email" className="block text-sm font-medium">Email</label>
//                     <input
//                         id="email"
//                         type="email"
//                         className={`w-full px-3 py-2 border rounded ${error.email ? "border-red-500" : ""}`}
//                         placeholder="Enter your Email"
//                         required
//                         value={email}
//                         onChange={(e) => {
//                             setEmail(e.target.value);
//                             setError({ ...error, email: "" });
//                         }}
//                     />
//                     {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
//                 </div>
//                 <div className="space-y-2">
//                     <label htmlFor="password" className="block text-sm font-medium">Password</label>
//                     <input
//                         id="password"
//                         type="password"
//                         className="w-full px-3 py-2 border rounded"
//                         placeholder="Enter your Password"
//                         required
//                         min={8}
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>
//             </div>
//             <button type="submit" className="w-full mt-4 bg-blue-600 text-white py-2 rounded" disabled={loading}>
//                 {loading ? "Signing up..." : "Sign Up"}
//             </button>
//         </form>
//     );
// }






import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function SignupForm({ setIsLogin }) {  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();

        // Validate email format
        if (!email.endsWith("@gmail.com")) {
            setError({ ...error, email: "Email must end with @gmail.com" });
            return;
        }

        // Validate name length
        if (name.length < 6) {
            setError({ ...error, name: "Name must be at least 6 characters long" });
            return;
        }

        // Validate password length and strength
        if (password.length < 8) {
            setError({ ...error, password: "Password must be at least 8 characters long" });
            return;
        }

        // Validate password confirmation
        if (password !== confirmPassword) {
            setError({ ...error, confirmPassword: "Passwords do not match" });
            return;
        }

        setLoading(true);
        try {
            const response = await axiosInstance.post("/auth/register", { name, email, password });
            console.log("Signup successful:", response.data);
            setIsLogin(true); 
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
                {/* Name Input */}
                <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">Name</label>
                    <input
                        id="name"
                        type="text"
                        className={`w-full px-3 py-2 border rounded ${error.name ? "border-red-500" : ""}`}
                        placeholder="Enter your Name"
                        required
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setError({ ...error, name: "" });
                        }}
                    />
                    {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                    <input
                        id="email"
                        type="email"
                        className={`w-full px-3 py-2 border rounded ${error.email ? "border-red-500" : ""}`}
                        placeholder="Enter your Email"
                        required
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError({ ...error, email: "" });
                        }}
                    />
                    {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium">Password</label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className={`w-full px-3 py-2 border rounded ${error.password ? "border-red-500" : ""}`}
                            placeholder="Enter your Password"
                            required
                            minLength={8}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError({ ...error, password: "" });
                            }}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-2 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
                </div>

                {/* Confirm Password Input */}
                <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
                    <div className="relative">
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            className={`w-full px-3 py-2 border rounded ${error.confirmPassword ? "border-red-500" : ""}`}
                            placeholder="Confirm your Password"
                            required
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setError({ ...error, confirmPassword: "" });
                            }}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-2 text-gray-500"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {error.confirmPassword && <p className="text-red-500 text-sm">{error.confirmPassword}</p>}
                </div>
            </div>

            <button type="submit" className="w-full mt-4 bg-blue-600 text-white py-2 rounded" disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
            </button>
        </form>
    );
}
