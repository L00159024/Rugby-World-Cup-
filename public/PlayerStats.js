var sortDirection = 'asc';
var allPlayersPoints = [];
var allPlayers = [];

$(document).ready(function () {
    fetchPointsData();

    function fetchPointsData() {
        $.ajax({
            url: "http://localhost:3000/playerStatsPoints",
            type: "GET",
            dataType: "json",
            success: function (players) {
                allPlayersPoints = players;
                console.log("Points Data:", players);
                checkAndFillDropdown();
            },
            error: function (error) {
                console.error("Error fetching points players:", error);
            },
        });
    }

    function fetchTacklesData() {
        $.ajax({
            url: "http://localhost:3000/playerStatsTackles",
            type: "GET",
            dataType: "json",
            success: function (players) {
                console.log("Tackles Data:", players);
                allPlayers = players;
                displayPlayersTable(allPlayers);
                toggleColumns('Tackles');
            },
            error: function (error) {
                console.error("Error fetching tackles players:", error);
            },
        });
    }

    function checkAndFillDropdown() {
        if (allPlayersPoints.length) {
            fillDropdown();

            // Initially display points data
            allPlayers = allPlayersPoints;
            displayPlayersTable(allPlayers);
            toggleColumns('Points');
        }
    }

    function fillDropdown() {
        var sortingDropdown = $('#sortingDropdown');
        sortingDropdown.empty();

        sortingDropdown.append($('<option>').text('Points'));
        sortingDropdown.append($('<option>').text('Tackles'));

        sortingDropdown.on('change', function () {
            var selectedOption = $(this).val();
            toggleColumns(selectedOption);

            if (selectedOption === 'Points') {
                allPlayers = allPlayersPoints;
                displayPlayersTable(allPlayers);
            } else if (selectedOption === 'Tackles') {
                fetchTacklesData();
            }
        });
    }

    function toggleColumns(selectedOption) {
        var pointsColumn = $('.points-column');
        var tacklesColumn = $('.tackles-column');

        if (selectedOption === 'Points') {
            pointsColumn.show();
            tacklesColumn.hide();
        } else if (selectedOption === 'Tackles') {
            pointsColumn.hide();
            tacklesColumn.show();
        }
    }

    function displayPlayersTable(data) {
        var tableBody = $('#playersTableBody');
        tableBody.empty();

        if (Array.isArray(data) && data.length > 0) {
            data.forEach(function (player) {
                var row = $('<tr>');

                row.append($('<td>').text(player.player_id));

                var playerLink = $('<td>').append(
                    $('<a>').attr('href', "https://rugbyworldcup.com/2023/teams/" + player.team_name + "/player/" + player.player_id)
                        .attr('target', '_blank')
                        .text(player.player_name)
                );
                row.append(playerLink);

                var flagWithName = $("<td>").append(
                    $('<img>').attr('src', 'http://localhost/L00159024 (rwc23)/L00159024 (rwc23)/RWC/icons/' + player.team_id + '.png').css('width', '20px'),
                    $('<span>').text(player.team_name)
                );
                row.append(flagWithName);

                var pointsColumn = $('<td>').text(player.points).addClass('points-column');
                row.append(pointsColumn);

                // Ensure correct field for tackles
                var tacklesColumn = $('<td>').text(player.tackles).addClass('tackles-column').hide();
                row.append(tacklesColumn);

                tableBody.append(row);
            });
        } else {
            console.log("No players found.");
        }
    }
});
