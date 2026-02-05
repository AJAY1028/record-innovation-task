import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Award, Box, Share2, Eye, FileText } from 'lucide-react';
import { useOnboarding } from '../context/OnboardingContext';
import LogoutButton from '../components/ui/LogoutButton';

const ProfessionalInfo = () => {
    const navigate = useNavigate();
    const { autosaveStep } = useOnboarding();

    const handleBack = () => {
        navigate('/onboarding/personal');
    };

    const handleContinue = async () => {
        // This page is now informational/value prop, so we just proceed
        // We might want to save a flag that they viewed this
        await autosaveStep('professionalInfo', { viewed: true });
        navigate('/onboarding/preferences');
    };

    return (
        <div className="min-h-screen w-full bg-white flex flex-col font-sans">
            {/* Header */}
            <header className="w-full px-6 py-4 flex items-center justify-between bg-white">
                <div className="flex items-center gap-4 w-full max-w-7xl mx-auto">
                    {/* Back Button */}
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors"
                    >
                        <ChevronLeft size={16} />
                        Back
                    </button>

                    {/* Progress Bar Container - Centered */}
                    <div className="flex-1 max-w-2xl mx-auto flex flex-col items-center">
                        {/* Ship Icon above progress bar */}
                        <div className="mb-1 text-gray-300">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 21h20M2 11l10-8 10 8M12 3v18" />
                            </svg>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden relative">
                            {/* Progress Segment - 33% roughly */}
                            <div className="absolute left-0 top-0 h-full w-[35%] bg-gray-800 rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Orange Box Top Right replaced/augmented with Logout */}
                <div className="absolute top-0 right-0 h-16 flex items-center pr-4 gap-4 z-50">
                    <LogoutButton />
                    <div className="w-24 h-16 bg-[#ff5722] -mr-4"></div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 flex items-center justify-center p-6 md:p-12 bg-gray-50/50">
                <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">

                    {/* Left Column: Value Prop */}
                    <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                        <div className="space-y-6">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                                You bring the curiosity.<br />
                                <span className="text-[#ff5722]">We'll back it up with proof.</span>
                            </h1>

                            <p className="text-gray-500 text-sm md:text-base max-w-md">
                                Record is built for people like you – learners, job-seekers, builders. Whatever your goal, we help you earn verified skill badges and turn effort into outcomes.
                            </p>

                            <div className="space-y-4 pt-4">
                                {/* Feature 1 */}
                                <div className="flex items-start gap-3">
                                    <div className="mt-1">
                                        <Box className="w-5 h-5 text-[#ff5722]" />
                                    </div>
                                    <p className="text-gray-700 font-medium text-sm md:text-base">
                                        Earn verified skill badges from projects, courses & YouTube
                                    </p>
                                </div>

                                {/* Feature 2 */}
                                <div className="flex items-start gap-3">
                                    <div className="mt-1">
                                        <FileText className="w-5 h-5 text-[#ff5722]" />
                                    </div>
                                    <p className="text-gray-700 font-medium text-sm md:text-base">
                                        Take AI-powered assessments to showcase your skills
                                    </p>
                                </div>

                                {/* Feature 3 */}
                                <div className="flex items-start gap-3">
                                    <div className="mt-1">
                                        <Share2 className="w-5 h-5 text-[#ff5722]" />
                                    </div>
                                    <p className="text-gray-700 font-medium text-sm md:text-base">
                                        Share your profile & badges publicly, like a mini portfolio
                                    </p>
                                </div>

                                {/* Feature 4 */}
                                <div className="flex items-start gap-3">
                                    <div className="mt-1">
                                        <Eye className="w-5 h-5 text-[#ff5722]" />
                                    </div>
                                    <p className="text-gray-700 font-medium text-sm md:text-base">
                                        Be visible to 200+ recruiters hiring via Record
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Trusted By Footer */}
                        <div className="mt-12 pt-8 border-t border-gray-100">
                            <p className="text-xs text-gray-400 mb-3">Trusted & Supported by</p>
                            <div className="flex items-center gap-6 opacity-60 grayscale">
                                {/* Placeholders for logos using text/simple styling */}
                                <span className="font-bold text-lg text-gray-600">ZOHO</span>
                                <span className="font-bold text-lg text-gray-600">aws</span>
                                <div className="flex flex-col leading-none">
                                    <span className="text-[10px] uppercase">Microsoft for Startups</span>
                                    <span className="font-bold text-sm">Founders Hub</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="font-serif font-bold bg-black text-white px-1 rounded-sm text-xs">N</span>
                                    <span className="font-medium">Notion</span>
                                </div>
                                <span className="font-bold text-lg text-gray-600">StartupTN</span>
                            </div>
                        </div>

                        {/* Action Button - To proceed */}
                        <div className="mt-8 md:hidden">
                            <button
                                onClick={handleContinue}
                                className="w-full py-3 bg-[#ff5722] text-white rounded-lg font-bold hover:bg-[#e64a19] transition-colors"
                            >
                                Continue
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Testimonial */}
                    <div className="flex-1 bg-[#1e2532] p-8 md:p-12 flex flex-col justify-center text-white relative cursor-pointer" onClick={handleContinue}>
                        <div className="absolute top-8 right-8 text-white/20">
                            {/* Decorative element if needed */}
                        </div>

                        <div className="flex flex-col items-center text-center space-y-8 max-w-md mx-auto">
                            {/* Icon */}
                            <div className="w-20 h-20 rounded-2xl border-2 border-white/20 flex items-center justify-center">
                                <Award className="w-10 h-10 text-white/80" />
                            </div>

                            {/* Quote */}
                            <blockquote className="text-sm md:text-base leading-relaxed text-gray-300">
                                "Throughout my journey spanning projects, work experience, licenses, education, and even my personal YouTube learning playlist, I've built a strong skill set. And now, I can see them all in one place with Record."
                            </blockquote>

                            {/* Author */}
                            <div className="text-center">
                                <p className="font-bold text-white text-lg">Arunmathavan</p>
                                <p className="text-[#ff5722] text-sm">Mobile App Developer at NSIC</p>
                            </div>
                        </div>
                        {/* Hint to continue */}
                        <div className="absolute bottom-6 right-6 text-xs text-white/30 hidden md:block">
                            Click anywhere to continue →
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfessionalInfo;
