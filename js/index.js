//this is project is currently in progress..
$(document).ready(function() {

  var currentElement;

  var settings = {
    xTurn: true,
    turn: "x",
    compPlaying: undefined,
    gamePlaying: false
  };
  var xTurn = true;
  var turn = "x";
  var computerPlaying;

  var checkWinner = function() {

    for (var j = 0; j < checkerArr.length; j++) {

      if (checkerArr[j].count.length === 3) {

        if (checkerArr[j].count[0] == checkerArr[j].count[1] && checkerArr[j].count[0] == checkerArr[j].count[2]) {

          if (xTurn === false) {
            $("#who-wins").addClass("x");
          } else {
            $("#who-wins").addClass("o");
          }
          $(".winner").fadeIn(500);
          settings.gamePlaying = false;
        }
      }
    }

  };

  var push = function() {
    if (currentElement.hasClass("left")) {
      left.count.push(turn);
      console.log(left.type + ":" + left.count);
    } else if (currentElement.hasClass("ver-mid")) {
      verMid.count.push(turn);
      console.log(verMid.type + ":" + verMid.count);
    } else if (currentElement.hasClass("right")) {
      right.count.push(turn);
      console.log(right.type + ":" + right.count);
    }

    if (currentElement.hasClass("top")) {
      top.count.push(turn);
      console.log(top.type + ":" + top.count);
    } else if (currentElement.hasClass("hor-mid")) {
      horMid.count.push(turn);
      console.log(horMid.type + ":" + horMid.count);
    } else if (currentElement.hasClass("bottom")) {
      bottom.count.push(turn);
      console.log(bottom.type + ":" + bottom.count);
    }

    if (currentElement.hasClass("dia-down")) {
      diaDown.count.push(turn);
      console.log(diaDown.type + ":" + diaDown.count);
    }

    if (currentElement.hasClass("dia-up")) {
      diaUp.count.push(turn);
      console.log(diaUp.type + ":" + diaUp.count);
    }
  };

  var pClick = function() {
    $(".2p").click(function() {
      settings.compPlaying = false;

      $(".picker").addClass("picker-inactive");

      $(".turn").removeClass("turn-hidden");
      $(".turn-text").removeClass("turn-text-inactive");

      gameStart();
      settings.compPlaying = false;

    });

    $(".1p").click(function() {
      settings.compPlaying = true;

      $(".picker").removeClass("picker-inactive");

      $(".turn").addClass("turn-hidden");
      $(".turn-text").addClass("turn-text-inactive");

    });

    $(".pl").click(function() {

      if ($(this).is(".1p")) {
        $(".pl").removeClass("pl-active");
        $(this).addClass("pl-active");
        $(".active-bg").css("left", "0%");
      } else if ($(this).is(".2p")) {
        $(".pl").removeClass("pl-active");
        $(this).addClass("pl-active");
        $(".active-bg").css("left", "50%");
      }

    });
  };

  pClick();

  $(".picker-choice").click(function() {
    settings.compPlaying = true;

    if ($(this).hasClass("picker-choice-x")) {
      $(".turn").removeClass("turn-hidden");
      $(".picker").addClass("picker-inactive");
    } else {
      $(".turn").removeClass("turn-hidden");
      $(".picker").addClass("picker-inactive");
      $(".turn-img-o").css("top", "0");
      $(".turn-img-x").css("top", "100%");
      xTurn = false;

      iniateRandStart();

    }

    gameStart();
  });

  var left = {
    type: "left",
    count: []
  };
  var verMid = {
    type: "ver-mid",
    count: []
  };
  var right = {
    type: "right",
    count: []
  };

  var top = {
    type: "top",
    count: []
  };
  var horMid = {
    type: "hor-mid",
    count: []
  };
  var bottom = {
    type: "bottom",
    count: []
  };

  var diaDown = {
    type: "dia-down",
    count: []
  };
  var diaUp = {
    type: "dia-up",
    count: []
  };

  var checkerArr = [left, verMid, right, top, horMid, bottom, diaDown, diaUp];

  var verChoices = [left, verMid, right];
  var horChoices = [top, horMid, bottom];

  var gameStart = function() {

    settings.gamePlaying = true;

    $(".1p").off("click");
    $(".2p").off("click");
    
    $(".options").removeClass("options-active");
    $(".mobile").addClass("mobile-tab");

    $("#lock").fadeIn("300");
    $(".turn-text").removeClass("turn-text-inactive");

    $(".wrapper").on("click", ".xo", function() {

        if (xTurn === true) {
          $(this).addClass("x");
          $(this).removeClass("xo");
          currentElement = $(this);

          xTurn = false;
          push();

          turn = "o";

          $(".turn-img-x").animate({
            top: "-100%"
          }, 1000, "swing", function() {
            $(this).css("top", "100%");
          });

          $(".turn-img-o").animate({
            top: "0"
          }, 1000, "swing");

          if (settings.compPlaying === true) {
            setTimeout(function() {
              computerPlayer();
            }, 800);
          }

        } else if (xTurn === false) {
          $(this).removeClass("xo");
          $(this).addClass("o");
          currentElement = $(this);

          xTurn = true;
          push();
          turn = "x";

          $(".turn-img-o").animate({
            top: "-100%"
          }, 1000, "swing", function() {
            $(this).css("top", "100%");

          });

          $(".turn-img-x").animate({
            top: "0"
          }, 1000, "swing");

          if (settings.compPlaying === true) {
            setTimeout(function() {
              computerPlayer();
            }, 800);
          }

        }

        checkWinner();

      }

    )
  };

  var computerPlayer = function() {

    if (settings.gamePlaying === true) {

      var filled = false;

      for (var p = 0; p < checkerArr.length; p++) {
        if (checkerArr[p].count.length == 2 && checkerArr[p].count[0] == checkerArr[p].count[1] && filled === false) {
          if ($("." + checkerArr[p].type + ".xo").length) {
            currentElement = $("." + checkerArr[p].type + ".xo");
            $("." + checkerArr[p].type + ".xo").addClass(turn).removeClass("xo");
            filled = true;
            push();
          }
        }
      }

      for (var t = 0; t < checkerArr.length; t++) {
        if (checkerArr[t].count.length == 1 && checkerArr[t].count[0] == turn && filled === false) {
          currentElement = $("." + checkerArr[t].type + ".xo").eq(0);
          $("." + checkerArr[t].type + ".xo").eq(0).addClass(turn).removeClass("xo");
          filled = true;
          push();
        }
      }

      for (var l = 0; l < checkerArr.length; l++) {
        if (checkerArr[l].count.length == 1 && filled === false) {
          currentElement = $("." + checkerArr[l].type + ".xo").eq(0);
          $("." + checkerArr[l].type + ".xo").eq(0).addClass(turn).removeClass("xo");
          filled = true;
          push();
        }
      }

      if (turn === "o") {
        xTurn = true;
        turn = "x";

        $(".turn-img-o").animate({
          top: "-100%"
        }, 1000, "swing", function() {
          $(this).css("top", "100%");
        });

        $(".turn-img-x").animate({
          top: "0"
        }, 1000, "swing");

      } else if (turn === "x") {
        xTurn = false;
        turn = "o";

        $(".turn-img-x").animate({
          top: "-100%"
        }, 1000, "swing", function() {
          $(this).css("top", "100%");
        });

        $(".turn-img-o").animate({
          top: "0"
        }, 1000, "swing");

      }

      checkWinner();
    }

  };

  function iniateRandStart() {

    var randVer = Math.floor(Math.random() * 3);
    var randHor = Math.floor(Math.random() * 3);

    currentElement = $("." + verChoices[randVer].type + "." + horChoices[randHor].type);

    $("." + verChoices[randVer].type + "." + horChoices[randHor].type).addClass("x").removeClass("xo");

    push();

    turn = "o";

  }

  $("#play-again, #reset").click(function() {
    $(".winner").fadeOut(300);
    $(".square").addClass("xo");
    $(".square").removeClass("o")
    $(".square").removeClass("x")
    $(".active-bg").css("left" , "0");
    xTurn = true;
    turn = "x";
    settings.compPlaying = undefined;
    settings.gamePlaying = false;
    pClick();
    $(".wrapper").off("click", ".xo");

    $(".1p").addClass("pl-active");
    $(".2p").removeClass("pl-active");
    $("#lock").fadeOut(300);
    
    $(".options").removeClass("options-active");
    
    $(".picker").removeClass("picker-inactive");
    $(".turn").addClass("turn-hidden");

    for (var i = 0; i < checkerArr.length; i++) {
      checkerArr[i].count = [];
    }

    $(".turn-img-o").animate({
      top: "-100%"
    }, 1000, "swing", function() {
      $(this).css("top", "100%");
    });

    $(".turn-img-x").animate({
      top: "0"
    }, 1000, "swing");

  });
  
  $("body").on("click", ".mobile-tab", function(){
    $(".options").toggleClass("options-active");
  });
  
  

});