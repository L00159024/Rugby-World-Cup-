$(document).ready(function () {

    var loggedIn = getCookie("loggedIn");
    if (loggedIn === "true") {
        $('#LogInLink').hide();
    }

    $('#LogInBtn').on('click', function () {
        var email = $('#email').val();
        var password = $('#password').val();

        // Check if the email and password are correct
        if (email === 'thomas.devine@atu.ie' && password === 'letmein') {
            document.cookie = "loggedIn=true; path=/";
            console.log("Login successful. Redirecting to admin.html.");
            $('#LogInLink').hide();
            window.location.href = 'admin.html';
        } else {
            alert('Invalid email or password. Please try again.');
        }
    });

    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
    }
});
