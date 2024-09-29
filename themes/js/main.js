document.addEventListener("DOMContentLoaded", function() {
    // References to clickable text
    const aboutLink = document.getElementById('about-link');
    const portfolioLink = document.getElementById('portfolio-link');
    const contactLink = document.getElementById('contact-link');

    // Function to show the section based on ID
    function showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(div => div.style.display = 'none');
        
        // Show the clicked section
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.style.display = 'block';
        }
    }

    // Event Listeners for clickable text
    aboutLink.addEventListener('click', function() {
        showSection('about');
        history.pushState(null, "", '#about');  // Optional: Update URL with hash
    });

    portfolioLink.addEventListener('click', function() {
        showSection('portfolio');
        history.pushState(null, "", '#portfolio');  // Optional: Update URL with hash
    });

    contactLink.addEventListener('click', function() {
        showSection('contact');
        history.pushState(null, "", '#contact');  // Optional: Update URL with hash
    });

    // Handle page load with hash in URL
    const currentHash = window.location.hash.substring(1);
    if (currentHash) {
        showSection(currentHash);  // Show the section based on the current hash
    } else {
        showSection('about');  // Default section
    }
});
