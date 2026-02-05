import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const OnboardingContext = createContext();

const API_URL = 'http://localhost:5001/api';

export const OnboardingProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem('userInfo');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Error parsing user info from local storage", error);
            localStorage.removeItem('userInfo'); // Clear invalid data
            return null;
        }
    });
    const [formData, setFormData] = useState({
        personalInfo: {},
        professionalInfo: {},
        preferences: {},
        isCompleted: false
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            fetchOnboardingData();
        }
    }, [user]);

    const fetchOnboardingData = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`${API_URL}/onboarding`, config);
            if (data) {
                setFormData(data);
            }
        } catch (error) {
            console.error('Error fetching onboarding data:', error);
        }
    };

    const updateFormData = (data) => {
        setFormData((prev) => ({ ...prev, ...data }));
    };

    const autosaveStep = async (step, stepData) => {
        console.log(`Frontend autosaveStep called for ${step}`, stepData);
        if (!user) {
            console.error('No user found in context for autosave');
            return;
        }

        try {
            console.log(`Sending POST to ${API_URL}/onboarding/autosave`);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(
                `${API_URL}/onboarding/autosave`,
                { step, data: stepData },
                config
            );
            console.log('Autosave response:', data);
            updateFormData(data);
        } catch (error) {
            console.error('Autosave failed:', error.response?.data || error.message);
        }
    };

    const finalize = async () => {
        if (!user) return;
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.post(`${API_URL}/onboarding/finalize`, {}, config);
            updateFormData({ isCompleted: true });
        } catch (error) {
            console.error('Finalize failed:', error);
        }
    };

    const login = (userInfo) => {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        setUser(userInfo);
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        setFormData({
            personalInfo: {},
            professionalInfo: {},
            preferences: {},
            isCompleted: false
        });
    };

    return (
        <OnboardingContext.Provider value={{
            user,
            formData,
            loading,
            updateFormData,
            autosaveStep,
            finalize,
            login,
            logout
        }}>
            {children}
        </OnboardingContext.Provider>
    );
};

export const useOnboarding = () => useContext(OnboardingContext);
