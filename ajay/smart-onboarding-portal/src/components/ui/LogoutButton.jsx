import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';
import { Button } from '../../components/ui/button';

const LogoutButton = ({ navigateTo = '/login', className = '' }) => {
    const { logout } = useOnboarding();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate(navigateTo);
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className={`text-red-500 hover:text-red-600 hover:bg-red-50 gap-2 ${className}`}
        >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
        </Button>
    );
};

export default LogoutButton;
