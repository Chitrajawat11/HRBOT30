const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from public folder

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hrbot30@gmail.com', // Your bot's email
        pass: 'hxup micg ahqd karm' // Your bot's app password
    }
});

// Email sending endpoint
app.post('/send-email', (req, res) => {
    const { email, subject, message } = req.body;

    const mailOptions = {
        from: 'hrbot30@gmail.com', // Your bot's email
        to: email,
        subject: subject,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

// Onboarding email for employees
app.post('/chat', (req, res) => {
    const userMessage = req.body.message;

    if (userMessage.includes('onboarding')) {
        res.send('Please provide your email for onboarding confirmation.');
    } else if (userMessage.includes('@')) {
        const email = userMessage; // Assuming the user has provided their email
        const subject = 'Welcome to the Company - Onboarding Confirmation';
        const onboardingMessage = `
        Dear Employee,

        We are excited to welcome you to the company! As part of the onboarding process, here are your onboarding details:

        - Start Date: [Insert Start Date]
        - Team: [Insert Team Information]
        - HR Contact: [Insert HR Contact Information]

        If you have any questions, feel free to reach out to HR.

        Best regards,
        The HR Team
        `;

        const mailOptions = {
            from: 'hrbot30@gmail.com',
            to: email,
            subject: subject,
            text: onboardingMessage
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send(error.toString());
            }
            res.send('Onboarding email has been sent.');
        });
    } else {
        res.send('How can I help you today?');
    }
});

// Interview scheduling confirmation email for candidates
app.post('/schedule-interview', (req, res) => {
    const { email, interviewDate } = req.body; // Assuming interview date is passed in the body
    const subject = 'Interview Scheduled Confirmation';
    const interviewMessage = `
    Dear Candidate,

    Your interview has been scheduled on ${interviewDate}. Please be on time, and let us know if you have any issues attending.

    Best of luck for the interview!

    Regards,
    HR Team
    `;

    const mailOptions = {
        from: 'hrbot30@gmail.com',
        to: email,
        subject: subject,
        text: interviewMessage
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Interview confirmation email has been sent.');
    });
});

// Leave application approval email for employees
app.post('/approve-leave', (req, res) => {
    const { email, leaveDates } = req.body; // Assuming leaveDates is passed in the body
    const subject = 'Leave Application Approved';
    const leaveMessage = `
    Dear Employee,

    Your leave application for the following dates has been approved: ${leaveDates}.

    If you have any further questions or need to modify your leave, please reach out to HR.

    Regards,
    HR Team
    `;

    const mailOptions = {
        from: 'hrbot30@gmail.com',
        to: email,
        subject: subject,
        text: leaveMessage
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Leave approval email has been sent.');
    });
});

// Sample job recommendations based on skills
const jobRecommendations = {
    'JavaScript': ['Frontend Developer', 'Full Stack Developer', 'Java Developer'],
    'Java': ['Backend Developer', 'Android Developer', 'Java Developer'],
    'Python': ['Data Scientist', 'Machine Learning Engineer', 'Web Developer'],
    'C++': ['Game Developer', 'Embedded Systems Engineer', 'Software Engineer'],
    'SQL': ['Database Administrator', 'Data Analyst', 'Data Engineer'],
};

// Endpoint to handle job recommendations
app.post('/job-recommendations', (req, res) => {
    const skill = req.body.skill;

    if (jobRecommendations[skill]) {
        res.send(`Based on your skill in ${skill}, here are some job recommendations: ${jobRecommendations[skill].join(', ')}`);
    } else {
        res.send('Sorry, we do not have job recommendations for that skill.');
    }
});

// Sample FAQ data
const faq = [
    { question: 'How do I apply for a job?', answer: 'You can apply for a job by visiting our careers page and submitting your resume.' },
    { question: 'What is the onboarding process like?', answer: 'Once selected, you will receive an onboarding email with all the necessary steps and documentation.' },
    { question: 'How can I check my leave balance?', answer: 'You can check your leave balance by logging into the HR portal.' },
    { question: 'Can I apply for multiple positions?', answer: 'Yes, you are allowed to apply for multiple positions if you meet the qualifications.' },
];

// Endpoint to handle FAQs
app.get('/faq', (req, res) => {
    res.json(faq);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
