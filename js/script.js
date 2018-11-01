// objet Player
var player = {
  coordinates: "",
  currentSelection: "",
  tries: 0,
  choices: [],
  hasWon: false,
  hasLost: false,
};

var master = {
  colors: [],
};

// Déclarations des variables la PREMIERE FOIS
var row = 9 - player.tries;
var square0 = $("#" + row + "-0");
var square1 = $("#" + row + "-1");
var square2 = $("#" + row + "-2");
var square3 = $("#" + row + "-3");

// Cacher le bouton submit à l'ouverture de la page
$( document ).ready(function() {
  submitBtn.hide();
});

// Start new game
var startBtn = $(".info button");

startBtn.click(function() {
  console.log("coucou start");
  refreshVars();
  resetGame();
  flushPlayerSelection();
  generateMasterColors();
  refreshVars();
  activateNTry();
  activateBreathing();
});


// submit your colors 
var submitBtn = $(".board button");

submitBtn.click(function() {
  console.log("coucou submit");
  submitBtn.hide();
  pushSelection();
  deactivateNTry();
    if (player.choices.length === 4) {
      compareSelections();
      hasWon();
      hasLost();
      flushPlayerSelection();
      incrementTries();
      refreshVars()
      activateNTry();
      activateBreathing();
    }
});

// Play again in the popup
 var playAgainBtn = $(".restart");

 playAgainBtn.click(function() {
  resetGame();
  refreshVars();
  flushPlayerSelection();
  generateMasterColors();
  refreshVars();
  activateNTry();
  activateBreathing();
 });

function activateBreathing() {
  // Active le flickr FX sur la ligne concernée
  square0.addClass("breathe");
  square1.addClass("breathe");
  square2.addClass("breathe");
  square3.addClass("breathe");
}

function makeSquareBreathe() {
  if (player.coordinates === square0) {
    square0.addClass("breathe");
    square1.removeClass("breathe");
    square2.removeClass("breathe");
    square3.removeClass("breathe");
  }
  if (player.coordinates === square1) {
    square1.addClass("breathe");
    square0.removeClass("breathe");
    square2.removeClass("breathe");
    square3.removeClass("breathe");
  }
  if (player.coordinates === square2) {
    square2.addClass("breathe");
    square0.removeClass("breathe");
    square1.removeClass("breathe");
    square3.removeClass("breathe");
  }
  if (player.coordinates === square3) {
    square3.addClass("breathe");
    square0.removeClass("breathe");
    square1.removeClass("breathe");
    square2.removeClass("breathe");
  }
}

function clearBreathing() {
  player.coordinates.removeClass("breathe");
}


// Fonction qui active le choix des couleurs
function activateClick() {
  
  // Variables des couleurs choisies
  var colorWhite = $(".pick-colors .white");
  var colorYellow = $(".pick-colors .yellow");
  var colorPink = $(".pick-colors .pink");
  var colorPurple = $(".pick-colors .purple");
  var colorBlue = $(".pick-colors .blue");
  var colorGreen = $(".pick-colors .green");


  colorWhite.click(function() {
    console.log("coucou white");
    player.currentSelection = "white";
    activateColor();
    displaySubmitBtn();
    clearBreathing();
  });
  
  colorYellow.click(function() {
    console.log("coucou yellow");
    player.currentSelection = "yellow";
    activateColor();
    displaySubmitBtn();
    clearBreathing()
  });
  
  colorPink.click(function() {
    console.log("coucou pink");
    player.currentSelection = "pink";
    activateColor();
    displaySubmitBtn();
    clearBreathing();
  });
  
  colorPurple.click(function() {
    console.log("coucou purple");
    player.currentSelection = "purple";
    activateColor();
    displaySubmitBtn();
    clearBreathing();
  });
  
  colorBlue.click(function() {
    console.log("coucou blue");
    player.currentSelection = "blue";
    activateColor();
    displaySubmitBtn();
    clearBreathing();
  });
  
  colorGreen.click(function() {
    console.log("coucou green");
    player.currentSelection = "green";
    activateColor();
    displaySubmitBtn();
    clearBreathing();
  });
}

// Fonction qui modifie la class de la case par couleur
function activateColor() {
  switch(player.currentSelection) {
    case "white":
      player.coordinates.addClass("white");
      player.coordinates.removeClass("yellow pink purple blue green");
      break;
    case "yellow":
      player.coordinates.addClass("yellow");
      player.coordinates.removeClass("white pink purple blue green");
      break;
    case "pink":
      player.coordinates.addClass("pink");
      player.coordinates.removeClass("white yellow purple blue green");
      break;
    case "purple":
      player.coordinates.addClass("purple");
      player.coordinates.removeClass("white yellow pink blue green");
      break;
    case "blue":
      player.coordinates.addClass("blue");
      player.coordinates.removeClass("white yellow pink purple green");
      break;
    case "green":
      player.coordinates.addClass("green");
      player.coordinates.removeClass("white yellow pink purple blue");
      break;      
  }
}


// générer les couleurs aléatoires du master

function generateMasterColors() {
  var colors = ["white", "yellow", "pink", "purple", "blue", "green"];
  for (var i = 0; i < 4; i++) {
    var randomIndex = Math.floor(Math.random() * colors.length);
    master.colors.push(colors[randomIndex]);
    colors.splice(randomIndex, 1);
  }
  console.log(master.colors);
  return master.colors;
}

 
  // Adds up to the player.tries and refreshes the variables 
function incrementTries() {
  player.tries++;
}

function refreshVars() {
  if (player.tries < 10) {
    row = 9 - player.tries;
    square0 = $("#" + row + "-0");
    square1 = $("#" + row + "-1");
    square2 = $("#" + row + "-2");
    square3 = $("#" + row + "-3");
  } 
}


// Active la rangée à cliquer + rend clickable chaque case 
function activateNTry() {
  square0.removeClass("inactive");
  square1.removeClass("inactive");
  square2.removeClass("inactive");
  square3.removeClass("inactive");

  square0.click(function() {
    console.log("#" + row + "-0", square0);
    player.coordinates =  square0;
    makeSquareBreathe();
  });

  square1.click(function() {
    console.log("#" + row + "-0", square1);
    player.coordinates =  square1;
    makeSquareBreathe();
  });

  square2.click(function() {
    console.log("#" + row + "-0", square2);
    player.coordinates =  square2;
    makeSquareBreathe();
  });

  square3.click(function() {
    console.log("#" + row + "-0", square3);
    player.coordinates =  square3; 
    makeSquareBreathe();
  });
  activateClick();
}

// Désactive le clic de la rangée qui vient d'être cliquée
function deactivateNTry() {
  
  square0.addClass("inactive");
  square1.addClass("inactive");
  square2.addClass("inactive");
  square3.addClass("inactive");
}

function displaySubmitBtn() {
  var colors = ["white", "yellow", "pink", "purple", "blue", "green"];
  var colorsStaged = [];
  for (var i = 0; i < colors.length; i++) {
    if (square0.hasClass(colors[i])) {
      colorsStaged.push(true);
    }
    if (square1.hasClass(colors[i])) {
      colorsStaged.push(true);
    }
    if (square2.hasClass(colors[i])) {
      colorsStaged.push(true);
    }
    if (square3.hasClass(colors[i])) {
      colorsStaged.push(true);
    }
  }
  if ((colorsStaged.length === 4) && (!colorsStaged.includes(false))) {
    console.log(colorsStaged);
    submitBtn.show();
  }
}

function hasWon() {
  if (player.hasWon) {
    $(".popup-won").addClass("showing");
    player.tries = 0;
    $(".master0").addClass(master.colors[0]);
    $(".master1").addClass(master.colors[1]);
    $(".master2").addClass(master.colors[2]);
    $(".master3").addClass(master.colors[3]);
  }
} 

function hasLost() {
  if (player.hasLost) {
    $(".popup-lost").addClass("showing");
    player.tries = 0;
    $(".master0").addClass(master.colors[0]);
    $(".master1").addClass(master.colors[1]);
    $(".master2").addClass(master.colors[2]);
    $(".master3").addClass(master.colors[3]);
    console.log(master.colors);
  }
}

  // Block la couleur si déjà choisie une fois sur une case autour (ou alors bloquer si plusieurs lors du submit)
  // function blockColor(square) {
  //   if (square !== square0) {
  //   (square1.hasClass("white")) {
  //     colorWhite.addClass("blocked");
  //     }
  //   }
  // }

function pushSelection() {
  if (square0.hasClass("white")) {
    player.choices[0] = "white";
  } else if (square0.hasClass("yellow")) {
    player.choices[0] = "yellow";
  } else if (square0.hasClass("pink")) {
    player.choices[0] = "pink";
  } else if (square0.hasClass("purple")) {
    player.choices[0] = "purple";
  } else if (square0.hasClass("blue")) {
    player.choices[0] = "blue";
  } else if (square0.hasClass("green")) {
    player.choices[0] = "green";
  }

  if (square1.hasClass("white")) {
    player.choices[1] = "white";
  } else if (square1.hasClass("yellow")) {
    player.choices[1] = "yellow";
  } else if (square1.hasClass("pink")) {
    player.choices[1] = "pink";
  } else if (square1.hasClass("purple")) {
    player.choices[1] = "purple";
  } else if (square1.hasClass("blue")) {
    player.choices[1] = "blue";
  } else if (square1.hasClass("green")) {
    player.choices[1] = "green";
  }

  if (square2.hasClass("white")) {
    player.choices[2] = "white";
  } else if (square2.hasClass("yellow")) {
    player.choices[2] = "yellow";
  } else if (square2.hasClass("pink")) {
    player.choices[2] = "pink";
  } else if (square2.hasClass("purple")) {
    player.choices[2] = "purple";
  } else if (square2.hasClass("blue")) {
    player.choices[2] = "blue";
  } else if (square2.hasClass("green")) {
    player.choices[2] = "green";
  }

  if (square3.hasClass("white")) {
    player.choices[3] = "white";
  } else if (square3.hasClass("yellow")) {
    player.choices[3] = "yellow";
  } else if (square3.hasClass("pink")) {
    player.choices[3] = "pink";
  } else if (square3.hasClass("purple")) {
    player.choices[3] = "purple";
  } else if (square3.hasClass("blue")) {
    player.choices[3] = "blue";
  } else if (square3.hasClass("green")) {
    player.choices[3] = "green";
  }
console.log(player.choices);
}

function flushPlayerSelection() {
  player.choices = [];
}

function resetGame() {
  var boardSquares = $(".board td");
  boardSquares.removeClass("white yellow pink purple blue green");
  boardSquares.addClass("inactive");
  boardSquares.html("");
  boardSquares.removeClass("breathe");
  $(".master0").removeClass("white yellow pink purple blue green");
  $(".master1").removeClass("white yellow pink purple blue green");
  $(".master2").removeClass("white yellow pink purple blue green");
  $(".master3").removeClass("white yellow pink purple blue green");
  $(".popup-lost").removeClass("showing");
  $(".popup-won").removeClass("showing");

  master.colors = [];
  player.hasWon = false;
  player.hasLost = false;
  player.tries = 0;
}


function compareSelections() {
  var comparison = [];
  var blackCounter = 0;
  var redCounter = 0;
  for (var i = 0; i < master.colors.length; i++) {
    if (master.colors[i] === player.choices[i]) {
      comparison.push(true);
      blackCounter++;
    } else {
      comparison.push(false);
    }
  } 
  for (var j = 0; j < comparison.length; j++) {
    if (comparison[j] === false) {
      if (master.colors.includes(player.choices[j])) {
        redCounter++;
      }
    }
  }
  var feedbackBlack = $("#" + row + "-4");
  var feedbackRed = $("#" + row + "-5");
  if (blackCounter === 4) {
    player.hasWon = true;
  } else {
    feedbackBlack.html(blackCounter);
    feedbackRed.html(redCounter);
    console.log(comparison);
    if (player.tries === 9) {
      player.hasLost = true; 
    }
  }
}
