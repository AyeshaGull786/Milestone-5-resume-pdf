document.getElementById('resumeForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var contact = document.getElementById('contact').value;
    var email = document.getElementById('email').value;
    var address = document.getElementById('address').value;
    var instagram = document.getElementById('instagram').value;
    var linkedin = document.getElementById('linkedin').value;
    var education = document.getElementById('education').value;
    var expertise = document.getElementById('expertise').value;
    var skills = document.getElementById('skills').value.split(',').map(function (skill) { return skill.trim(); });
    var experience = document.getElementById('experience').value;
    var resumeData = { name: name, contact: contact, email: email, address: address, instagram: instagram, linkedin: linkedin, education: education, expertise: expertise, skills: skills, experience: experience };
    var username = name.toLowerCase().replace(" ", "_"); // Generate a unique username
    localStorage.setItem(username, JSON.stringify(resumeData));
    // Redirect to the resume page with the username as a URL parameter
    window.location.href = "resume.html?username=".concat(username);
});
