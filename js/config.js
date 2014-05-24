//For: MarioPong
//File Name: config.js
//Last Modified: Dec 5, 2012
//Purpose: Stores initial variable values

// canvas context
var context = $("#game_canvas")[0].getContext("2d");

// initialize configuration
var initConfig = function () {

    // canvas size
    var canvasWidth = $("#game_canvas").width();
    var canvasHeight = $("#game_canvas").height();

    // unit length
    // this is a public global variable
    this.scale = {
            y: canvasHeight / 100,
            x: canvasWidth / 100
    };

    // board size
    var board = {
        ROW: 10,
        COL: 10
    };

    // size of elements on the board
    // paddle, ball
    var paddle = {
        X_INITIAL: 40,
        Y_INITIAL: 86,
        WIDTH_INITIAL: 20,
        HEIGHT_INITIAL: 1.2,
        DX_INITIAL: 0.12
    };

    var ball = {
        RADIUS_INITIAL: 8,
        X_INITIAL: 29,
        Y_INITIAL: 41,
        DY_INITIAL: 0.04,
        DX_INITIAL: 0.02

    };

    var player = {
        LIFE_NORMAL_INITIAL: 2,
        LIFE_EASY_INITIAL: 3
    }

    // fps rate
    var INTERVAL = 25;

    return {
        canvasHeight: canvasHeight,
        canvasWidth: canvasWidth,
        board: board,
        ball: ball,
        paddle: paddle,
        player: player,
        INTERVAL: INTERVAL
    };
};

var config = initConfig();
