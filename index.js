const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static('public'));  // This serves static files from the 'public' folder
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// API route for screening candidates
app.post('/api/screenCandidate', (req, res) => {
    const { name, skills } = req.body;
    const skillArray = skills.split(',').map(skill => skill.trim().toLowerCase());

    // Skill-to-Job mapping
    const jobRecommendations = [];

    if (skillArray.includes('javascript') || skillArray.includes('react')) {
        jobRecommendations.push('Frontend Developer');
    }
    if (skillArray.includes('python') || skillArray.includes('machine learning')) {
        jobRecommendations.push('Data Scientist');
    }
    if (skillArray.includes('java') || skillArray.includes('spring')) {
        jobRecommendations.push('Backend Developer');
    }
    if (skillArray.includes('azure') || skillArray.includes('cloud computing')) {
        jobRecommendations.push('Cloud Engineer');
    }
    
    if (jobRecommendations.length > 0) {
        res.json({ message: `Based on your skills, we recommend the following jobs: ${jobRecommendations.join(', ')}` });
    } else {
        res.json({ message: 'Sorry, no jobs match your skill set at the moment.' });
    }
});

// API route for onboarding assistance
app.post('/api/onboarding', (req, res) => {
    const { employeeName, email } = req.body; // Capture the employee's email

    // Onboarding steps
    const onboardingSteps = [
        'Step 1: Complete your personal information on the portal.',
        'Step 2: Upload your ID and employment documents.',
        'Step 3: Set up your work email and system access.',
        'Step 4: Meet your team for an introductory meeting.',
        'Step 5: Complete your first training module.'
    ];

    res.json({
        message: `Welcome ${employeeName}! Here are your onboarding steps:`,
        steps: onboardingSteps
    });

    // Optionally, you can send onboarding email here using your mail service
});

// API route for sending emails (optional, depends on your implementation)
app.post('/api/send-email', (req, res) => {
    const { email, subject, message } = req.body;

    // Call the email service or Nodemailer function here to send the email
    // Example: nodemailer code should be included in your server.js file

    // For now, just simulate a success response
    res.status(200).send('Email sent successfully (simulation).');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
