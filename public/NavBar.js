$(document).ready(function () {
  var loggedIn = getCookie("loggedIn");

  var NavBar = `
      <img src='http://localhost/L00159024 (rwc23)/L00159024 (rwc23)/RWC/icons/logo2.png' style='width: 100px; height: 100px; padding: 3px;'>
      <a href="routes.html">Routes</a> |
      <a href="Venues.html">Venues</a> |
      <a href="teams.html">Teams</a> |
      <a href="Players.html">Players</a> |
      <a href="Results.html">Results</a> |
      <a href="ResultsByDate.html">Results by Date</a> |
      <a href="PoolStandings.html">Pool Standings</a> |
      <a href="PlayerStats.html">Player Stats</a> |
      <a id="LogInLink" href="LogIn.html">Login</a>
      <a id="adminLink" href="Admin.html"> Admin</a> |
      <a id="LogOutLink" href="#"> LogOut</a>
  `;

  $(".NavBar").append(NavBar);

  if (loggedIn === "true") {
      $('#LogInLink').hide();
  } else {
      $('#LogOutLink').hide();
      $('#adminLink').hide();
  }

  $('#LogOutLink').on('click', function () {
      document.cookie = "loggedIn=false; path=/";
      $('#LogOutLink').hide();
      $('#adminLink').hide();
      $('#LogInLink').show();
      window.location.href = 'LogIn.html';

  });

  function getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length === 2) return parts.pop().split(";").shift();
  }
});
