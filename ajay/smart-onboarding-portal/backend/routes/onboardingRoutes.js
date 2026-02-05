import express from 'express';
const router = express.Router();
import {
    getOnboardingData,
    saveOnboardingStep,
    finalizeOnboarding,
} from '../controllers/onboardingController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getOnboardingData);
router.route('/autosave').post(protect, saveOnboardingStep);
router.route('/finalize').post(protect, finalizeOnboarding);

export default router;
