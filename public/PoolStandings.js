//shade of top 2 teams not applying

function fetchTeamsInPool(pool) {
    $.ajax({
        url: "http://localhost:3000/pool/" + pool,
        type: "GET",
        dataType: "json",
        success: function (teams) {
            console.log("Teams for pool " + pool + " successfully fetched:", teams);
            displayTeamsTable(teams, pool);
        },
        error: function (error) {
            console.error("Error fetching teams for pool " + pool + ":", error);
        },
    });
}

function displayTeamsTable(teams, pool) {
    var tableBody = $('#TableBody' + pool);
    tableBody.empty();

    teams.forEach(function (team, index) {
        var row = $('<tr>');

        row.append($('<td>').text(team.position));

        // flag with name in one column
        var flagWithName = $("<td>").append(
            $('<img>').attr('src', 'http://localhost/L00159024 (rwc23)/L00159024 (rwc23)/RWC/icons/' + team.id + '.png').css("width", "35"),
            $('<span>').text(team.name)
        );
        row.append(flagWithName);

        row.append($('<td>').text(team.pd));
        row.append($('<td>').text(team.w));
        row.append($('<td>').text(team.d));
        row.append($('<td>').text(team.l));
        row.append($('<td>').text(team.pf));
        row.append($('<td>').text(team.pa));
        row.append($('<td>').text(team.bonus));
        row.append($('<td>').text(team.pts));

        if (index < 2) {
            row.addClass('highlight-row').css("background-color", "#DDD");
        }

        tableBody.append(row);
    });
}


$(document).ready(function () {
    fetchTeamsInPool("A");
    fetchTeamsInPool("B");
    fetchTeamsInPool("C");
    fetchTeamsInPool("D");
});
