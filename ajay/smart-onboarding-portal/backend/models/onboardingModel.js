import mongoose from 'mongoose';

const onboardingSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
            unique: true,
            index: true,
        },
        currentStep: {
            type: Number,
            default: 1,
        },
        // Step 1: Personal Info
        personalInfo: {
            firstName: String,
            lastName: String,
            phoneNumber: String,
        },
        // Step 2: Professional Info
        professionalInfo: {
            jobTitle: String,
            company: String,
            experience: String,
        },
        // Step 3: Preferences
        preferences: {
            theme: { type: String, default: 'light' },
            notifications: { type: Boolean, default: true },
            interests: [String],
        },
        // Catch-all for other steps / dynamic fields
        responses: {
            type: Map,
            of: mongoose.Schema.Types.Mixed,
            default: {},
        },
        isCompleted: {
            type: Boolean,
            required: true,
            default: false,
        },
        lastAutosavedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// Middleware to update the lastAutosavedAt timestamp
onboardingSchema.pre('save', async function () {
    this.lastAutosavedAt = Date.now();
});

const Onboarding = mongoose.model('Onboarding', onboardingSchema);

export default Onboarding;
