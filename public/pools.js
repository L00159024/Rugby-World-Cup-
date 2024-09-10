function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function updatePoolTitle() {
    var poolParam = getParameterByName('pool');
    if (poolParam) {
        $('#poolTitle').text('Teams in Pool ' + poolParam);
        fetchTeamsInPool(poolParam); 
    }
}

function fetchTeamsInPool(pool) {
    if (pool) {
        $.ajax({
            url: "http://localhost:3000/pool/" + pool,
            type: "GET",
            dataType: "json",
            success: function (teams) {
                console.log("Teams successfully fetched:", teams);
                displayTeamsTable(teams);
            },
            error: function (error) {
                console.error("Error fetching teams:", error);
            },
        });
    } else {
        console.error("No pool parameter found.");
    }
}

function displayTeamsTable(teams) {
    var tableBody = $('#TableBody');

    tableBody.empty();

    teams.forEach(function (team) {
        var row = $('<tr>');

        var flags = $("<td>").append(
            $('<img>').attr('src', 'http://localhost/RWC-SSP/Backend/icons/' + team.id + '.png').css('width', '35'));
        row.append(flags);

        row.append($('<td>').text(team.name));

        tableBody.append(row);
    });
}

// Execute the functions when the document is ready
$(document).ready(function () {
    updatePoolTitle();

})