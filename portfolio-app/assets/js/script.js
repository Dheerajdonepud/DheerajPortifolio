// Initialize Lucide icons
lucide.createIcons();

// Typewriter effect for "Hello! I'm DONEPUDI DHEERAJ SAI"
document.addEventListener("DOMContentLoaded", function() {
    // Split the text so only the name is purple
    const beforeName = "Hello! I'm ";
    const name = "DONEPUDI DHEERAJ SAI";
    const typewriter = document.getElementById("typewriter");
    if (!typewriter) return;
    let i = 0;
    function type() {
        if (i <= beforeName.length + name.length) {
            if (i <= beforeName.length) {
                typewriter.innerHTML = beforeName.slice(0, i);
            } else {
                typewriter.innerHTML =
                    beforeName +
                    '<span style="color:#a78bfa;">' +
                    name.slice(0, i - beforeName.length) +
                    "</span>";
            }
            i++;
            setTimeout(type, 80);
        }
    }
    type();
});



// --- Global Variables and Data ---
const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About Me', id: 'about' },
    { name: 'Education', id: 'education' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact Me', id: 'contact' },
];

const resumeData = {
    objective: "Enthusiastic Cyber Security practitioner possessing a strong background in Security Operations Centre (SOC) monitoring, penetration testing, and ethical hacking. Proficient in Python for both automation and security scripting along with full-stack development for the secure building of applications. Well versed in finding vulnerabilities, reducing security risks, and implementing strong security solutions.",
    coreSkills: [
        "SOC Monitoring (Splunk, QRadar)", "Penetration Testing & Ethical Hacking (Metasploit, Burp Suite, Nmap,)",
        "Vulnerability Assessment (Nessus, OpenVAS, Wireshark)", "Network Security (Firewalls, VPNs, TCP/IP, IDS/IPS)",
        "Python (Security Automation & Scripting)", "Full‑Stack Development (React, Node.js, MongoDB)",
        "Web Technologies (HTML5, CSS3, JavaScript)", "Cloud (Azure, AWS)"
    ],
    internships: [
        "Cybersecurity Intern Palo Alto Networks Intern — [December 2022 – February 2023]: Assisted in configuring and managing firewall policies to enhance network security. Conducted vulnerability assessments and penetration testing to identify and mitigate security risks. Monitored and analyzed security logs using Splunk and QRadar to detect potential threats. Investigated security incidents and assisted in the development of response strategies",
        "Fortinet Network Associate Intern — [March 2024 – May 2024]: Completed the Fortinet Network Associate (FNA) online program, gaining a solid understanding of the Fortinet Security Fabric and core network security concepts. Configured and managed FortiGate firewalls, including policy creation for segmentation, NAT, and site‑to‑site VPN tunnels. Monitored network traffic and security events using FortiAnalyzer and FortiManager, analyzing logs to identify anomalies and optimize rule sets. Performed hands‑on lab exercises simulating threat scenarios, deploying IPS, antivirus, and web‑filtering features to harden network infrastructure."
    ]
};

// --- DOM Elements ---
const preloader = document.getElementById('preloader');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const mobileNavButtons = mobileMenuOverlay ? mobileMenuOverlay.querySelectorAll('button') : [];
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const sendMessageBtn = document.getElementById('send-message-btn');
const generateCoverLetterBtn = document.getElementById('generate-cover-letter-btn');
const coverLetterText = document.getElementById('cover-letter-text');
const coverLetterSnippetContainer = document.getElementById('cover-letter-snippet-container');
const skillLLMButtons = document.querySelectorAll('.skill-card .btn-llm');
const footerCurrentYear = document.getElementById('current-year');

// --- State Variables (manual management) ---
let isMobileMenuOpen = false;
let currentActiveSection = 'home';
let loadingSkillExplanation = false;
let loadingCoverLetter = false;

// --- Functions ---

// Hide preloader once content is loaded
window.addEventListener('load', () => {
    preloader.classList.add('hidden');
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        // Update active link after scroll
        setTimeout(() => updateActiveNavLink(sectionId), 700); // Adjust delay based on scroll speed
    }
    // Close mobile menu if open
    if (isMobileMenuOpen) {
        toggleMobileMenu();
    }
}

// Update active navigation link
function updateActiveNavLink(activeId) {
    navLinks.forEach(link => {
        if (link.dataset.sectionId === activeId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    currentActiveSection = activeId; // Update internal state
}

// Toggle mobile menu
function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    if (isMobileMenuOpen) {
        mobileMenuOverlay.classList.add('open');
        mobileMenuButton.querySelector('path').setAttribute('d', 'M6 18L18 6M6 6l12 12');
    } else {
        mobileMenuOverlay.classList.remove('open');
        mobileMenuButton.querySelector('path').setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
    }
}

// Handle form submission
async function handleContactFormSubmit(event) {
    event.preventDefault();
    setFormStatus('loading', 'Sending...');

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    if (!data.name || !data.email || !data.subject || !data.message) {
        setFormStatus('error', 'Please fill in all fields.');
        return;
    }

    // Simulate API call
    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Form Data Submitted:', data);
        setFormStatus('success', 'Message sent successfully!');
        contactForm.reset(); // Clear form
    } catch (error) {
        console.error('Form submission error:', error);
        setFormStatus('error', 'An error occurred. Please try again.');
    }
}

// Set form status message
function setFormStatus(status, message) {
    formStatus.classList.remove('hidden', 'bg-green-500/20', 'text-green-300', 'bg-red-500/20', 'text-red-300');
    sendMessageBtn.disabled = false;
    sendMessageBtn.innerHTML = `<i data-lucide="mail" class="mr-3"></i> Send Message`;

    if (status === 'loading') {
        sendMessageBtn.disabled = true;
        sendMessageBtn.innerHTML = `<i data-lucide="loader-2" class="animate-spin mr-3"></i> Sending...`;
        formStatus.classList.add('hidden'); // Hide status while loading
    } else if (status === 'success') {
        formStatus.classList.add('bg-green-500/20', 'text-green-300');
        formStatus.innerHTML = `<i data-lucide="check-circle" class="mr-2"></i><span>${message}</span>`;
        lucide.createIcons(); // Re-render lucide icons
        setTimeout(() => formStatus.classList.add('hidden'), 3000);
    } else if (status === 'error') {
        formStatus.classList.add('bg-red-500/20', 'text-red-300');
        formStatus.innerHTML = `<i data-lucide="x-circle" class="mr-2"></i><span>${message}</span>`;
        lucide.createIcons(); // Re-render lucide icons
        setTimeout(() => formStatus.classList.add('hidden'), 3000);
    }
}

// LLM API Call for Skill Explanation
async function generateSkillExplanation(button) {
    if (loadingSkillExplanation) return;

    loadingSkillExplanation = true;
    button.disabled = true;
    const originalButtonText = button.innerHTML;
    const skillExplanationElement = button.nextElementSibling; // Get the <p> for explanation

    button.innerHTML = `<i data-lucide="loader-2" class="animate-spin mr-2"></i> Generating...`;
    skillExplanationElement.textContent = 'Generating explanation...';
    skillExplanationElement.classList.add('skill-explanation-container', 'show');
    lucide.createIcons(); // Re-render lucide icons

    const skillName = button.dataset.skillName;
    const skillTools = button.dataset.skillTools.split(', ').filter(Boolean); // Ensure no empty strings

    const prompt = `Provide a professional and concise explanation (2-3 sentences) for the skill "${skillName}" and its relevance in a cybersecurity or full-stack development context. Mention the tools: ${skillTools.join(', ')}.`;

    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
    const payload = { contents: chatHistory };
    const apiKey = ""; // If you want to use models other than gemini-2.0-flash or imagen-3.0-generate-002, provide an API key here. Otherwise, leave this as-is.
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const text = result.candidates[0].content.parts[0].text;
            skillExplanationElement.textContent = text;
        } else {
            skillExplanationElement.textContent = 'Failed to generate explanation. Please try again.';
        }
    } catch (error) {
        console.error("Error generating skill explanation:", error);
        skillExplanationElement.textContent = 'An error occurred. Please try again.';
    } finally {
        loadingSkillExplanation = false;
        button.disabled = false;
        button.innerHTML = originalButtonText;
        lucide.createIcons(); // Re-render lucide icons
    }
}

// LLM API Call for Cover Letter Snippet
async function generateCoverLetterSnippet() {
    if (loadingCoverLetter) return;

    loadingCoverLetter = true;
    generateCoverLetterBtn.disabled = true;
    const originalButtonText = generateCoverLetterBtn.innerHTML;

    generateCoverLetterBtn.innerHTML = `<i data-lucide="loader-2" class="animate-spin mr-3"></i> Generating Snippet...`;
    coverLetterText.textContent = 'Generating a personalized snippet...';
    coverLetterSnippetContainer.classList.add('cover-letter-snippet-container', 'show');
    lucide.createIcons(); // Re-render lucide icons

    const prompt = `Based on the following resume data, generate a concise (3-4 sentences) and compelling cover letter snippet that highlights key strengths relevant to a cybersecurity or full-stack development role. Focus on the objective, core skills, and internship experiences.

    Objective: ${resumeData.objective}
    Core Skills: ${resumeData.coreSkills.join(', ')}
    Internships: ${resumeData.internships.join('; ')}

    Cover Letter Snippet:`;

    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
    const payload = { contents: chatHistory };
    const apiKey = ""; // If you want to use models other than gemini-2.0-flash or imagen-3.0-generate-002, provide an API key here. Otherwise, leave this as-is.
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const text = result.candidates[0].content.parts[0].text;
            coverLetterText.textContent = text;
        } else {
            coverLetterText.textContent = 'Failed to generate snippet. Please try again.';
        }
    } catch (error) {
        console.error("Error generating cover letter snippet:", error);
        coverLetterText.textContent = 'An error occurred. Please try again.';
    } finally {
        loadingCoverLetter = false;
        generateCoverLetterBtn.disabled = false;
        generateCoverLetterBtn.innerHTML = originalButtonText;
        lucide.createIcons(); // Re-render lucide icons
    }
}

// Intersection Observer for scroll animations and active nav link
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 // Trigger when 20% of the section is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const targetId = entry.target.id;
        const targetElement = document.getElementById(targetId);

        if (entry.isIntersecting) {
            // Add 'visible' class for fade-in/slide-in animations
            targetElement.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .stagger-item').forEach((el, index) => {
                // Apply staggered delay for stagger-items
                if (el.classList.contains('stagger-item')) {
                    el.style.transitionDelay = `${index * 0.1}s`;
                }
                el.classList.add('visible');
            });
            updateActiveNavLink(targetId);
        }
        // Optionally remove 'visible' if you want elements to re-animate on scroll back
        // targetElement.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .stagger-item').forEach(el => {
        //     el.classList.remove('visible');
        // });
    });
}, observerOptions);

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    if (footerCurrentYear) {
        footerCurrentYear.textContent = new Date().getFullYear();
    }

    // Attach observers to sections
    navItems.forEach(item => {
        const section = document.getElementById(item.id);
        if (section && observer) {
            observer.observe(section);
        }
    });

    // Navbar links click handler
    if (navLinks) {
    navLinks.forEach(link => {
        // Only prevent default if data-section-id exists (for single-page scroll)
        if (link.dataset && link.dataset.sectionId) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                scrollToSection(link.dataset.sectionId);
            });
        }
        // Otherwise, let the browser navigate normally for multi-page links
    });
}

    // Mobile menu button handler
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }

    // Mobile nav buttons click handler
    if (mobileNavButtons && mobileNavButtons.length > 0){
        mobileNavButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                scrollToSection(button.dataset.sectionId);
            });
        });
    }

    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }

    // Generate Cover Letter button
    if (generateCoverLetterBtn) {
        generateCoverLetterBtn.addEventListener('click', generateCoverLetterSnippet);
    }

    // Skill LLM buttons
    if (skillLLMButtons) {
        skillLLMButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent parent card's click event
                generateSkillExplanation(button);
            });
        });
    }
});

// This script uses Formspree to send contact form messages to your email

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        status.classList.remove('hidden', 'bg-green-700', 'bg-red-700');
        status.textContent = 'Sending...';
        status.classList.add('bg-blue-700', 'text-white');

        // Replace with your Formspree endpoint
        const endpoint = 'https://formspree.io/f/myzwqjan'; // <-- Replace with your Formspree form ID

        const data = {
            name: form.name.value,
            email: form.email.value,
            subject: form.subject.value,
            message: form.message.value
        };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                status.textContent = 'Thank you! Your message has been sent.';
                status.classList.remove('bg-blue-700');
                status.classList.add('bg-green-700');
                form.reset();
            } else {
                status.textContent = 'Oops! Something went wrong. Please try again later.';
                status.classList.remove('bg-blue-700');
                status.classList.add('bg-red-700');
            }
        } catch (error) {
            status.textContent = 'Network error. Please try again later.';
            status.classList.remove('bg-blue-700');
            status.classList.add('bg-red-700');
        }
    });
});

// --- Automatic scrolling sliders for project cards ---
function autoScrollSlider(imgId, interval = 2000) {
    const img = document.getElementById(imgId);
    if (!img) return;
    const images = JSON.parse(img.getAttribute('data-images'));
    let idx = 0;
    setInterval(() => {
        idx = (idx + 1) % images.length;
        img.src = images[idx];
    }, interval);
}

document.addEventListener("DOMContentLoaded", function() {
    autoScrollSlider('malware-slider', 2000); // 2 seconds per image
    autoScrollSlider('food-slider', 2000);
});