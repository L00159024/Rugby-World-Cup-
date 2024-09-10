var sortDirection = 'asc';
var allPlayers = []; 

$(document).ready(function () {

    
    fetchAllPlayers();

    function fetchAllPlayers() {
        // Fetch players
        $.ajax({
            url: "http://localhost:3000/players",
            type: "GET",
            dataType: "json",
            success: function (players) {
                allPlayers = players;

                var uniqueTeamNames = [...new Set(players.map(player => player.team_name))];

                fillDropdown(uniqueTeamNames);

                displayPlayersTable(allPlayers);
            },
            error: function (error) {
                console.error("Error fetching players:", error);
            },
        });
    }

    function fillDropdown(teamNames) {
        var teamDropdown = $('#teamDropdown');

        teamDropdown.empty();

        teamDropdown.append($('<option>').text('All Players'));

        teamNames.forEach(function (teamName) {
            teamDropdown.append($('<option>').text(teamName));
        });

        teamDropdown.on('change', function () {
            var selectedTeamName = $(this).val();
            filterPlayersByTeam(selectedTeamName);
        });
    }

    function displayPlayersTable(data) {
        var tableBody = $('#playersTableBody');

        tableBody.empty();

        if (Array.isArray(data) && data.length > 0) {
            data.forEach(function (player) {
                var row = $('<tr>');

                var flags = $("<td>").append(
                    $('<img>').attr('src', 'http://localhost/L00159024 (rwc23)/L00159024 (rwc23)/RWC/icons/' + player.player_team_id + '.png').css('width', '35'));
                row.append(flags);

                row.append($('<td>').text(player.player_name));
                row.append($('<td>').text(player.team_name));

                var infoLink = $('<td>').append(
                    $('<a>').attr('href', "https://rugbyworldcup.com/2023/teams/" + player.team_name + "/player/" + player.player_id)
                        .attr('target', '_blank')  
                        .text("Player Info")
                );
                row.append(infoLink);

                tableBody.append(row);
            });
        } else {
            console.log("No players found.");
        }
    }

    function filterPlayersByTeam(selectedTeamName) {
        if (selectedTeamName === 'All Players') {
            // Display all players
            displayPlayersTable(allPlayers);
        } else {
            var filteredPlayers = allPlayers.filter(player => player.team_name === selectedTeamName);

            displayPlayersTable(filteredPlayers);
        }
    }
});
