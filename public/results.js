$(document).ready(function () {

  //get results data and display
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
              fillDropdown(data);
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

          // Format the date without the time
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
          row.append($("<td>").text(result.team1_score + "-" + result.team2_score));

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
                      "http://localhost/L00159024 (rwc23)/L00159024 (rwc23)/RWC/icons/" + result.team2_id + ".png"
                  )
                  .css("width", "20")
          );
          row.append(flags1);
          row.append($("<td>").append(teamLink2));

          row.append($("<td>").text(result.name));

          tableBody.append(row);
      });
  }

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
  }

  // Call the getResultsData function when the document is ready without a selected stage
  getResultsData();
});
