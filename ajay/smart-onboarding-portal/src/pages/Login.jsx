import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Card, CardContent } from '../components/ui/card';
import { AlertCircle, Facebook, Linkedin } from 'lucide-react';
import { useOnboarding } from '../context/OnboardingContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useOnboarding();

    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.post('http://localhost:5001/api/users/login', {
                email: form.email,
                password: form.password,
            });

            setLoading(false);
            login(data);
            navigate('/onboarding/personal');
        } catch (error) {
            setLoading(false);
            setError(error.response?.data?.message || "Invalid email or password.");
        }
    };

    const isFormValid = form.email && form.password.length >= 8;

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#6da0c2] p-4">
            <Card className="w-full max-w-md bg-white border-none shadow-xl rounded-lg overflow-hidden">
                <CardContent className="p-8">
                    <h2 className="text-xl font-bold text-gray-700 text-center mb-8 tracking-wide">LOGIN</h2>

                    {error && (
                        <div className="mb-4 flex items-center gap-2 p-3 rounded-md bg-destructive/10 text-destructive text-sm justify-center">
                            <AlertCircle size={16} />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1">
                            <Label htmlFor="email" className="text-gray-600 font-medium">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                className="border-gray-200 focus:border-pink-500 focus:ring-pink-500 h-11"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="password" className="text-gray-600 font-medium">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                className="border-gray-200 focus:border-pink-500 focus:ring-pink-500 h-11"
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="remember"
                                checked={rememberMe}
                                onCheckedChange={setRememberMe}
                                className="border-pink-500 data-[state=checked]:bg-pink-500 data-[state=checked]:text-white"
                            />
                            <label
                                htmlFor="remember"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600"
                            >
                                Remember me?
                            </label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-[#ef5885] hover:bg-[#d64570] text-white font-semibold h-11 rounded-md mt-4 shadow-md transition-all duration-200"
                            disabled={loading}
                        >
                            {loading ? "LOGGING IN..." : "LOGIN"}
                        </Button>

                        <div className="flex justify-end pt-1">
                            <Link to="#" className="text-sm text-gray-400 hover:text-gray-600">Forgot Password?</Link>
                        </div>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-white px-2 text-sm text-gray-400 border border-gray-200 rounded-md">OR</span>
                        </div>
                    </div>

                    <div className="flex justify-center space-x-6 mb-6">
                        <button type="button" className="p-2 rounded-full border border-red-500 text-red-500 hover:bg-red-50 transition-colors">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.333.533 12S5.867 24 12.48 24c3.44 0 6.013-1.133 8.053-3.267 2.107-2.107 2.747-5.387 2.747-7.947 0-.587-.053-1.027-.12-1.867H12.48z" />
                            </svg>
                        </button>
                        <button type="button" className="p-2 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors">
                            <Facebook className="w-6 h-6" />
                        </button>
                        <button type="button" className="p-2 rounded-full border border-blue-700 text-blue-700 hover:bg-blue-50 transition-colors">
                            <Linkedin className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-500">
                            Need an account? <Link to="/create-account" className="text-gray-600 hover:text-gray-900 font-semibold underline decoration-gray-400 underline-offset-4">SIGN UP</Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
