document.getElementById('resumeForm')!.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const contact = (document.getElementById('contact') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const address = (document.getElementById('address') as HTMLInputElement).value;
    const instagram = (document.getElementById('instagram') as HTMLInputElement).value;
    const linkedin = (document.getElementById('linkedin') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLInputElement).value;
    const expertise = (document.getElementById('expertise') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',').map(skill => skill.trim());
    const experience = (document.getElementById('experience') as HTMLInputElement).value;

    const resumeData = { name, contact, email, address, instagram, linkedin, education, expertise, skills, experience };

    const username = name.toLowerCase().replace(" ", "_"); // Generate a unique username
    localStorage.setItem(username, JSON.stringify(resumeData));

    // Redirect to the resume page with the username as a URL parameter
    window.location.href = `resume.html?username=${username}`;
});
