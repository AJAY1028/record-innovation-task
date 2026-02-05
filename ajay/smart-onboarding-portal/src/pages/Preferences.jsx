import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search } from 'lucide-react';
import { useOnboarding } from '../context/OnboardingContext';
import { Button } from '../components/ui/button';
import LogoutButton from '../components/ui/LogoutButton';

const SKILLS_DATA = {
    Business: [
        "DaVinci Resolve", "Microsoft SharePoint", "IIBA Entry Certificate in Business Analysis",
        "Microsoft Project", "Operations Management", "Microsoft Access", "Management Skills",
        "Lean", "Sony Vegas", "Quality Checking", "Business Model Canvas", "Technical Writing",
        "HR Analytics", "Online Course Creation", "Microsoft PowerPoint"
    ],
    Design: [
        "Cinematic Editing", "Wix", "Adobe Premiere Pro", "User Experience (UX) design",
        "Fashion", "Game Design", "Canva", "Character Design", "Sewing",
        "Building Information Modelling (BIM)", "Mobile App design", "Textiles",
        "Illustration", "Virtual Reality", "UI/UX"
    ]
};

const Preferences = () => {
    const navigate = useNavigate();
    const { formData, updateFormData, autosaveStep } = useOnboarding();
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (formData?.preferences?.interests) {
            setSelectedSkills(formData.preferences.interests);
        }
    }, [formData]);

    const toggleSkill = (skill) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(prev => prev.filter(s => s !== skill));
        } else {
            if (selectedSkills.length < 5) {
                setSelectedSkills(prev => [...prev, skill]);
            }
        }
    };

    const handleNext = async () => {
        await autosaveStep('preferences', {
            interests: selectedSkills
        });
        navigate('/onboarding/profile-setup');
    };

    const handleBack = () => {
        navigate('/onboarding/professional');
    };

    return (
        <div className="min-h-screen w-full bg-white flex flex-col font-sans">
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
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 21h20M2 11l10-8 10 8M12 3v18" />
                            </svg>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden relative">
                            <div className="absolute left-0 top-0 h-full w-[60%] bg-gray-800 rounded-full"></div>
                        </div>
                    </div>
                </div>
                {/* Orange Box Top Right replaced/augmented with Logout */}
                <div className="absolute top-0 right-0 h-16 flex items-center pr-4 gap-4 z-50">
                    <LogoutButton />
                    <div className="w-24 h-16 bg-[#ff5722] -mr-4"></div>
                </div>
            </header>

            {/* Main Content - Tighter max-w-2xl */}
            <main className="flex-1 flex flex-col items-center px-4 pt-4 md:pt-8 pb-10 max-w-2xl mx-auto w-full">
                <div className="text-center space-y-1 mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">What's your Interest?</h1>
                    <p className="text-gray-500 text-sm">Let us know what you are most curious about.</p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full max-w-md mb-2">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search Skills i.e figma, front end"
                        className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm text-gray-700 placeholder:text-gray-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Selected Skills Section */}
                {selectedSkills.length > 0 && (
                    <div className="w-full mb-8">
                        <h3 className="text-gray-900 font-bold mb-3 text-left pl-4 border-l-4 border-[#ff5722]">Selected Skills</h3>
                        <div className="flex flex-wrap gap-3">
                            {selectedSkills.map(skill => (
                                <button
                                    key={skill}
                                    onClick={() => toggleSkill(skill)}
                                    className="flex items-center gap-2 px-4 py-2 bg-[#ff5722] text-white rounded-full text-sm font-semibold shadow-sm hover:bg-[#e64a19] transition-all group"
                                >
                                    {skill}
                                    <div className="bg-white/20 rounded-full p-0.5 group-hover:bg-white/30 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                                        </svg>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <p className="text-xs text-gray-400 mb-6">
                    ({selectedSkills.length}/5 skills selected — you can edit later)
                </p>

                {/* Skills Categories */}
                <div className="w-full space-y-6">
                    {Object.entries(SKILLS_DATA).map(([category, skills]) => (
                        <div key={category} className="flex flex-col items-center space-y-3">
                            <h2 className="text-base font-bold text-gray-800">{category}</h2>
                            <div className="flex flex-wrap justify-center gap-2">
                                {skills.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase())).map((skill) => {
                                    const isSelected = selectedSkills.includes(skill);
                                    return (
                                        <button
                                            key={skill}
                                            onClick={() => toggleSkill(skill)}
                                            className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-200 
                                                ${isSelected
                                                    ? 'bg-[#ff5722] text-white border-[#ff5722] shadow-md'
                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            {skill}
                                        </button>
                                    );
                                })}
                            </div>
                            <button className="text-[#438afe] text-xs font-medium hover:underline">See more</button>
                        </div>
                    ))}
                </div>

                {/* Continue Actions */}
                <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-gray-100 flex justify-center md:static md:bg-transparent md:border-none md:mt-10 md:p-0">
                    <Button
                        onClick={handleNext}
                        className="w-full max-w-sm h-11 bg-[#ff5722] hover:bg-[#e64a19] text-white rounded-lg shadow-lg shadow-orange-500/20 text-sm font-semibold"
                    >
                        Continue
                    </Button>
                </div>
            </main>
        </div>
    );
};

export default Preferences;
