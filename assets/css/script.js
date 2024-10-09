// Toggle search bar visibility on search icon click
document.getElementById('search-icon').addEventListener('click', function() {
    const searchBar = document.getElementById('search-bar');
    searchBar.classList.toggle('active');
    searchBar.focus(); // Focus on the search bar when it becomes visible
});

// Change header background and text color on scroll
window.addEventListener('scroll', function() {
    const header = document.getElementById('main-header');
    if (window.scrollY > window.innerHeight * 0.5) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


