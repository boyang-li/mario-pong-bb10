//For: MarioPong
//File Name: board.js
//Last Modified: Dec 5, 2012
//Purpose: game board to draw elements on

var board = function () {

    // elements on the board
    // paddle
    var paddle = function () {
        // basic attribution
        var height, width, x, y, dx;
        var img = new Image();
        img.src = "./imgs/paddle.png";
        var reset = function () {
            this.height = config.paddle.HEIGHT_INITIAL * scale.y;
            this.width = config.paddle.WIDTH_INITIAL * scale.x;
            this.x = config.paddle.X_INITIAL * scale.x;
            this.y = config.paddle.Y_INITIAL * scale.y;
            this.dx = config.paddle.DX_INITIAL * scale.x;
        };
        var draw = function () {
            context.drawImage(img, this.x, this.y, this.width, this.height);
        };

        var update = function (interval) {
            physics.paddle.move(interval);
        };

        return {
            height: height,
            width: width,
            x: x,
            y: y,
            dx: dx,
            img: img,
            reset: reset,
            draw: draw,
            update: update
        };
    }();

    // ball
    var ball = function () {
        // basic attribution
        var radius, x, y, dx;
        var img = new Image();
        img.src = "./imgs/ball.png";
        var reset = function () {
            this.radius = config.ball.RADIUS_INITIAL * scale.x;
            this.x = config.ball.X_INITIAL * scale.x;
            this.y = config.ball.Y_INITIAL * scale.y;
            this.dx = 0;
            this.dy = 0;
        };
        var standby = function () {
            this.x = paddle.x + paddle.width / 2 - this.radius / 2;
            this.y = paddle.y - this.radius;
        };
        var draw = function () {
            context.drawImage(img, this.x, this.y, this.radius, this.radius);
        };
        var update = function (interval) {
            if (game.gameplay.launched)
                physics.ball.move(interval);
        }
        return {
            radius: radius,
            x: x,
            y: y,
            dx: dx,
            img: img,
            draw: draw,
            standby: standby,
            reset: reset,
            update: update
        };
    }();

    // store elements on board in an array
    var elements = [ball, paddle];

    // recalculate when the screen is rotated or resized
    var resize = function ()
    {
        config.canvasHeight = $("#game_canvas").height();
        config.canvasWidth = $("#game_canvas").width();

        var scaleOld = scale;
        scale = {
            y: config.canvasHeight / 100,
            x: config.canvasWidth / 100
        };

        // get resize ratio
        var ratio = scale.y / scaleOld.y

        // update elements on the board
        for (i in elements) {
            var element = elements[i];
            for (member in element) {
                if (member == "x" || member == "y"
                    || member == "dx" || member == "dy"
                    || member == "width" || member == "height"
                    || member == "radius")
                    element[member] = element[member] * ratio;
            }
        }
    };

    // reset the game
    var reset = function () {
        // reset config
        config = initConfig();
        // reset each element
        for (i in elements) {
            elements[i].reset();
        }

        game.gameplay.standby();
    };
    // update the elements
    // position, speed
    var update = function (interval) {
        for (i in elements)
            elements[i].update(interval);
    };

    return {
        ball: ball,
        paddle: paddle,
        reset: reset,
        resize: resize,
        update: update
    };
}();
