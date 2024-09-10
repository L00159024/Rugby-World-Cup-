var sortDirection = 'asc';

$(document).ready(function () {

    function GetTeamPools() {
        $.ajax({
            url: "http://localhost:3000/TeamPools",
            type: "GET",
            dataType: "json",
            success: function (data) {
                displayTeamPools(data);
            },
            error: function (error) {
                console.error("Error fetching data:", error);
            },
        });
    }

    function displayTeamPools(data) {
        var tableBody = $(".table tbody");

        tableBody.empty();

        // Sort data alphabetically by names or by pool based on sortDirection
        data.sort((a, b) => {
            if (sortDirection === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return a.pool.localeCompare(b.pool);
            }
        });

        data.forEach(function (venue) {
            var row = $("<tr>");

            var flags = $("<td>").append(
                $('<img>').attr('src', 'http://localhost/L00159024 (rwc23)/L00159024 (rwc23)/RWC/icons/' + venue.id + '.png').css('width', '35'));
            row.append(flags);

            row.append($("<td>").text(venue.name));

            // Create a link for the venue.pool
            var poolLink = $("<a>").attr({
                href: "pools.html?pool=" + encodeURIComponent(venue.pool)
            }).text(venue.pool);

            row.append($("<td>").append(poolLink));

            tableBody.append(row);
        });
    }

    $('#sortPool').on('click', function () {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        GetTeamPools();
    });

    GetTeamPools();
});
