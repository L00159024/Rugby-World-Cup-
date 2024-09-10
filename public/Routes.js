$(document).ready(function () {

    //get venues data
    function getVenuesData() {
        $.ajax({
            url: 'http://localhost:3000/venues',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                $('#textarea').val(JSON.stringify(data));
            },
            error: function (error) {
                console.error('Error fetching data:', error);
            }
        });
    }

    //when btn is clicked
    $('#getVenuesBtn').on('click', function () {
        getVenuesData();
    });

    //get teams
    function getTeamsData() {
        $.ajax({
            url: 'http://localhost:3000/teams',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                $('#textarea').val(JSON.stringify(data));
            },
            error: function (error) {
                console.error('Error fetching data:', error);
            }
        });
    }

    //when btn is clicked
    $('#getTeamsBtn').on('click', function () {
        getTeamsData();
    });

    //get pool teams
    function getPoolTeamsData() {
        $.ajax({
            url: 'http://localhost:3000/teams/A',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                // Update the textarea with the received JSON response
                $('#textarea').val(JSON.stringify(data));
            },
            error: function (error) {
                console.error('Error fetching data:', error);
            }
        });
    }

    //when btn is clicked
    $('#getPoolTeamsBtn').on('click', function () {
        getPoolTeamsData();
    });
});
