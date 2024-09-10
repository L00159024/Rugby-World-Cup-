$(document).ready(function() {
    function getVenuesData() {
        $.ajax({
            url: 'http://localhost:3000/venues',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                displayVenuesTable(data);
            },
            error: function(error) {
                console.error('Error fetching data:', error);
            }
        });
    }

    function displayVenuesTable(data) {
        var tableBody = $('.table tbody');

        tableBody.empty();

        var counter = 1;
        
        data.forEach(function(venue) {
            var row = $('<tr>');
            row.append($('<td>').text(counter++));
            row.append($('<td>').text(venue.name));

            tableBody.append(row);
        });
    }

    getVenuesData();
});
