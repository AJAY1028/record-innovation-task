import React from 'react';
import { useLocation } from 'react-router-dom';
import LogoutButton from '../ui/LogoutButton';
import { Progress } from '../ui/progress';

const steps = [
    '/onboarding/personal',
    '/onboarding/professional',
    '/onboarding/preferences',
    '/onboarding/details',
    '/onboarding/review',
    '/onboarding/confirm'
];

const OnboardingLayout = ({ children, title, description, currentStep = 1, totalSteps = 6 }) => {
    const location = useLocation();
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className="min-h-screen flex flex-col items-center bg-slate-50 dark:bg-slate-950 p-4 sm:p-8">
            <div className="w-full max-w-3xl space-y-8">
                {/* Progress Section */}
                <div className="w-full space-y-2">
                    <div className="flex justify-between text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        <span>Step {currentStep} of {totalSteps}</span>
                        <span>{Math.round(progress)}% Completed</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>

                {/* Content Card */}
                <div className="bg-card text-card-foreground rounded-xl shadow-lg border p-6 sm:p-10 animate-in slide-in-from-bottom-4 duration-500 relative">
                    <LogoutButton className="absolute top-4 right-4" />
                    <div className="mb-8 border-b pb-4">
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
                        {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default OnboardingLayout;
