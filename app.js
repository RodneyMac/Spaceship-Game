function initCanvas() {
  var ctx = document.getElementById("my_canvas").getContext("2d");
  var backgroundImage = new Image();
  var naveImage = new Image();
  var enemiespic1 = new Image();
  var enemiespic2 = new Image();

  backgroundImage.src = "img/background-pic.jpg";
  naveImage.src = "img/spaceship-pic.png";

  enemiespic1.src = "img/enemigo1.png";
  enemiespic2.src = "img/enemigo2.png";

  var cW = ctx.canvas.width;
  var cH = ctx.canvas.height;

  var enemyTemplate = function (options) {
    return {
      id: options.id || "",
      x: options.x || "",
      y: options.y || "",
      w: options.w || "",
      h: options.h || "",
      image: options.image || enemiespic1,
    };
  };

  var enemies = [
    new enemyTemplate({ id: "enemy1", x: 100, y: -20, w: 50, h: 30 }),
    new enemyTemplate({ id: "enemy2", x: 225, y: -20, w: 50, h: 30 }),
    new enemyTemplate({ id: "enemy3", x: 350, y: -20, w: 80, h: 30 }),
    new enemyTemplate({ id: "enemy4", x: 100, y: -70, w: 80, h: 30 }),
    new enemyTemplate({ id: "enemy5", x: 225, y: -70, w: 50, h: 30 }),
    new enemyTemplate({ id: "enemy6", x: 350, y: -70, w: 50, h: 30 }),
    new enemyTemplate({ id: "enemy7", x: 475, y: -70, w: 50, h: 30 }),
    new enemyTemplate({ id: "enemy8", x: 600, y: -70, w: 80, h: 30 }),
    new enemyTemplate({ id: "enemy9", x: 475, y: -20, w: 50, h: 30 }),
    new enemyTemplate({ id: "enemy10", x: 600, y: -20, w: 50, h: 30 }),

    new enemyTemplate({
      id: "enemy11",
      x: 100,
      y: -220,
      w: 50,
      h: 30,
      image: enemiespic2,
    }),
    new enemyTemplate({
      id: "enemy12",
      x: 225,
      y: -220,
      w: 50,
      h: 30,
      image: enemiespic2,
    }),
    new enemyTemplate({
      id: "enemy13",
      x: 350,
      y: -220,
      w: 80,
      h: 50,
      image: enemiespic2,
    }),
    new enemyTemplate({
      id: "enemy14",
      x: 100,
      y: -270,
      w: 80,
      h: 50,
      image: enemiespic2,
    }),
    new enemyTemplate({
      id: "enemy15",
      x: 225,
      y: -270,
      w: 50,
      h: 30,
      image: enemiespic2,
    }),
    new enemyTemplate({
      id: "enemy16",
      x: 350,
      y: -270,
      w: 50,
      h: 30,
      image: enemiespic2,
    }),
    new enemyTemplate({
      id: "enemy17",
      x: 475,
      y: -270,
      w: 50,
      h: 30,
      image: enemiespic2,
    }),
    new enemyTemplate({
      id: "enemy18",
      x: 600,
      y: -270,
      w: 80,
      h: 50,
      image: enemiespic2,
    }),
    new enemyTemplate({
      id: "enemy19",
      x: 475,
      y: -200,
      w: 50,
      h: 30,
      image: enemiespic2,
    }),
    new enemyTemplate({
      id: "enemy20",
      x: 600,
      y: -200,
      w: 50,
      h: 30,
      image: enemiespic2,
    }),
  ];

  var renderEnemies = function (enemyList) {
    for (var i = 0; i < enemyList.length; i++) {
      var enemy = enemyList[i];
      ctx.drawImage(enemy.image, enemy.x, (enemy.y += 0.5), enemy.w, enemy.h);
      launcher.hitDetectLowerlevel(enemy);
    }
  };

  function Launcher() {
    (this.y = 500),
      (this.x = cW * 0.5 - 25),
      (this.w = 100),
      (this.h = 100),
      this.direccion,
      (this.bg = "white"),
      (this.misiles = []);

    this.gameStatus = {
      over: false,
      message: "",
      fillStyle: "red",
      font: "italic bold 36px Arial, sans-serif",
    };

    this.render = function () {
      if (this.direccion === "left") {
        this.x -= 5;
      } else if (this.direccion === "right") {
        this.x += 5;
      } else if (this.direccion === "downArrow") {
        this.y += 5;
      } else if (this.direccion === "upArrow") {
        this.y -= 5;
      }
      ctx.fillStyle = this.bg;
      ctx.drawImage(backgroundImage, 10, 10);
      ctx.drawImage(naveImage, this.x, this.y, 100, 90);

      for (var i = 0; i < this.misiles.length; i++) {
        var m = this.misiles[i];
        ctx.fillRect(m.x, (m.y -= 5), m.w, m.h);
        this.hitDetect(m, i);

        if (m.y <= 0) {
          this.misiles.splice(i, 1);
        }
      }

      if (enemies.length === 0) {
        clearInterval(animateInterval);
        ctx.fillStyle = "yellow";
        ctx.font = this.gameStatus.font;
        ctx.fillText("You Win!", cW * 0.5 - 80, 50);
      }
    };

    this.hitDetect = function (m, mi) {
      for (var i = 0; i < enemies.length; i++) {
        var e = enemies[i];

        if (
          m.x <= e.x + e.w &&
          m.x + m.x >= e.x &&
          m.y >= e.y &&
          m.y <= e.y + e.h
        ) {
          enemies.splice(i, 1);
          document.querySelector(".barra").innerHTML = "Destroyed " + e.id;
        }
      }
    };

    this.hitDetectLowerlevel = function (enemy) {
      if (enemy.y > 550) {
        this.gameStatus.over = true;
        this.gameStatus.message = "Enemy(s) have passed!";
      }

      if (
        enemy.y < this.y + 25 &&
        enemy.y > this.y - 25 &&
        enemy.x < this.x + 45 &&
        enemy.x > this.x - 45
      ) {
        this.gameStatus.over = true;
        this.gameStatus.message = "You Died!";
      }

      if (this.gameStatus.over === true) {
        clearInterval(animateInterval);
        ctx.fillStyle = this.gameStatus.fillStyle;
        ctx.font = this.gameStatus.font;

        ctx.fillText(this.gameStatus.message, cW * 0.5 - 80, 50);
      }
    };
  }

  var launcher = new Launcher();

  function animate() {
    ctx.clearRect(0, 0, cW, cH);
    launcher.render();
    renderEnemies(enemies);
  }

  var animateInterval = setInterval(animate, 6);

  var left_btn = document.getElementById("left_btn");
  var right_btn = document.getElementById("right_btn");
  var fire_btn = document.getElementById("fire_btn");

  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 37) {
      launcher.direccion = "left";
      if (launcher.x < cW * 0.2 - 130) {
        launcher.x += 0;
        launcher.direccion = "";
      }
    }
  });

  document.addEventListener("keyup", function (e) {
    if (e.keyCode === 37) {
      launcher.x += 0;
      launcher.direccion = "";
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 39) {
      launcher.direccion = "right";
      if (launcher.x > cW - 110) {
        launcher.x -= 0;
        launcher.direccion = "";
      }
    }
  });

  document.addEventListener("keyup", function (e) {
    if (e.keyCode === 39) {
      launcher.x -= 0;
      launcher.direccion = "";
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 38) {
      launcher.direccion = "upArrow";
      if (launcher.y < cH * 0.2 - 80) {
        launcher.y += 0;
        launcher.direccion = "";
      }
    }
  });

  document.addEventListener("keyup", function (e) {
    if (e.keyCode === 38) {
      launcher.y -= 0;
      launcher.direccion = "";
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 40) {
      launcher.direccion = "downArrow";
      if (launcher.y > cH - 110) {
        launcher.y -= 0;
        launcher.direccion = "";
      }
    }
  });

  document.addEventListener("keyup", function (e) {
    if (e.keyCode === 40) {
      launcher.y += 0;
      launcher.direccion = "";
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 80) {
      location.reload();
    }
  });

  left_btn.addEventListener("mousedown", function () {
    launcher.direccion = "left";
  });

  left_btn.addEventListener("mouseup", function () {
    launcher.direccion = "";
  });

  right_btn.addEventListener("mousedown", function () {
    launcher.direccion = "right";
  });

  right_btn.addEventListener("mouseup", function () {
    launcher.direccion = "";
  });

  fire_btn.addEventListener("mousedown", function (e) {
    launcher.misiles.push({
      x: launcher.x + launcher.w * 0.5,
      y: launcher.y,
      w: 3,
      h: 10,
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 32) {
      launcher.misiles.push({
        x: launcher.x + launcher.w * 0.5,
        y: launcher.y,
        w: 3,
        h: 10,
      });
    }
  });
}

window.addEventListener("load", function (e) {
  initCanvas();
});
