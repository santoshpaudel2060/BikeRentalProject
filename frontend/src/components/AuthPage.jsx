
import { useState } from "react";
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import { useNavigate } from "react-router-dom";



export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const navigate = useNavigate()
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded shadow-md">
                <div className="p-4">
                    <h2 className="text-xl font-bold text-center">
                        {isForgotPassword ? "Forgot Password" : isLogin ? "Login" : "Sign Up"}
                    </h2>
                    <p className="text-sm text-center text-gray-600">
                        {isForgotPassword
                            ? "Reset your password"
                            : isLogin
                            ? "Welcome back! Please login to your account."
                            : "Create a new account"}
                    </p>
                </div>
                <div className="p-4">
                    {isForgotPassword ? (
                        <ForgotPasswordForm />
                    ) : isLogin ? (
                        <LoginForm navigate={navigate} setIsForgotPassword={setIsForgotPassword} />
                    ) : (
                        <SignupForm setIsLogin={setIsLogin} />
                    )}
                </div>
                <div className="p-4 flex justify-center">
                    <button
                        className="text-blue-600 underline"
                        onClick={() => {
                            setIsForgotPassword(false);
                            setIsLogin(!isLogin);
                        }}
                    >
                        {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
                    </button>
                </div>
            </div>
        </div>
    );
}
