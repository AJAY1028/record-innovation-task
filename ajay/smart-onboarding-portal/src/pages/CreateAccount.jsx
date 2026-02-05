import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';
import { Eye, EyeOff, Facebook, Linkedin } from 'lucide-react';
import { useOnboarding } from '../context/OnboardingContext';

const CreateAccount = () => {
    const navigate = useNavigate();
    const { login } = useOnboarding();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');

    const validate = () => {
        const newErrors = {};
        if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Valid email is required";
        if (!form.password || form.password.length < 8) newErrors.password = "Password must be at least 8 characters";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
        if (serverError) setServerError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            const { data } = await axios.post('http://localhost:5001/api/users', {
                email: form.email,
                password: form.password,
            });
            setLoading(false);
            login(data);
            navigate('/onboarding/personal');

        } catch (error) {
            setLoading(false);
            setServerError(error.response?.data?.message || 'Something went wrong');
        }
    };

    const isFormValid = form.email && form.password.length >= 8;

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#6da0c2] p-4">
            <Card className="w-full max-w-md bg-white border-none shadow-xl rounded-lg overflow-hidden">
                <CardContent className="p-8">
                    <h2 className="text-xl font-bold text-gray-700 text-center mb-8 tracking-wide">SIGN UP</h2>

                    {serverError && (
                        <div className="mb-4 p-3 bg-red-50 text-red-500 text-sm rounded-md text-center">
                            {serverError}
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
                                className={`border-gray-200 focus:border-pink-500 focus:ring-pink-500 h-11 ${errors.email ? "border-red-500" : ""}`}
                            />
                            {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="password" className="text-gray-600 font-medium">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={form.password}
                                    onChange={handleChange}
                                    className={`border-gray-200 focus:border-pink-500 focus:ring-pink-500 h-11 pr-10 ${errors.password ? "border-red-500" : ""}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && <span className="text-xs text-red-500">{errors.password}</span>}
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-[#ef5885] hover:bg-[#d64570] text-white font-semibold h-11 rounded-md mt-4 shadow-md transition-all duration-200"
                            disabled={!isFormValid || loading}
                        >
                            {loading ? "SIGNING UP..." : "SIGN UP"}
                        </Button>
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
                        <button className="p-2 rounded-full border border-red-500 text-red-500 hover:bg-red-50 transition-colors">
                            {/* Google Icon SVG */}
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.333.533 12S5.867 24 12.48 24c3.44 0 6.013-1.133 8.053-3.267 2.107-2.107 2.747-5.387 2.747-7.947 0-.587-.053-1.027-.12-1.867H12.48z" />
                            </svg>
                        </button>
                        <button className="p-2 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors">
                            <Facebook className="w-6 h-6" />
                        </button>
                        <button className="p-2 rounded-full border border-blue-700 text-blue-700 hover:bg-blue-50 transition-colors">
                            <Linkedin className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-500">
                            Already a user? <Link to="/login" className="text-gray-600 hover:text-gray-900 font-semibold underline decoration-gray-400 underline-offset-4">LOGIN</Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateAccount;
