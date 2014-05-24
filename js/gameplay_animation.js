//For: MarioPong
//File Name: gameplay_animation.js
//Last Modified: Dec 5, 2012
//Purpose: aniamtion for gameplay

var gameplayAnimation = function () {
    var time = 0;
    var man = function() {
        var imgs = new Array();
        for (var i = 0; i < 7; i++)
            imgs[i] = new Image();
        imgs[0].src = "./imgs/mario_left1.png";
        imgs[1].src = "./imgs/mario_left2.png";
        imgs[2].src = "./imgs/mario_left3.png";
        imgs[3].src = "./imgs/mario_right1.png";
        imgs[4].src = "./imgs/mario_right2.png";
        imgs[5].src = "./imgs/mario_right3.png";
        imgs[6].src = "./imgs/mario_lose.png";

        var currentImage = imgs[0];
        // position of the man
        var position;
        var getPosition = function() {
            var y = board.paddle.y + board.paddle.height / 2;
            var x = board.paddle.x + board.paddle.width * 0.28;
            return {
                x: x,
                y: y
            };
        };

        var updateImage = function() {
            if (currentImage == imgs[6]
                    && !game.gameplay.isGameover())
                currentImage = imgs[0];
            if (leftDown) {
                currentImage = shuffle(imgs[0], imgs[1], imgs[2]) || currentImage;
            } else if (rightDown) {
                currentImage = shuffle(imgs[3], imgs[4], imgs[5]) || currentImage;
            }
        };

        var draw = function () {
            // if the game is playing
            if (!game.gameplay.playing)
                return;

            // get the position of mario
            if (!game.gameplay.isGameover()) {
                position = getPosition();
                updateImage();
            }

            // this is a css animation
            context.drawImage(currentImage, position.x, position.y,
                    board.paddle.width / 2, board.paddle.width / 2);

        };

        function lose (callback) {
            currentImage = imgs[6];
//            callback();
        }

        // swap animation between three images
        function shuffle(img1, img2, img3)
        {
            if (time % 16 == 0) {
                return img1;
            } else if (time % 16 == 4 || time % 16 == 12) {
                return img2;
            } else if (time % 16 == 8) {
                return img3;
            }
        }

        return {
            draw: draw,
            lose: lose
        };
    }();

    var paddle = function () {
        var lose = function () {
            context.save();
            context.translate(board.paddle.x + board.paddle.width / 2, board.paddle.y);
            context.rotate(4 * Math.PI * Math.sin(time / 100));
            context.translate(-board.paddle.x - board.paddle.width / 2, -board.paddle.y)
            context.drawImage(board.paddle.img, board.paddle.x, board.paddle.y,
            board.paddle.width, board.paddle.height);
            context.restore();
            board.paddle.y += config.canvasHeight / 200;
        };
        return {
            lose: lose
        };
    }();

    // draw lose animation
    function drawGameover ()
    {
        // if game is over
        man.lose(paddle.lose);
    }

    function isDrawGameOverEnd () {
        return board.paddle.y > config.canvasHeight
    }


    function bounce()
    {
        if (board.paddle.bounce) {
            board.paddle.y += config.canvasHeight / 200;
            board.paddle.bounce = false;
        } else {
            board.paddle.y = config.paddle.Y_INITIAL;
        }
    }

    // check if there is any unfinished animations
    function empty()
    {
        return isDrawGameOverEnd () || !game.gameplay.isGameover();
    }

    function draw() {
        time += 1;

        if (game.gameplay.isGameover()) {
            drawGameover();
        }
        man.draw();
    }
    return {
        draw: draw,
        empty: empty
    };

}();

