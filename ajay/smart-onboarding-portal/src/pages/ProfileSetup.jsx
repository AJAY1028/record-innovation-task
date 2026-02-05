import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Upload, User, ArrowRight } from 'lucide-react';
import { useOnboarding } from '../context/OnboardingContext';
import { Button } from '../components/ui/button';
import LogoutButton from '../components/ui/LogoutButton';

const ProfileSetup = () => {
    const navigate = useNavigate();
    const { formData, updateFormData, autosaveStep, finalize } = useOnboarding();
    const [jobStatus, setJobStatus] = useState(formData?.jobStatus || '');
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create a preview URL
            const url = URL.createObjectURL(file);
            setPreview(url);
            // In a real app, we'd upload to cloud storage here
            // For now, we'll just save the name or a fake URL
            updateFormData({ profilePhoto: url });
        }
    };

    const handleNext = async () => {
        if (loading) return;
        setLoading(true);
        try {
            await autosaveStep('profileSetup', { jobStatus });
            await finalize();
            navigate('/dashboard');
        } catch (error) {
            console.error("Error finalizing:", error);
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate('/onboarding/preferences');
    };

    return (
        <div className="min-h-screen w-full bg-slate-50 flex flex-col font-sans">
            {/* Header */}
            <header className="w-full px-6 py-4 flex items-center justify-between bg-white relative z-10">
                <div className="flex items-center gap-4 w-full max-w-7xl mx-auto">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors"
                    >
                        <ChevronLeft size={16} />
                        Back
                    </button>

                    <div className="flex-1 max-w-2xl mx-auto flex flex-col items-center">
                        <div className="mb-1 text-gray-300">
                            {/* Ship Icon */}
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 21h20M2 11l10-8 10 8M12 3v18" />
                            </svg>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden relative">
                            {/* Progress ~90% (Final Step) */}
                            <div className="absolute left-0 top-0 h-full w-[90%] bg-gray-800 rounded-full"></div>
                        </div>
                    </div>
                </div>
                {/* Logout and Orange Box */}
                <div className="absolute top-0 right-0 h-16 flex items-center pr-4 gap-4 z-50">
                    <LogoutButton />
                    <div className="w-24 h-16 bg-[#ff5722] -mr-4"></div>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-lg text-center space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900">Set your profile</h1>
                        <p className="text-gray-400 text-sm">This is important!</p>
                    </div>

                    {/* Profile Photo Section */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-sm relative">
                            {preview || formData?.profilePhoto ? (
                                <img src={preview || formData?.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-12 h-12 text-gray-400" />
                            )}
                        </div>
                        <p className="text-xs text-gray-400">Your Profile Preview</p>

                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-600">Upload Profile Picture</p>
                            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
                                <Upload size={16} />
                                Upload Photo
                                <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                            </label>
                        </div>
                    </div>

                    {/* Job Status Section */}
                    <div className="space-y-4 text-left max-w-xs mx-auto pt-4">
                        <p className="text-sm font-medium text-gray-700">Are you actively looking for a job?</p>
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${jobStatus === 'seeking' ? 'border-[#ff5722]' : 'border-gray-300 group-hover:border-gray-400'}`}>
                                    {jobStatus === 'seeking' && <div className="w-2.5 h-2.5 rounded-full bg-[#ff5722]"></div>}
                                </div>
                                <input
                                    type="radio"
                                    name="jobStatus"
                                    value="seeking"
                                    className="hidden"
                                    checked={jobStatus === 'seeking'}
                                    onChange={() => setJobStatus('seeking')}
                                />
                                <span className={jobStatus === 'seeking' ? 'text-gray-900 font-medium' : 'text-gray-600'}>Yes, actively seeking</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${jobStatus === 'not_looking' ? 'border-[#ff5722]' : 'border-gray-300 group-hover:border-gray-400'}`}>
                                    {jobStatus === 'not_looking' && <div className="w-2.5 h-2.5 rounded-full bg-[#ff5722]"></div>}
                                </div>
                                <input
                                    type="radio"
                                    name="jobStatus"
                                    value="not_looking"
                                    className="hidden"
                                    checked={jobStatus === 'not_looking'}
                                    onChange={() => setJobStatus('not_looking')}
                                />
                                <span className={jobStatus === 'not_looking' ? 'text-gray-900 font-medium' : 'text-gray-600'}>No, I'm not looking</span>
                            </label>
                        </div>
                    </div>
                </div>
            </main>

            {/* Bottom Bar */}
            <div className="w-full bg-[#1a1f2c] p-4 flex flex-col sm:flex-row items-center justify-end gap-4 px-8 md:px-16">
                <div className="flex items-center gap-4">
                    <span className="text-gray-500 text-sm hidden sm:inline">or press Enter</span>
                    <Button
                        onClick={handleNext}
                        disabled={!jobStatus || loading}
                        className="bg-[#555b6e] hover:bg-[#464b59] text-white px-6 py-2 rounded-md font-medium transition-colors"
                    >
                        {loading ? "Processing..." : "Finish & Dashboard"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProfileSetup;
