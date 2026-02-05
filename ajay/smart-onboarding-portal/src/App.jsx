import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { OnboardingProvider } from './context/OnboardingContext'
import CreateAccount from './pages/CreateAccount'
import Login from './pages/Login'
import PersonalDetails from './pages/PersonalDetails'
import ProfessionalInfo from './pages/ProfessionalInfo'
import Preferences from './pages/Preferences'
import ProfileSetup from './pages/ProfileSetup'
import Dashboard from './pages/Dashboard'

import { useOnboarding } from './context/OnboardingContext'

const ProtectedRoute = ({ children }) => {
  const { user } = useOnboarding();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <OnboardingProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/create-account" replace />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />

          {/* Onboarding Steps */}
          <Route path="/onboarding/personal" element={<ProtectedRoute><PersonalDetails /></ProtectedRoute>} />
          <Route path="/onboarding/professional" element={<ProtectedRoute><ProfessionalInfo /></ProtectedRoute>} />
          <Route path="/onboarding/preferences" element={<ProtectedRoute><Preferences /></ProtectedRoute>} />
          <Route path="/onboarding/profile-setup" element={<ProtectedRoute><ProfileSetup /></ProtectedRoute>} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </OnboardingProvider>
  )
}

export default App
