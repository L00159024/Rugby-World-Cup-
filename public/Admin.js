$(document).ready(function () {
    // Function to get results data and display
    function getResultsData(selectedStage) {
        var url = "http://localhost:3000/results";

        console.log("Request URL:", url);

        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            success: function (data) {
                console.log("Received data:", data);
                displayResultsTable(data);
                //fillDropdown(data);
            },
            error: function (error) {
                console.error("Error fetching data:", error);
            },
        });
    }

    function displayResultsTable(data) {
        var tableBody = $(".table tbody");

        tableBody.empty();

        data.forEach(function (result) {
            var row = $("<tr>");
            var formattedDate = new Date(result.date).toLocaleDateString('en-GB');

          row.append($("<td>").text(formattedDate + " " + result.time));
            row.append($("<td>").text(result.stage));

            var flags = $("<td>").append(
                $("<img>")
                    .attr(
                        "src",
                        "http://localhost/L00159024 (rwc23)/L00159024 (rwc23)/RWC/icons/" + result.team1_id + ".png"
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

            var inputTeam1 = $("<input>").attr({ type: "text", placeholder: result.team1_score }).css("width", "50px");
            row.append($("<td>").append(inputTeam1));

            var inputTeam2 = $("<input>").attr({ type: "text", placeholder: result.team2_score }).css("width", "50px");
            row.append($("<td>").append(inputTeam2));

            var flags1 = $("<td>").append(
                $("<img>")
                    .attr(
                        "src",
                        "http://localhost/L00159024 (rwc23)/L00159024 (rwc23)/RWC/icons/" + result.team2_id + ".png"
                    )
                    .css("width", "20")
            );
            row.append(flags1);

            // Create a link for team2
            var teamLink2 = $("<a>")
                .attr({
                    href:
                        "ResultsByTeam.html?team=" + encodeURIComponent(result.team2_name),
                })
                .text(result.team2_name);
            row.append($("<td>").append(teamLink2));

            row.append($("<td>").text(result.name));

            var updateButton = $("<button>")
                .attr({ type: "button", class: "btn btn-primary" })
                .text("Update")
                .on("click", function () {
                    var newTeam1Score = inputTeam1.val();
                    var newTeam2Score = inputTeam2.val();

                    // Check if there's a change in at least one score before sending the update request
                    if ((newTeam1Score !== "") || (newTeam2Score !== "")) {
                        $.ajax({
                            url: "http://localhost:3000/updateScores",
                            type: "POST",
                            dataType: "json",
                            data: {
                                resultId: result.match_id,
                                newTeam1Score: newTeam1Score !== "" ? newTeam1Score : result.team1_score,
                                newTeam2Score: newTeam2Score !== "" ? newTeam2Score : result.team2_score,
                            },
                            success: function (response) {
                                console.log("Scores updated successfully!", response);
                            },
                            error: function (error) {
                                console.error("Error updating scores:", error);
                            }
                        });
                    }
                });

            row.append($("<td>").append(updateButton));
            tableBody.append(row);
        });
    }
/*
    function fillDropdown(data) {
        var stageDropdown = $("#stageDropdown");
        var allResults = data;

        stageDropdown.empty();

        var uniqueStages = [...new Set(data.map((result) => result.stage))];

        uniqueStages.forEach(function (stage) {
            stageDropdown.append($("<option>").text(stage));
        });

        stageDropdown.on("change", function () {
            var selectedStage = $(this).val();

            displayResultsTable(
                selectedStage
                    ? filterResultsByStage(allResults, selectedStage)
                    : allResults
            );
        });
    }

    function filterResultsByStage(results, selectedStage) {
        return results.filter((result) => result.stage === selectedStage);
    } */

    getResultsData();
});
