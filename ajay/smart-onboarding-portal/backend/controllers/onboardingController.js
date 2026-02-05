import Onboarding from '../models/onboardingModel.js';

// @desc    Get user onboarding data
// @route   GET /api/onboarding
// @access  Private (Assume req.user is populated by auth middleware)
export const getOnboardingData = async (req, res) => {
    try {
        const onboarding = await Onboarding.findOne({ user: req.user._id });
        if (onboarding) {
            res.json(onboarding);
        } else {
            res.status(404).json({ message: 'Onboarding data not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Save/Autosave onboarding step data
// @route   POST /api/onboarding/autosave
// @access  Private
export const saveOnboardingStep = async (req, res) => {
    const { step, data } = req.body; // e.g., step: 'personalInfo', data: { ... }

    console.log(`Saving step: ${step} for user: ${req.user._id}`);
    console.log('Data:', data);

    try {
        let onboarding = await Onboarding.findOne({ user: req.user._id });

        if (onboarding) {
            console.log('Found existing onboarding, updating...');
            // Update existing document
            onboarding[step] = { ...onboarding[step], ...data };
            onboarding.lastAutosavedAt = Date.now();
            await onboarding.save();
        } else {
            console.log('Creating new onboarding document...');
            // Create new document
            onboarding = await Onboarding.create({
                user: req.user._id,
                [step]: data,
            });
        }

        console.log('Saved successfully');
        res.status(200).json(onboarding);
    } catch (error) {
        console.error('Error saving step:', error.message);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Finalize onboarding
// @route   POST /api/onboarding/finalize
// @access  Private
export const finalizeOnboarding = async (req, res) => {
    try {
        const onboarding = await Onboarding.findOne({ user: req.user._id });
        if (onboarding) {
            onboarding.isCompleted = true;
            await onboarding.save();
            res.json({ message: 'Onboarding completed successfully' });
        } else {
            res.status(404).json({ message: 'Onboarding data not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
