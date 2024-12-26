function getResumeData(username) {
    return JSON.parse(localStorage.getItem(username));
}

function displayResume() {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    const resumeData = getResumeData(username);

    if (resumeData) {
        const resumeDiv = document.getElementById('resume');
        resumeDiv.innerHTML = `
            <h1>${resumeData.name}'s Resume</h1>
            <p><strong>Contact:</strong> ${resumeData.contact}</p>
            <p><strong>Address:</strong> ${resumeData.address}</p>
            <p><strong>Email:</strong> ${resumeData.email}</p>
            <p><strong>Instagram:</strong> ${resumeData.instagram}</p>
            <p><strong>LinkedIn:</strong> ${resumeData.linkedin}</p>
            <div class="resume-section">
                <h2>Academic Qualifications</h2>
                <p>${resumeData.education}</p>
            </div>
            <div class="resume-section">
                <h2>Field Expertise</h2>
                <p>${resumeData.expertise}</p>
            </div>
            <div class="resume-section">
                <h2>Skills</h2>
                <p>${resumeData.skills.join(', ')}</p>
            </div>
            <div class="resume-section">
                <h2>Employment Experience</h2>
                <p>${resumeData.experience}</p>
            </div>
        `;

        // Set the resume shareable link
        const resumeLink = window.location.href;
        document.getElementById('resumeLinkText').innerHTML = `You can share your resume using this link: <a href="${resumeLink}" target="_blank">${resumeLink}</a>`;
    } else {
        document.getElementById('resume').innerText = 'Resume not found.';
    }
}


function downloadResume() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const maxWidth = 180; // Maximum width for text wrapping
    let yPosition = 10; // Starting Y position for the first field
    const lineSpacing = 8; // Space between lines of text
    const sectionSpacing = 12; // Space between sections (heading + content)

    // Function to add a section (heading + content) to the PDF
    function addSection(heading, content) {
        doc.setFont("helvetica", "bold");
        doc.text(heading, 10, yPosition); // Add the heading
        yPosition += lineSpacing; // Move down for the content

        doc.setFont("helvetica", "normal");
        const wrappedText = doc.splitTextToSize(content, maxWidth);
        doc.text(wrappedText, 10, yPosition); // Add the content
        yPosition += wrappedText.length * lineSpacing + sectionSpacing; // Adjust Y position based on content length
    }

    // Retrieve resume data from local storage or source
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    const resumeData = JSON.parse(localStorage.getItem(username));

    if (!resumeData) {
        alert("No resume data found!");
        return;
    }

    // Add all sections to the PDF
    addSection('Name:', resumeData.name);
    addSection('Contact:', resumeData.contact);
    addSection('Address:', resumeData.address);
    addSection('Email:', resumeData.email);
    addSection('Instagram:', resumeData.instagram);
    addSection('LinkedIn:', resumeData.linkedin);
    addSection('Academic Qualifications:', resumeData.education);
    addSection('Field Expertise:', resumeData.fieldExpertise);
    addSection('Skills:', resumeData.skills.join(', '));
    addSection('Employment Experience:', resumeData.experience);

    // Save the PDF
    doc.save(`${resumeData.name}_resume.pdf`);
}

document.getElementById('downloadBtn').addEventListener('click', downloadResume);
window.onload = displayResume;
