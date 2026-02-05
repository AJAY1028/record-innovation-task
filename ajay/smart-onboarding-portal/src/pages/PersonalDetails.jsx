import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useOnboarding } from '../context/OnboardingContext';
import LogoutButton from '../components/ui/LogoutButton';

const PersonalDetails = () => {
    const navigate = useNavigate();
    const { formData, updateFormData, autosaveStep } = useOnboarding();

    // Local state for form management
    const [localData, setLocalData] = useState({
        fullName: '',
        username: '',
        role: '',
        location: '',
        referralSource: ''
    });

    // Initialize from context if available
    useEffect(() => {
        if (formData?.personalInfo) {
            setLocalData(prev => ({
                ...prev,
                ...formData.personalInfo
            }));
        }
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalData(prev => ({ ...prev, [name]: value }));
    };

    const isFormValid = localData.fullName && localData.username && localData.role && localData.location;

    const handleNext = async () => {
        if (isFormValid) {
            // Split full name for backend compatibility if needed, or send as is
            const names = localData.fullName.split(' ');
            const firstName = names[0];
            const lastName = names.slice(1).join(' ') || '';

            await autosaveStep('personalInfo', {
                ...localData,
                firstName, // Keep backward compatibility if backend expects it
                lastName
            });
            navigate('/onboarding/professional');
        }
    };

    return (
        <div className="min-h-screen w-full bg-white flex flex-col">
            {/* Minimal Header */}
            <header className="w-full p-6 flex justify-between items-center bg-white border-b-4 border-gray-100">
                {/* Logo Placeholder - assuming a ship icon based on mockup */}
                <div className="text-gray-300">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 21h20M2 11l10-8 10 8M12 3v18" />
                    </svg>
                </div>

                {/* Orange Box Placeholder replaced/augmented with Logout */}
                <div className="flex items-center gap-4">
                    <LogoutButton />
                    <div className="w-16 h-12 bg-[#ff5722]"></div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-start pt-20 px-4">
                <div className="w-full max-w-lg space-y-8 text-center">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">It's your time!</h1>
                        <p className="text-gray-500 text-lg">Let us know about yourself first.</p>
                    </div>

                    <div className="space-y-5 text-left">
                        {/* Name Input */}
                        <Input
                            name="fullName"
                            placeholder="Your Name"
                            value={localData.fullName}
                            onChange={handleChange}
                            className="h-12 bg-gray-50 border-gray-100 focus:bg-white transition-colors"
                        />

                        {/* Username Input */}
                        <div className="space-y-2">
                            <Input
                                name="username"
                                placeholder="Your Username"
                                value={localData.username}
                                onChange={handleChange}
                                className="h-12 bg-gray-50 border-gray-100 focus:bg-white transition-colors"
                            />

                        </div>

                        {/* Role Select */}
                        <div className="relative">
                            <select
                                name="role"
                                value={localData.role}
                                onChange={handleChange}
                                className="w-full h-12 px-3 py-2 bg-gray-50 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:bg-white appearance-none text-gray-500"
                            >
                                <option value="" disabled>What best describes you?</option>
                                <option value="developer">Developer</option>
                                <option value="designer">Designer</option>
                                <option value="manager">Product Manager</option>
                                <option value="student">Student</option>
                                <option value="other">Other</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        </div>

                        {/* Location Select */}
                        <div className="relative">
                            <select
                                name="location"
                                value={localData.location}
                                onChange={handleChange}
                                className="w-full h-12 px-3 py-2 bg-gray-50 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:bg-white appearance-none text-gray-500"
                            >
                                <option value="" disabled>Select your location</option>
                                <option value="us">United States</option>
                                <option value="uk">United Kingdom</option>
                                <option value="in">India</option>
                                <option value="ca">Canada</option>
                                <option value="au">Australia</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        </div>

                        {/* Referral Select */}
                        <div className="relative">
                            <select
                                name="referralSource"
                                value={localData.referralSource}
                                onChange={handleChange}
                                className="w-full h-12 px-3 py-2 bg-gray-50 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:bg-white appearance-none text-gray-500"
                            >
                                <option value="" disabled>How do you know us?</option>
                                <option value="social">Social Media</option>
                                <option value="friend">Friend/Colleague</option>
                                <option value="search">Search Engine</option>
                                <option value="ads">Advertisement</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* Next Button - Hidden or visible? Mockup doesn't show it clearly, but we need a way to proceed. 
                        Usually these layouts have a fixed bottom bar or a button below. 
                        I'll add a subtle one or auto-advance? No, auto-advance is bad form. 
                        I will add a large "Continue" button below to ensure flow. 
                        Relying on "Next" from layout is gone. */}

                    <div className="pt-8">
                        <Button
                            onClick={handleNext}
                            disabled={!isFormValid}
                            className="w-full h-12 bg-gray-900 text-white hover:bg-gray-800 rounded-md"
                        >
                            Continue
                        </Button>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default PersonalDetails;
