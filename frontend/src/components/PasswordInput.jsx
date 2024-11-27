import { useState } from "react";

export default function PasswordInput({ id, label, value, setValue }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="space-y-2">
            <label htmlFor={id} className="block text-sm font-medium">{label}</label>
            <div className="relative">
                <input
                    id={id}
                    type={showPassword ? "text" : "password"}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Enter your Password"
                    required
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? "Hide" : "Show"}
                </button>
            </div>
        </div>
    );
}
