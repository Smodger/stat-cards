const data = require('../../player-stats.json')

console.log('Hello World', data.players);

let id = null;
const select = document.getElementById("drop-down");
const options = data.players;

for(let i = 0; i < options.length; i++) {
  let opt = options[i];
  let element = document.createElement("option");
  element.textContent = opt.player.name.first + ' ' + opt.player.name.last;
  element.value = opt.player.id;
  select.appendChild(element);
}

select.onchange = function(e) {
  id = parseInt(e.srcElement.value);
  getPlayerStats(id)
}

if(!id){
  // get default player to be shown on load
  id = 4916
  getPlayerStats(id)
}

function getPlayerStats(id){
  let player = data.players.filter((playerInfo) => {
    if(playerInfo.player.id === id){

      let name = playerInfo.player.name.first + ' ' + playerInfo.player.name.last

      let appearances = playerInfo.stats
        .filter(({name}) => name === 'appearances')
        .map(({value}) => value)

      let goals = playerInfo.stats
        .filter(({name}) => name === 'goals')
        .map(({value}) => value);

      let assists = playerInfo.stats
        .filter(({name}) => name === 'goal_assist')
        .map(({value}) => value ? value : 0);

      let forwardPass = playerInfo.stats
        .filter(({name}) => name === 'fwd_pass')
        .map(({value}) => value);

      let backwardPass = playerInfo.stats
        .filter(({name}) => name === 'backward_pass')
        .map(({value}) => value)

      let minsPlayed = playerInfo.stats
        .filter(({name}) => name === 'mins_played')
        .map(({value}) => value)

      document.getElementById("name").innerHTML = name;
      document.getElementById("stat-apps").innerHTML = appearances;
      document.getElementById("stat-goals").innerHTML = goals;
      document.getElementById("stat-assists").innerHTML = assists;

      getTotalPasses(forwardPass, backwardPass, minsPlayed);
      goalsPerGame(goals, appearances);
      getPosition(playerInfo.player.info.position);
      getPlayerGraphics(playerInfo.player)
    }
  })
}

function getTotalPasses(forward, backward, minsPlayed) {
  let totalPasses = forward[0] + backward[0]

  passesPerMin(minsPlayed, totalPasses)
}

function passesPerMin(minsPlayed, passes){
  let ppm = (passes / minsPlayed).toFixed(2)

  document.getElementById("stat-ppm").innerHTML = ppm;
}

function goalsPerGame(goals, appearances){
  let gpp = (goals[0] / appearances[0]).toFixed(2);

  document.getElementById("stat-gpm").innerHTML = gpp;
}

function getPlayerGraphics(playerDetails){
  let logo = document.getElementById("emblem");
  let playerPic = document.getElementById("player");

  let clubName = playerDetails.currentTeam.name.replace(/\s+/g, '-').toLowerCase();
  let playerName =playerDetails.name.first.toLowerCase();

  if(clubName === 'tottenham-hotspur'){
    logo.removeAttribute('class');
    logo.classList.add(clubName + "-logo");

    playerPic = "./src/style/images/toby.png";
    document.getElementById('player').src = playerPic;
  }

  if(clubName === 'arsenal'){
    logo.removeAttribute('class');
    logo.classList.add(clubName + "-logo");

    playerPic = "./src/style/images/per.png";
    document.getElementById('player').src = playerPic;
  }

  if(clubName === 'leicester-city'){
    logo.removeAttribute('class');
    logo.classList.add(clubName + "-logo");

    playerPic = "./src/style/images/riyad.png";
    document.getElementById('player').src = playerPic;
  }

  if(clubName === 'manchester-united'){
    logo.removeAttribute('class');
    logo.classList.add(clubName + "-logo");

    playerPic = "./src/style/images/wayne.png";
    document.getElementById('player').src = playerPic;
  }

  if(clubName === 'manchester-city'){
    logo.removeAttribute('class');
    logo.classList.add(clubName + "-logo");

    playerPic = "./src/style/images/yaya.png";
    document.getElementById('player').src = playerPic;
  }

}

function getPosition(pos){
  switch(pos){
    case 'G':
      document.getElementById("position").innerHTML = "Goalkeeper";
      break;
    case 'D':
      document.getElementById("position").innerHTML = "Defender";
      break;
    case 'M':
      document.getElementById("position").innerHTML = "Midfielder";
      break;
    case 'F':
      document.getElementById("position").innerHTML = "Forward";
      break;
    default:
      document.getElementById("position").innerHTML = "Player";
  }
}
