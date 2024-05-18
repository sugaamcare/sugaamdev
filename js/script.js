function togglePopup() {
    const popup = document.getElementById('popup');
    if (popup.style.display === 'block') {
        popup.style.display = 'none';
    } else {
        popup.style.display = 'block';
    }
}

// Show popup on page load
document.addEventListener('DOMContentLoaded', () => {
    togglePopup();
});
