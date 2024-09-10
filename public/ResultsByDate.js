document.addEventListener("DOMContentLoaded", function () {
    let DefaultDate = new Date('2023-09-08T00:00:00');

    function setCurrentDate() {
        const currentDateElement = document.getElementById("DefaultDate");
        if (currentDateElement) {
            currentDateElement.textContent = formatDate(DefaultDate);
            getResultsData(DefaultDate);
        }
    }

    function goBack() {
        const current = new Date(DefaultDate);
        current.setDate(current.getDate() - 1);
        DefaultDate = current;
        updateCurrentDate();
    }

    function goForward() {
        const current = new Date(DefaultDate);
        current.setDate(current.getDate() + 1);
        DefaultDate = current;
        updateCurrentDate();
    }

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function updateCurrentDate() {
        const currentDateElement = document.getElementById("DefaultDate");
        if (currentDateElement) {
            currentDateElement.textContent = formatDate(DefaultDate);
            getResultsData(DefaultDate);
        }
    }

    function getResultsData(date) {
        $.ajax({
            url: "http://localhost:3000/resultsByDate/" + formatDate(date),
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
    }

    // Event listener for the "<<" button
    const btnBack = document.getElementById("btnBack");
    if (btnBack) {
        btnBack.addEventListener("click", goBack);
    }

    // Event listener for the ">>" button
    const btnForward = document.getElementById("btnForward");
    if (btnForward) {
        btnForward.addEventListener("click", goForward);
    }

    setCurrentDate();
});

function displayResultsTable(data) {
    var tableBody = $("#TableBody");

    tableBody.empty();

    if (data.length === 0) {
        // Display a message if there are no matches
        var noMatchesRow = $("<tr>").append($("<td>").attr("colspan", "7").text("No matches for this day"));
        tableBody.append(noMatchesRow);
    } else {
        data.forEach(function (result) {
            var row = $("<tr>");

            var formattedDate = new Date(result.date).toLocaleDateString('en-GB');

            row.append($("<td>").text(formattedDate));
            row.append($("<td>").text(result.stage));

            var flags = $("<td>").append(
                $("<img>")
                    .attr(
                        "src",
                        "http://localhost/L00159024 (rwc23)/L00159024 (rwc23)/RWC/icons/" + result.team1_id + ".png"
                    ).css("width", "20")
            );
            row.append(flags);

            var teamLink1 = $("<a>")
                .attr({
                    href:
                        "ResultsByTeam.html?team=" + encodeURIComponent(result.team1_name),
                })
                .text(result.team1_name);

            row.append($("<td>").append(teamLink1));
            row.append($("<td>").text(result.team1_score + " - " + result.team2_score));

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
                        "http://localhost/L00159024 (rwc23)/L00159024 (rwc23)/RWC/icons/" + result.team2_id + ".png"
                    )
                    .css("width", "20")
            );
            row.append(flags1);
            row.append($("<td>").append(teamLink2));

            row.append($("<td>").text(result.venue_name));

            tableBody.append(row);
        });
    }
}
