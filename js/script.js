document.addEventListener('DOMContentLoaded', function () {
    openPopup();
});

function openPopup() {
    document.getElementById('popup').classList.add('active');
    document.getElementById('reopen-btn').style.display = 'none';
}

function closePopup() {
    document.getElementById('popup').classList.remove('active');
    document.getElementById('reopen-btn').style.display = 'block';
}

document.getElementById('popup').addEventListener('click', function (e) {
    if (e.target === this) {
        closePopup();
    }
});

document.getElementById('popup-form').addEventListener('submit', function (e) {
    var name = this.querySelector('input[name="entry.YOUR_NAME_FIELD_ID"]').value;
    var phone = this.querySelector('input[name="entry.YOUR_PHONE_FIELD_ID"]').value;
    
    
    if (name === "" || phone === "" ) {
        e.preventDefault();
        alert("Please fill in all fields");
    }
});