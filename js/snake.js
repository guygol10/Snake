$(document).ready(function () {
    //Canvas stuff
    var game = $("#game")[0];
    var ctx = game.getContext("2d");
    var w = $("#game").width();
    var h = $("#game").height();

    //Lets save the cell width in a variable for easy control
    var cw = 10;
    var d;
    var food;
    var score;
    var level;

    var snake_array;

    function init() {
        d = "right";
        create_snake();
        create_food();
        score = 0;
        level = 1;

        if (typeof game_loop != "undefined") clearInterval(game_loop);
        game_loop = setInterval(paint, 100);
    }
    init();

    function create_snake() {
        var length = 4;
        snake_array = [];
        for (var i = length - 1; i >= 0; i--) {
            snake_array.push({ x: i, y: 0 });
        }
    }

    function create_food() {
        food = {
            x: Math.round(Math.random() * (w - cw) / cw),
            y: Math.round(Math.random() * (h - cw) / cw),
        };
    }

    function paint() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0, 0, w, h);

        var nx = snake_array[0].x;
        var ny = snake_array[0].y;
        if (d == "right") nx++;
        else if (d == "left") nx--;
        else if (d == "up") ny--;
        else if (d == "down") ny++;

        if (nx == -1 || nx == w / cw || ny == -1 || ny == h / cw || check_collision(nx, ny, snake_array)) {
            window.location.assign("end.html");
            return;
        }

        if (nx == food.x && ny == food.y) {
            var tail = { x: nx, y: ny };
            score++;

            create_food();
        }
        else {
            var tail = snake_array.pop(); //pops out the last cell
            tail.x = nx; tail.y = ny;
        }

        snake_array.unshift(tail);

        for (var i = 0; i < snake_array.length; i++) {
            var c = snake_array[i];
            paint_cell(c.x, c.y, "white");
        }

        paint_cell(food.x, food.y, "red");
        var score_text = "Score: " + score;
        localStorage.setItem("mostRecentScore", score_text);
        var level_text = "Level: " + level;
        ctx.fillText(score_text, 5, h - 5);
        ctx.fillText(level_text, 60, h - 5);
    }

    function paint_cell(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * cw, y * cw, cw, cw);
        ctx.strokeStyle = "white";
        ctx.strokeRect(x * cw, y * cw, cw, cw);
    }

    function check_collision(x, y, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].x == x && array[i].y == y)
                return true;
        }
        return false;
    }

    $(document).keydown(function (e) {
        var key = e.which;
        if (key == "37" && d != "right") d = "left";
        else if (key == "38" && d != "down") d = "up";
        else if (key == "39" && d != "left") d = "right";
        else if (key == "40" && d != "up") d = "down";
    })
})