document.addEventListener("DOMContentLoaded", function() {
    // Function to show the section based on path
    function showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(div => div.style.display = 'none');
        
        // Show the clicked section
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.style.display = 'block';
        }
    }

    // Handle page load with path
    const currentPath = window.location.pathname.replace('/', '') || 'home';
    showSection(currentPath);
});
