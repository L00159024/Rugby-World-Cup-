        $(document).ready(function () {
            function TeamNameFromUrl() {
                var urlParams = new URLSearchParams(window.location.search);
                return urlParams.get('team');
            }

            var teamName = TeamNameFromUrl();
            if (teamName) {
                $.ajax({
                    url: "http://localhost:3000/results/" + teamName,
                    type: "GET",
                    dataType: "json",
                    success: function (data) {
                        console.log("Received data:", data);
                        displayResultsTable(data);
                    },
                    error: function (error) {
                        console.error("Error fetching data:", error);
                    },
                });
            } else {
                console.error("Team name not found in the URL.");
            }

            function displayResultsTable(data) {
                var tableBody = $("#TableBody");

                tableBody.empty();

                data.forEach(function (result) {
                    var row = $("<tr>");
                    row.append($("<td>").text(result.date + " " + result.time));
                    row.append($("<td>").text(result.stage));

                    var flags = $("<td>").append(
                        $("<img>")
                            .attr(
                                "src",
                                "http://localhost/RWC-SSP/Backend/icons/" + result.team1_id + ".png"
                            )
                            .css("width", "20")
                    );
                    row.append(flags);

                    // Create a link for team1
                    var teamLink1 = $("<a>")
                        .attr({
                            href:
                                "ResultsByTeam.html?team=" + encodeURIComponent(result.team1_name),
                        })
                        .text(result.team1_name);

                    row.append($("<td>").append(teamLink1));
                    row.append($("<td>").text(result.team1_score + " - " + result.team2_score));

                    // Create a link for team2
                    var teamLink2 = $("<a>")
                        .attr({
                            href:
                                "ResultsByTeam.html?team=" + encodeURIComponent(result.team2_name),
                        })
                        .text(result.team2_name);

                    var flags1 = $("<td>").append(
                        $("<img>")
                            .attr(
                                "src",
                                "http://localhost/RWC-SSP/Backend/icons/" + result.team2_id + ".png"
                            )
                            .css("width", "20")
                    );
                    row.append(flags1);
                    row.append($("<td>").append(teamLink2));

                    row.append($("<td>").text(result.venue_name));

                    tableBody.append(row);
                });
            }
        });