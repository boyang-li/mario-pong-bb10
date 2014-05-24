//For: MarioPong
//File Name: physics.js
//Last Modified: Dec 5, 2012
//Purpose: physics engine for gameplay

var physics = function () {

    var paddle = function () {

        var bounce = function () {
            var reflection = function () {
                return (board.ball.x - board.paddle.x - board.paddle.width / 2) / 200;
            };
            board.ball.y = board.paddle.y - board.ball.radius;
            board.ball.dy = -Math.abs(board.ball.dy);
            board.ball.dx = reflection();
//            powerUp.timer();
            board.paddle.bounce = true;
            audio.play("bounce");
        };

        var getSpeed = function () {
            if (rightDown) {
                return Math.abs(board.paddle.dx);
            } else if (leftDown) {
                return -Math.abs(board.paddle.dx);
            } else {
                return 0;
            }
        };

        var move = function (interval) {
            var rightBound = config.canvasWidth - board.paddle.width;
            var leftBound = 0;
            var distance = getSpeed() * interval;
//            if (powerUp.powerUps[powerUp.Type.WRAP].count() == 0) {
//                if (rightDown)
//                    board.paddle.x = Math.min(board.paddle.x + distance, rightBound);
//                if(leftDown) {
//                    board.paddle.x = Math.max(board.paddle.x + distance, leftBound);
//                }
//            } else {
                // if in wrap mode
                if (board.paddle.x <= rightBound + board.paddle.width
                        && board.paddle.x >= leftBound - board.paddle.width) {
                    board.paddle.x += distance;
                } else if (rightDown && board.paddle.x > config.canvasWidth) {
                    board.paddle.x = -board.paddle.width;
                } else if (leftDown && board.paddle.x < -board.paddle.width) {
                    board.paddle.x = config.canvasWidth;
                }
//            }
        };
        return {
            bounce: bounce,
            move: move
        };
    }();

    var brick = function () {

        var addAnimation = function (row, col) {
            var newAnimation = {
                x: col * board.brick.width,
                y: row * board.brick.height,
                opacity: 1.0
            };
            gameplayAnimation.breakingBrick.add(newAnimation);
        };

        return {
//            hit: hit,
            addAnimation: addAnimation
        };
    }();

    var ball = function () {
        var lastPosition = {};
        var detectArea = {};
        // hit detection
        var nextHit = function (interval)
        {
            // get the next hit point
            var nextHit = hitDetection();

            // if no points found then return
            if (!nextHit) {
                return false;
            }

            // if the ball will hit the brick in next frame
            if (nextHit.vertical == false) {
                // horizontally
                if (board.ball.dy < 0) {
                    // bottom side
                    brick.hit(nextHit.row - 1,  nextHit.col);
                } else {
                    // top side
                    brick.hit(nextHit.row, nextHit.col);
                }
                board.ball.dy = -board.ball.dy;
            } else if (nextHit.vertical == true) {
                // vertically
                if (board.ball.dx > 0 ) {
                    // left side
                    brick.hit(nextHit.row, nextHit.col);
                } else {
                    // right side
                    brick.hit(nextHit.row, nextHit.col - 1);
                }
                board.ball.dx = -board.ball.dx;
            }
            audio.play("hit");
            return nextHit;

        };

        var hitDetection = function () {
            var hitCandidates = getCandidates(detectArea);
            hitCandidates.sort(function(pos1, pos2)
                    {
                        return (pos1.dis - pos2.dis);
                    });

            var isHitInsideTravelArea = function (candidate) {
                return candidate.y < Math.max(lastPosition.y, detectArea.y)
                        && candidate.y > Math.min(lastPosition.y, detectArea.y)
            };

            var isHitInsideCanvas = function (candidate) {
                return !(candidate.x < 0
                        || candidate.y < 0
                        || candidate.y > board.brick.height * config.board.ROW
                        || candidate.x > board.brick.width * config.board.COL);
            };

            for(var index = 0; index < hitCandidates.length; index++) {
                var hitCandidate = hitCandidates[index];
                if (!isHitInsideCanvas(hitCandidate)
                        || !isHitInsideTravelArea(hitCandidate)) {
                    continue;
                }
                if (isHitFirstRow(hitCandidate)
                        || isVerticallyHit(hitCandidate)
                        || isHorizontallyHit(hitCandidate)) {
                    return hitCandidate;
                }
            }
            return false;
        };

        // Returns all the possible hitting points
        var getCandidates = function ()
        {
            var x = detectArea.x;
            var y = detectArea.y;
            var candidates = [];

            // calculate the movement function
            var a = board.ball.dy / board.ball.dx;
            var b = y - a * x;

            // calculate the possible hit points
            // here we estimate the ball as a single point
            for (var i = 1; i < config.board.COL; i++) {
                // check vertical lines
                var candidate = {
                    x: i * board.brick.width,
                    y: a * i * board.brick.width + b,
                    row: parseInt((a * i * board.brick.width + b) / board.brick.height),
                    col: i,
                    vertical: true
                }
                candidates[i - 1] = candidate;
            }

            for (var j = 1;j <= config.board.ROW; j++) {
                // check horizontal lines
                var candidate = {
                    x: (j * board.brick.height - b) / a,
                    y: j * board.brick.height,
                    row: j,
                    col: parseInt((j * board.brick.height - b) / (a * board.brick.width)),
                    vertical: false
                };
                candidates[config.board.COL + j - 2] = candidate;
            }

            // calculate the distance
            // between points and current position of the ball
            candidates = candidates.map(function (pos)
                    {
                        pos.dis = Math.sqrt((pos.x -x) * (pos.x - x)
                            + (pos.y - y) * (pos.y - y));
                        return pos;
                    });

            return candidates;
        };

        var move = function (interval)
        {
            // update last position of the ball
            lastPosition.x = detectArea.x;
            lastPosition.y = detectArea.y;

            // make sure the ball moves inside the canvas
            if (board.ball.dx < 0) {
                // left edge
                board.ball.x = Math.max(board.ball.x + board.ball.dx * interval, 0);
            } else {
                // right edge
                board.ball.x = Math.min(board.ball.x + board.ball.dx * interval, config.canvasWidth - board.ball.radius);
            }
            if (board.ball.dy < 0) {
                // top edge
                board.ball.y = Math.max(board.ball.y + board.ball.dy * interval, 0);
            } else {
                // bottom edge (The ball can go cross the bottom edge -> game over)
                board.ball.y += board.ball.dy * interval;
            }

            // bounce on edges
            if (board.ball.x == config.canvasWidth - board.ball.radius || board.ball.x == 0) {
                board.ball.dx = -board.ball.dx;
            } else if (board.ball.y < board.paddle.y + board.paddle.height + board.ball.radius
                    && board.ball.y > board.paddle.y - board.ball.radius
                    && board.ball.x > board.paddle.x
                    && board.ball.x < board.paddle.x + board.paddle.width) {
                if(board.ball.dy > 0) {
                    paddle.bounce();
                }
            } else if (board.ball.y == 0) {
                board.ball.dy = -board.ball.dy;
            } else if (board.ball.y > config.canvasHeight) {
                // if the paddle misses catching the ball then lose life.
                game.gameplay.miss();
            }

            if (board.ball.dx > 0) {
                detectArea.x = board.ball.x + board.ball.radius;
            } else {
                detectArea.x = board.ball.x;
            }
            if (board.ball.dy > 0) {
                detectArea.y = board.ball.y + board.ball.radius;
            } else {
                detectArea.y = board.ball.y;
            }
        }

        return {
            hit: nextHit,
            move: move
        };
    }();

    return {
        ball: ball,
        paddle: paddle
    };

}();
