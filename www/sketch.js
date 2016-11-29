// Generated by CoffeeScript 1.11.1
var Game, autolevel, g, ids, keyPressed, mousePressed, setup, touchStarted, xdraw;

g = 0;

ids = {};

Game = (function() {
  function Game(x1, y1, a1, s, stack) {
    var h, w;
    this.x = x1 != null ? x1 : 0;
    this.y = y1 != null ? y1 : 0;
    this.a = a1 != null ? a1 : 0;
    this.s = s != null ? s : 1;
    this.stack = stack != null ? stack : [];
    this.players = [];
    this.level = 1;
    w = width;
    h = height;
    this.mode = 0;
    this.players.push(new Player("WASD", 30, 30, 60, 60));
    this.players.push(new Player("&%('", 90, 30, 60, 60));
    this.display = new Button(0, 0, 0, this, 0.2, 0, -24, 6, 12, "", "");
  }

  Game.prototype.push = function() {
    this.stack.push([this.x, this.y, this.a, this.s]);
    return push();
  };

  Game.prototype.pop = function() {
    var ref;
    ref = this.stack.pop(), this.x = ref[0], this.y = ref[1], this.a = ref[2], this.s = ref[3];
    return pop();
  };

  Game.prototype.rotate = function(d) {
    rotate(radians(d));
    return this.a += d;
  };

  Game.prototype.scale = function(ds) {
    scale(ds);
    return this.s *= ds;
  };

  Game.prototype.translate = function(dx, dy) {
    var v;
    v = radians(this.a);
    this.x += this.s * dx * cos(v) - this.s * dy * sin(v);
    this.y += this.s * dy * cos(v) + this.s * dx * sin(v);
    return translate(dx, dy);
  };

  Game.prototype.dump = function(txt) {
    return print(txt, this.x, this.y);
  };

  Game.prototype.process = function() {
    this.mode = 1 - this.mode;
    if (this.mode === 0) {
      autolevel();
      return this.createProblem();
    }
  };

  Game.prototype.result = function() {
    var k, len, player, ref;
    fill(127);
    rect(0, 0, width, height);
    if (this.players[0].stopp === 0) {
      this.players[0].color = color(127);
    } else if (this.players[0].score() < this.players[1].score() || this.players[1].stopp === 0) {
      this.players[0].color = color(0, 255, 0);
    } else {
      this.players[0].color = color(255, 0, 0);
    }
    if (this.players[1].stopp === 0) {
      this.players[1].color = color(127);
    } else if (this.players[1].score() < this.players[0].score() || this.players[0].stopp === 0) {
      this.players[1].color = color(0, 255, 0);
    } else {
      this.players[1].color = color(255, 0, 0);
    }
    ref = this.players;
    for (k = 0, len = ref.length; k < len; k++) {
      player = ref[k];
      player.result();
    }
    return this.solve_result();
  };

  Game.prototype.solve_result = function() {
    var H, i, k, len, n, number, ref, results, x, y;
    fill(0);
    n = 20;
    H = height / n;
    textSize(H);
    ref = this.solution;
    results = [];
    for (i = k = 0, len = ref.length; k < len; i = ++k) {
      number = ref[i];
      x = int(i / n);
      y = int(i % n);
      results.push(text(number.toString(), x * 100, -8.5 * H + y * H));
    }
    return results;
  };

  Game.prototype.createProblem = function() {
    var a, b, c1, c2, c3, d, item, j, k, l, len, len1, len2, lst, lst2, m, ms, player, ref, ref1, results, save, tree, x, y;
    x = int(random(-5, 6));
    y = int(random(-5, 6));
    a = new Complex(x, y);
    lst = [a];
    tree = {};
    tree[a.toString()] = null;
    lst2 = [];
    c1 = new Complex(0, 1);
    c2 = new Complex(2, 0);
    c3 = new Complex(1, 0);
    save = function(item1, item2) {
      if (!(item2 in tree)) {
        lst2.push(item2);
        return tree[item2] = item1;
      }
    };
    ref = range(this.level);
    for (k = 0, len = ref.length; k < len; k++) {
      j = ref[k];
      lst2 = [];
      for (l = 0, len1 = lst.length; l < len1; l++) {
        item = lst[l];
        save(item, item.mul(c1));
        save(item, item.mul(c2));
        save(item, item.add(c3));
      }
      lst = lst2;
    }
    b = this.selectTarget(lst);
    this.solution = this.path(b, tree);
    d = new Date();
    ms = int(d.getTime());
    ref1 = this.players;
    results = [];
    for (m = 0, len2 = ref1.length; m < len2; m++) {
      player = ref1[m];
      player.history = [a];
      player.target = b;
      player.count = 0;
      player.start = ms;
      player.stopp = 0;
      results.push(player.level = this.level);
    }
    return results;
  };

  Game.prototype.path = function(b, tree) {
    if (b === null) {
      return [];
    }
    return this.path(tree[b], tree).concat([b]);
  };

  Game.prototype.selectTarget = function(lst) {
    var bs, item;
    bs = (function() {
      var k, len, ref, ref1, results;
      results = [];
      for (k = 0, len = lst.length; k < len; k++) {
        item = lst[k];
        if ((-10 < (ref = item.x) && ref <= 10) && (-10 < (ref1 = item.y) && ref1 <= 10)) {
          results.push(item);
        }
      }
      return results;
    })();
    if (bs.length > 0) {
      return _.sample(bs);
    }
    return _.min(lst, function(item) {
      return dist(0, 0, item.x, item.y);
    });
  };

  return Game;

})();

setup = function() {
  createCanvas(windowWidth, windowHeight);
  frameRate(15);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  strokeCap(SQUARE);
  g = new Game();
  g.createProblem();
  return xdraw();
};

xdraw = function() {
  var i, k, len, player, ref;
  bg(0.5);
  g.push();
  g.translate(int(width / 2), int(height / 2));
  ref = g.players;
  for (i = k = 0, len = ref.length; k < len; i = ++k) {
    player = ref[i];
    g.push();
    g.translate((2 * i - 1) * width / 4, 0);
    player.draw();
    g.pop();
  }
  g.display.draw();
  if (g.mode === 1) {
    g.result();
  }
  return g.pop();
};

touchStarted = function() {
  var k, l, len, len1, player, ref, touch;
  for (k = 0, len = touches.length; k < len; k++) {
    touch = touches[k];
    if (!(touch.id in ids)) {
      ids[touch.id] = touch;
      ref = g.players;
      for (l = 0, len1 = ref.length; l < len1; l++) {
        player = ref[l];
        player.touchStarted(touch.x, touch.y);
      }
    }
  }
  if (touch.length === 0) {
    ids = {};
  }
  g.display.touchStarted(touch.x, touch.y);
  return xdraw();
};

mousePressed = function() {
  var k, len, player, ref;
  ref = g.players;
  for (k = 0, len = ref.length; k < len; k++) {
    player = ref[k];
    player.mousePressed();
  }
  g.display.mousePressed();
  return xdraw();
};

keyPressed = function() {
  var k, len, player, ref;
  if (key === ' ') {
    g.display.keyPressed(key);
  } else {
    ref = g.players;
    for (k = 0, len = ref.length; k < len; k++) {
      player = ref[k];
      player.keyPressed(key);
    }
  }
  return xdraw();
};

autolevel = function() {
  var finished, k, len, perfect, player, ref;
  finished = 0;
  perfect = 0;
  ref = g.players;
  for (k = 0, len = ref.length; k < len; k++) {
    player = ref[k];
    if (player.finished()) {
      finished++;
    }
    if (player.perfect(g.level)) {
      perfect++;
    }
  }
  if (perfect > 0) {
    g.level++;
  } else {
    g.level--;
  }
  if (g.level === 0) {
    return g.level = 1;
  }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2tldGNoLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBQTs7QUFBQSxDQUFBLEdBQUk7O0FBQ0osR0FBQSxHQUFNOztBQUVBO0VBQ1MsY0FBQyxFQUFELEVBQU8sRUFBUCxFQUFhLEVBQWIsRUFBbUIsQ0FBbkIsRUFBeUIsS0FBekI7QUFDYixRQUFBO0lBRGMsSUFBQyxDQUFBLGlCQUFELEtBQUc7SUFBRyxJQUFDLENBQUEsaUJBQUQsS0FBRztJQUFHLElBQUMsQ0FBQSxpQkFBRCxLQUFHO0lBQUcsSUFBQyxDQUFBLGdCQUFELElBQUc7SUFBRyxJQUFDLENBQUEsd0JBQUQsUUFBTztJQUM3QyxJQUFDLENBQUEsT0FBRCxHQUFXO0lBQ1gsSUFBQyxDQUFBLEtBQUQsR0FBUztJQUNULENBQUEsR0FBSTtJQUNKLENBQUEsR0FBSTtJQUNKLElBQUMsQ0FBQSxJQUFELEdBQVE7SUFDUixJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsQ0FBa0IsSUFBQSxNQUFBLENBQU8sTUFBUCxFQUFjLEVBQWQsRUFBaUIsRUFBakIsRUFBcUIsRUFBckIsRUFBd0IsRUFBeEIsQ0FBbEI7SUFDQSxJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsQ0FBa0IsSUFBQSxNQUFBLENBQU8sTUFBUCxFQUFjLEVBQWQsRUFBaUIsRUFBakIsRUFBcUIsRUFBckIsRUFBd0IsRUFBeEIsQ0FBbEI7SUFDQSxJQUFDLENBQUEsT0FBRCxHQUFnQixJQUFBLE1BQUEsQ0FBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYyxJQUFkLEVBQWlCLEdBQWpCLEVBQXNCLENBQXRCLEVBQXlCLENBQUMsRUFBMUIsRUFBOEIsQ0FBOUIsRUFBaUMsRUFBakMsRUFBcUMsRUFBckMsRUFBd0MsRUFBeEM7RUFSSDs7aUJBVWQsSUFBQSxHQUFPLFNBQUE7SUFDTixJQUFDLENBQUEsS0FBSyxDQUFDLElBQVAsQ0FBWSxDQUFDLElBQUMsQ0FBQSxDQUFGLEVBQUksSUFBQyxDQUFBLENBQUwsRUFBTyxJQUFDLENBQUEsQ0FBUixFQUFVLElBQUMsQ0FBQSxDQUFYLENBQVo7V0FDQSxJQUFBLENBQUE7RUFGTTs7aUJBR1AsR0FBQSxHQUFNLFNBQUE7QUFDTCxRQUFBO0lBQUEsTUFBZ0IsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQUEsQ0FBaEIsRUFBQyxJQUFDLENBQUEsVUFBRixFQUFJLElBQUMsQ0FBQSxVQUFMLEVBQU8sSUFBQyxDQUFBLFVBQVIsRUFBVSxJQUFDLENBQUE7V0FDWCxHQUFBLENBQUE7RUFGSzs7aUJBR04sTUFBQSxHQUFTLFNBQUMsQ0FBRDtJQUNSLE1BQUEsQ0FBTyxPQUFBLENBQVEsQ0FBUixDQUFQO1dBQ0EsSUFBQyxDQUFBLENBQUQsSUFBTTtFQUZFOztpQkFHVCxLQUFBLEdBQVEsU0FBQyxFQUFEO0lBQ1AsS0FBQSxDQUFNLEVBQU47V0FDQSxJQUFDLENBQUEsQ0FBRCxJQUFNO0VBRkM7O2lCQUdSLFNBQUEsR0FBWSxTQUFDLEVBQUQsRUFBSSxFQUFKO0FBQ1gsUUFBQTtJQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsSUFBQyxDQUFBLENBQVQ7SUFDSixJQUFDLENBQUEsQ0FBRCxJQUFNLElBQUMsQ0FBQSxDQUFELEdBQUssRUFBTCxHQUFVLEdBQUEsQ0FBSSxDQUFKLENBQVYsR0FBbUIsSUFBQyxDQUFBLENBQUQsR0FBSyxFQUFMLEdBQVUsR0FBQSxDQUFJLENBQUo7SUFDbkMsSUFBQyxDQUFBLENBQUQsSUFBTSxJQUFDLENBQUEsQ0FBRCxHQUFLLEVBQUwsR0FBVSxHQUFBLENBQUksQ0FBSixDQUFWLEdBQW1CLElBQUMsQ0FBQSxDQUFELEdBQUssRUFBTCxHQUFVLEdBQUEsQ0FBSSxDQUFKO1dBQ25DLFNBQUEsQ0FBVSxFQUFWLEVBQWEsRUFBYjtFQUpXOztpQkFLWixJQUFBLEdBQU8sU0FBQyxHQUFEO1dBQ04sS0FBQSxDQUFNLEdBQU4sRUFBVyxJQUFDLENBQUEsQ0FBWixFQUFjLElBQUMsQ0FBQSxDQUFmO0VBRE07O2lCQUdQLE9BQUEsR0FBVSxTQUFBO0lBQ1QsSUFBQyxDQUFBLElBQUQsR0FBUSxDQUFBLEdBQUksSUFBQyxDQUFBO0lBQ2IsSUFBRyxJQUFDLENBQUEsSUFBRCxLQUFTLENBQVo7TUFDQyxTQUFBLENBQUE7YUFDQSxJQUFDLENBQUEsYUFBRCxDQUFBLEVBRkQ7O0VBRlM7O2lCQU1WLE1BQUEsR0FBUyxTQUFBO0FBQ1IsUUFBQTtJQUFBLElBQUEsQ0FBSyxHQUFMO0lBQ0EsSUFBQSxDQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsS0FBVCxFQUFlLE1BQWY7SUFFQSxJQUFHLElBQUMsQ0FBQSxPQUFRLENBQUEsQ0FBQSxDQUFFLENBQUMsS0FBWixLQUFxQixDQUF4QjtNQUNDLElBQUMsQ0FBQSxPQUFRLENBQUEsQ0FBQSxDQUFFLENBQUMsS0FBWixHQUFvQixLQUFBLENBQU0sR0FBTixFQURyQjtLQUFBLE1BRUssSUFBRyxJQUFDLENBQUEsT0FBUSxDQUFBLENBQUEsQ0FBRSxDQUFDLEtBQVosQ0FBQSxDQUFBLEdBQXNCLElBQUMsQ0FBQSxPQUFRLENBQUEsQ0FBQSxDQUFFLENBQUMsS0FBWixDQUFBLENBQXRCLElBQTZDLElBQUMsQ0FBQSxPQUFRLENBQUEsQ0FBQSxDQUFFLENBQUMsS0FBWixLQUFxQixDQUFyRTtNQUNKLElBQUMsQ0FBQSxPQUFRLENBQUEsQ0FBQSxDQUFFLENBQUMsS0FBWixHQUFvQixLQUFBLENBQU0sQ0FBTixFQUFRLEdBQVIsRUFBWSxDQUFaLEVBRGhCO0tBQUEsTUFBQTtNQUdKLElBQUMsQ0FBQSxPQUFRLENBQUEsQ0FBQSxDQUFFLENBQUMsS0FBWixHQUFvQixLQUFBLENBQU0sR0FBTixFQUFVLENBQVYsRUFBWSxDQUFaLEVBSGhCOztJQUtMLElBQUcsSUFBQyxDQUFBLE9BQVEsQ0FBQSxDQUFBLENBQUUsQ0FBQyxLQUFaLEtBQXFCLENBQXhCO01BQ0MsSUFBQyxDQUFBLE9BQVEsQ0FBQSxDQUFBLENBQUUsQ0FBQyxLQUFaLEdBQW9CLEtBQUEsQ0FBTSxHQUFOLEVBRHJCO0tBQUEsTUFFSyxJQUFHLElBQUMsQ0FBQSxPQUFRLENBQUEsQ0FBQSxDQUFFLENBQUMsS0FBWixDQUFBLENBQUEsR0FBc0IsSUFBQyxDQUFBLE9BQVEsQ0FBQSxDQUFBLENBQUUsQ0FBQyxLQUFaLENBQUEsQ0FBdEIsSUFBNkMsSUFBQyxDQUFBLE9BQVEsQ0FBQSxDQUFBLENBQUUsQ0FBQyxLQUFaLEtBQXFCLENBQXJFO01BQ0osSUFBQyxDQUFBLE9BQVEsQ0FBQSxDQUFBLENBQUUsQ0FBQyxLQUFaLEdBQW9CLEtBQUEsQ0FBTSxDQUFOLEVBQVEsR0FBUixFQUFZLENBQVosRUFEaEI7S0FBQSxNQUFBO01BR0osSUFBQyxDQUFBLE9BQVEsQ0FBQSxDQUFBLENBQUUsQ0FBQyxLQUFaLEdBQW9CLEtBQUEsQ0FBTSxHQUFOLEVBQVUsQ0FBVixFQUFZLENBQVosRUFIaEI7O0FBS0w7QUFBQSxTQUFBLHFDQUFBOztNQUNDLE1BQU0sQ0FBQyxNQUFQLENBQUE7QUFERDtXQUdBLElBQUMsQ0FBQSxZQUFELENBQUE7RUFyQlE7O2lCQXVCVCxZQUFBLEdBQWUsU0FBQTtBQUNkLFFBQUE7SUFBQSxJQUFBLENBQUssQ0FBTDtJQUNBLENBQUEsR0FBSTtJQUNKLENBQUEsR0FBSSxNQUFBLEdBQVM7SUFDYixRQUFBLENBQVMsQ0FBVDtBQUVBO0FBQUE7U0FBQSw2Q0FBQTs7TUFDQyxDQUFBLEdBQUksR0FBQSxDQUFJLENBQUEsR0FBSSxDQUFSO01BQ0osQ0FBQSxHQUFJLEdBQUEsQ0FBSSxDQUFBLEdBQUksQ0FBUjttQkFDSixJQUFBLENBQUssTUFBTSxDQUFDLFFBQVAsQ0FBQSxDQUFMLEVBQXdCLENBQUEsR0FBRSxHQUExQixFQUErQixDQUFDLEdBQUQsR0FBSyxDQUFMLEdBQVMsQ0FBQSxHQUFFLENBQTFDO0FBSEQ7O0VBTmM7O2lCQVdmLGFBQUEsR0FBZ0IsU0FBQTtBQUNmLFFBQUE7SUFBQSxDQUFBLEdBQUksR0FBQSxDQUFJLE1BQUEsQ0FBTyxDQUFDLENBQVIsRUFBVSxDQUFWLENBQUo7SUFDSixDQUFBLEdBQUksR0FBQSxDQUFJLE1BQUEsQ0FBTyxDQUFDLENBQVIsRUFBVSxDQUFWLENBQUo7SUFDSixDQUFBLEdBQVEsSUFBQSxPQUFBLENBQVEsQ0FBUixFQUFVLENBQVY7SUFDUixHQUFBLEdBQU0sQ0FBQyxDQUFEO0lBQ04sSUFBQSxHQUFPO0lBQ1AsSUFBSyxDQUFBLENBQUMsQ0FBQyxRQUFGLENBQUEsQ0FBQSxDQUFMLEdBQXFCO0lBQ3JCLElBQUEsR0FBTztJQUVQLEVBQUEsR0FBUyxJQUFBLE9BQUEsQ0FBUSxDQUFSLEVBQVUsQ0FBVjtJQUNULEVBQUEsR0FBUyxJQUFBLE9BQUEsQ0FBUSxDQUFSLEVBQVUsQ0FBVjtJQUNULEVBQUEsR0FBUyxJQUFBLE9BQUEsQ0FBUSxDQUFSLEVBQVUsQ0FBVjtJQUVULElBQUEsR0FBTyxTQUFDLEtBQUQsRUFBUSxLQUFSO01BQ04sSUFBRyxDQUFBLENBQUEsS0FBQSxJQUFhLElBQWIsQ0FBSDtRQUNDLElBQUksQ0FBQyxJQUFMLENBQVUsS0FBVjtlQUNBLElBQUssQ0FBQSxLQUFBLENBQUwsR0FBYyxNQUZmOztJQURNO0FBS1A7QUFBQSxTQUFBLHFDQUFBOztNQUNDLElBQUEsR0FBTztBQUNQLFdBQUEsdUNBQUE7O1FBQ0MsSUFBQSxDQUFLLElBQUwsRUFBVyxJQUFJLENBQUMsR0FBTCxDQUFTLEVBQVQsQ0FBWDtRQUNBLElBQUEsQ0FBSyxJQUFMLEVBQVcsSUFBSSxDQUFDLEdBQUwsQ0FBUyxFQUFULENBQVg7UUFDQSxJQUFBLENBQUssSUFBTCxFQUFXLElBQUksQ0FBQyxHQUFMLENBQVMsRUFBVCxDQUFYO0FBSEQ7TUFJQSxHQUFBLEdBQU07QUFOUDtJQVFBLENBQUEsR0FBSSxJQUFDLENBQUEsWUFBRCxDQUFjLEdBQWQ7SUFDSixJQUFDLENBQUEsUUFBRCxHQUFZLElBQUMsQ0FBQSxJQUFELENBQU0sQ0FBTixFQUFRLElBQVI7SUFHWixDQUFBLEdBQVEsSUFBQSxJQUFBLENBQUE7SUFDUixFQUFBLEdBQUssR0FBQSxDQUFJLENBQUMsQ0FBQyxPQUFGLENBQUEsQ0FBSjtBQUNMO0FBQUE7U0FBQSx3Q0FBQTs7TUFDQyxNQUFNLENBQUMsT0FBUCxHQUFpQixDQUFDLENBQUQ7TUFDakIsTUFBTSxDQUFDLE1BQVAsR0FBZ0I7TUFDaEIsTUFBTSxDQUFDLEtBQVAsR0FBZTtNQUNmLE1BQU0sQ0FBQyxLQUFQLEdBQWU7TUFDZixNQUFNLENBQUMsS0FBUCxHQUFlO21CQUNmLE1BQU0sQ0FBQyxLQUFQLEdBQWUsSUFBQyxDQUFBO0FBTmpCOztFQWhDZTs7aUJBd0NoQixJQUFBLEdBQU8sU0FBQyxDQUFELEVBQUcsSUFBSDtJQUNOLElBQWEsQ0FBQSxLQUFLLElBQWxCO0FBQUEsYUFBTyxHQUFQOztXQUNBLElBQUMsQ0FBQSxJQUFELENBQU0sSUFBSyxDQUFBLENBQUEsQ0FBWCxFQUFlLElBQWYsQ0FBb0IsQ0FBQyxNQUFyQixDQUE0QixDQUFDLENBQUQsQ0FBNUI7RUFGTTs7aUJBSVAsWUFBQSxHQUFlLFNBQUMsR0FBRDtBQUNkLFFBQUE7SUFBQSxFQUFBOztBQUFNO1dBQUEscUNBQUE7O1lBQTBCLENBQUEsQ0FBQyxFQUFELFVBQU0sSUFBSSxDQUFDLEVBQVgsT0FBQSxJQUFnQixFQUFoQixDQUFBLElBQXVCLENBQUEsQ0FBQyxFQUFELFdBQU0sSUFBSSxDQUFDLEVBQVgsUUFBQSxJQUFnQixFQUFoQjt1QkFBakQ7O0FBQUE7OztJQUNOLElBQXNCLEVBQUUsQ0FBQyxNQUFILEdBQVksQ0FBbEM7QUFBQSxhQUFPLENBQUMsQ0FBQyxNQUFGLENBQVMsRUFBVCxFQUFQOztXQUNBLENBQUMsQ0FBQyxHQUFGLENBQU0sR0FBTixFQUFXLFNBQUMsSUFBRDthQUFVLElBQUEsQ0FBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLElBQUksQ0FBQyxDQUFkLEVBQWdCLElBQUksQ0FBQyxDQUFyQjtJQUFWLENBQVg7RUFIYzs7Ozs7O0FBS2hCLEtBQUEsR0FBUSxTQUFBO0VBQ1AsWUFBQSxDQUFhLFdBQWIsRUFBMEIsWUFBMUI7RUFDQSxTQUFBLENBQVUsRUFBVjtFQUNBLFNBQUEsQ0FBVSxNQUFWLEVBQWlCLE1BQWpCO0VBQ0EsUUFBQSxDQUFTLE1BQVQ7RUFDQSxTQUFBLENBQVUsTUFBVjtFQUVBLENBQUEsR0FBUSxJQUFBLElBQUEsQ0FBQTtFQUNSLENBQUMsQ0FBQyxhQUFGLENBQUE7U0FDQSxLQUFBLENBQUE7QUFUTzs7QUFXUixLQUFBLEdBQVEsU0FBQTtBQUNQLE1BQUE7RUFBQSxFQUFBLENBQUcsR0FBSDtFQUNBLENBQUMsQ0FBQyxJQUFGLENBQUE7RUFDQSxDQUFDLENBQUMsU0FBRixDQUFZLEdBQUEsQ0FBSSxLQUFBLEdBQU0sQ0FBVixDQUFaLEVBQTBCLEdBQUEsQ0FBSSxNQUFBLEdBQU8sQ0FBWCxDQUExQjtBQUVBO0FBQUEsT0FBQSw2Q0FBQTs7SUFDQyxDQUFDLENBQUMsSUFBRixDQUFBO0lBQ0EsQ0FBQyxDQUFDLFNBQUYsQ0FBWSxDQUFDLENBQUEsR0FBRSxDQUFGLEdBQUksQ0FBTCxDQUFBLEdBQVUsS0FBVixHQUFnQixDQUE1QixFQUErQixDQUEvQjtJQUNBLE1BQU0sQ0FBQyxJQUFQLENBQUE7SUFDQSxDQUFDLENBQUMsR0FBRixDQUFBO0FBSkQ7RUFLQSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQVYsQ0FBQTtFQUNBLElBQWMsQ0FBQyxDQUFDLElBQUYsS0FBUSxDQUF0QjtJQUFBLENBQUMsQ0FBQyxNQUFGLENBQUEsRUFBQTs7U0FDQSxDQUFDLENBQUMsR0FBRixDQUFBO0FBWk87O0FBY1IsWUFBQSxHQUFlLFNBQUE7QUFDZCxNQUFBO0FBQUEsT0FBQSx5Q0FBQTs7SUFDQyxJQUFHLENBQUEsQ0FBQSxLQUFLLENBQUMsRUFBTixJQUFnQixHQUFoQixDQUFIO01BQ0MsR0FBSSxDQUFBLEtBQUssQ0FBQyxFQUFOLENBQUosR0FBZ0I7QUFDaEI7QUFBQSxXQUFBLHVDQUFBOztRQUNDLE1BQU0sQ0FBQyxZQUFQLENBQW9CLEtBQUssQ0FBQyxDQUExQixFQUE0QixLQUFLLENBQUMsQ0FBbEM7QUFERCxPQUZEOztBQUREO0VBS0EsSUFBWSxLQUFLLENBQUMsTUFBTixLQUFnQixDQUE1QjtJQUFBLEdBQUEsR0FBTSxHQUFOOztFQUNBLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBVixDQUF1QixLQUFLLENBQUMsQ0FBN0IsRUFBK0IsS0FBSyxDQUFDLENBQXJDO1NBQ0EsS0FBQSxDQUFBO0FBUmM7O0FBVWYsWUFBQSxHQUFlLFNBQUE7QUFDZCxNQUFBO0FBQUE7QUFBQSxPQUFBLHFDQUFBOztJQUFBLE1BQU0sQ0FBQyxZQUFQLENBQUE7QUFBQTtFQUNBLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBVixDQUFBO1NBQ0EsS0FBQSxDQUFBO0FBSGM7O0FBS2YsVUFBQSxHQUFhLFNBQUE7QUFDWixNQUFBO0VBQUEsSUFBRyxHQUFBLEtBQU8sR0FBVjtJQUNDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVixDQUFxQixHQUFyQixFQUREO0dBQUEsTUFBQTtBQUdDO0FBQUEsU0FBQSxxQ0FBQTs7TUFBQSxNQUFNLENBQUMsVUFBUCxDQUFrQixHQUFsQjtBQUFBLEtBSEQ7O1NBSUEsS0FBQSxDQUFBO0FBTFk7O0FBT2IsU0FBQSxHQUFZLFNBQUE7QUFDWCxNQUFBO0VBQUEsUUFBQSxHQUFXO0VBQ1gsT0FBQSxHQUFVO0FBQ1Y7QUFBQSxPQUFBLHFDQUFBOztJQUNDLElBQUcsTUFBTSxDQUFDLFFBQVAsQ0FBQSxDQUFIO01BQ0MsUUFBQSxHQUREOztJQUVBLElBQUcsTUFBTSxDQUFDLE9BQVAsQ0FBZSxDQUFDLENBQUMsS0FBakIsQ0FBSDtNQUNDLE9BQUEsR0FERDs7QUFIRDtFQUtBLElBQUcsT0FBQSxHQUFVLENBQWI7SUFDQyxDQUFDLENBQUMsS0FBRixHQUREO0dBQUEsTUFBQTtJQUdDLENBQUMsQ0FBQyxLQUFGLEdBSEQ7O0VBSUEsSUFBRyxDQUFDLENBQUMsS0FBRixLQUFXLENBQWQ7V0FDQyxDQUFDLENBQUMsS0FBRixHQUFVLEVBRFg7O0FBWlciLCJzb3VyY2VzQ29udGVudCI6WyJnID0gMFxyXG5pZHMgPSB7fVxyXG5cclxuY2xhc3MgR2FtZVxyXG5cdGNvbnN0cnVjdG9yIDogKEB4PTAsIEB5PTAsIEBhPTAsIEBzPTEsIEBzdGFjaz1bXSkgLT5cclxuXHRcdEBwbGF5ZXJzID0gW11cclxuXHRcdEBsZXZlbCA9IDFcclxuXHRcdHcgPSB3aWR0aFxyXG5cdFx0aCA9IGhlaWdodCAgIFxyXG5cdFx0QG1vZGUgPSAwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuXHRcdEBwbGF5ZXJzLnB1c2ggbmV3IFBsYXllciBcIldBU0RcIiwzMCwzMCwgNjAsNjBcclxuXHRcdEBwbGF5ZXJzLnB1c2ggbmV3IFBsYXllciBcIiYlKCdcIiw5MCwzMCwgNjAsNjBcclxuXHRcdEBkaXNwbGF5ID0gIG5ldyBCdXR0b24gMCwwLDAsIEAsIDAuMiwgMCwgLTI0LCA2LCAxMiwgXCJcIixcIlwiXHJcblxyXG5cdHB1c2ggOiAtPlxyXG5cdFx0QHN0YWNrLnB1c2ggW0B4LEB5LEBhLEBzXVxyXG5cdFx0cHVzaCgpXHJcblx0cG9wIDogLT5cclxuXHRcdFtAeCxAeSxAYSxAc10gPSBAc3RhY2sucG9wKClcclxuXHRcdHBvcCgpXHJcblx0cm90YXRlIDogKGQpIC0+XHJcblx0XHRyb3RhdGUgcmFkaWFucyBkXHJcblx0XHRAYSArPSBkXHJcblx0c2NhbGUgOiAoZHMpIC0+XHJcblx0XHRzY2FsZSBkc1xyXG5cdFx0QHMgKj0gZHNcclxuXHR0cmFuc2xhdGUgOiAoZHgsZHkpIC0+XHJcblx0XHR2ID0gcmFkaWFucyBAYVxyXG5cdFx0QHggKz0gQHMgKiBkeCAqIGNvcyh2KSAtIEBzICogZHkgKiBzaW4odilcclxuXHRcdEB5ICs9IEBzICogZHkgKiBjb3ModikgKyBAcyAqIGR4ICogc2luKHYpXHJcblx0XHR0cmFuc2xhdGUgZHgsZHlcclxuXHRkdW1wIDogKHR4dCkgLT5cclxuXHRcdHByaW50IHR4dCwgQHgsQHlcclxuXHJcblx0cHJvY2VzcyA6IC0+XHJcblx0XHRAbW9kZSA9IDEgLSBAbW9kZVxyXG5cdFx0aWYgQG1vZGUgPT0gMFxyXG5cdFx0XHRhdXRvbGV2ZWwoKVxyXG5cdFx0XHRAY3JlYXRlUHJvYmxlbSgpXHJcblxyXG5cdHJlc3VsdCA6IC0+XHJcblx0XHRmaWxsIDEyN1xyXG5cdFx0cmVjdCAwLDAsd2lkdGgsaGVpZ2h0XHJcblxyXG5cdFx0aWYgQHBsYXllcnNbMF0uc3RvcHAgPT0gMFxyXG5cdFx0XHRAcGxheWVyc1swXS5jb2xvciA9IGNvbG9yIDEyN1xyXG5cdFx0ZWxzZSBpZiBAcGxheWVyc1swXS5zY29yZSgpIDwgQHBsYXllcnNbMV0uc2NvcmUoKSBvciBAcGxheWVyc1sxXS5zdG9wcCA9PSAwICBcclxuXHRcdFx0QHBsYXllcnNbMF0uY29sb3IgPSBjb2xvciAwLDI1NSwwXHJcblx0XHRlbHNlXHJcblx0XHRcdEBwbGF5ZXJzWzBdLmNvbG9yID0gY29sb3IgMjU1LDAsMFxyXG5cclxuXHRcdGlmIEBwbGF5ZXJzWzFdLnN0b3BwID09IDBcclxuXHRcdFx0QHBsYXllcnNbMV0uY29sb3IgPSBjb2xvciAxMjdcclxuXHRcdGVsc2UgaWYgQHBsYXllcnNbMV0uc2NvcmUoKSA8IEBwbGF5ZXJzWzBdLnNjb3JlKCkgb3IgQHBsYXllcnNbMF0uc3RvcHAgPT0gMCAgXHJcblx0XHRcdEBwbGF5ZXJzWzFdLmNvbG9yID0gY29sb3IgMCwyNTUsMFxyXG5cdFx0ZWxzZVxyXG5cdFx0XHRAcGxheWVyc1sxXS5jb2xvciA9IGNvbG9yIDI1NSwwLDBcclxuXHJcblx0XHRmb3IgcGxheWVyIGluIEBwbGF5ZXJzXHJcblx0XHRcdHBsYXllci5yZXN1bHQoKVxyXG5cclxuXHRcdEBzb2x2ZV9yZXN1bHQoKVx0XHJcblxyXG5cdHNvbHZlX3Jlc3VsdCA6IC0+XHJcblx0XHRmaWxsIDBcclxuXHRcdG4gPSAyMCBcclxuXHRcdEggPSBoZWlnaHQgLyBuXHJcblx0XHR0ZXh0U2l6ZSBIXHJcblxyXG5cdFx0Zm9yIG51bWJlcixpIGluIEBzb2x1dGlvblxyXG5cdFx0XHR4ID0gaW50IGkgLyBuXHJcblx0XHRcdHkgPSBpbnQgaSAlIG5cclxuXHRcdFx0dGV4dCBudW1iZXIudG9TdHJpbmcoKSwgeCoxMDAsIC04LjUqSCArIHkqSFx0XHRcclxuXHJcblx0Y3JlYXRlUHJvYmxlbSA6IC0+XHJcblx0XHR4ID0gaW50IHJhbmRvbSAtNSw2XHJcblx0XHR5ID0gaW50IHJhbmRvbSAtNSw2XHJcblx0XHRhID0gbmV3IENvbXBsZXggeCx5XHJcblx0XHRsc3QgPSBbYV1cclxuXHRcdHRyZWUgPSB7fVxyXG5cdFx0dHJlZVthLnRvU3RyaW5nKCldID0gbnVsbCBcclxuXHRcdGxzdDIgPSBbXVxyXG5cclxuXHRcdGMxID0gbmV3IENvbXBsZXggMCwxXHJcblx0XHRjMiA9IG5ldyBDb21wbGV4IDIsMFxyXG5cdFx0YzMgPSBuZXcgQ29tcGxleCAxLDBcclxuXHJcblx0XHRzYXZlID0gKGl0ZW0xLCBpdGVtMikgLT5cclxuXHRcdFx0aWYgaXRlbTIgbm90IG9mIHRyZWVcclxuXHRcdFx0XHRsc3QyLnB1c2ggaXRlbTJcclxuXHRcdFx0XHR0cmVlW2l0ZW0yXSA9IGl0ZW0xXHJcblxyXG5cdFx0Zm9yIGogaW4gcmFuZ2UgQGxldmVsXHJcblx0XHRcdGxzdDIgPSBbXVxyXG5cdFx0XHRmb3IgaXRlbSBpbiBsc3RcclxuXHRcdFx0XHRzYXZlIGl0ZW0sIGl0ZW0ubXVsIGMxXHJcblx0XHRcdFx0c2F2ZSBpdGVtLCBpdGVtLm11bCBjMlxyXG5cdFx0XHRcdHNhdmUgaXRlbSwgaXRlbS5hZGQgYzNcclxuXHRcdFx0bHN0ID0gbHN0MlxyXG5cdFx0XHRcclxuXHRcdGIgPSBAc2VsZWN0VGFyZ2V0IGxzdFxyXG5cdFx0QHNvbHV0aW9uID0gQHBhdGggYix0cmVlXHJcblx0XHQjIGNvbnNvbGUubG9nIEBzb2x1dGlvbi5qb2luKCcgJylcclxuXHJcblx0XHRkID0gbmV3IERhdGUoKVxyXG5cdFx0bXMgPSBpbnQgZC5nZXRUaW1lKClcclxuXHRcdGZvciBwbGF5ZXIgaW4gQHBsYXllcnNcclxuXHRcdFx0cGxheWVyLmhpc3RvcnkgPSBbYV1cclxuXHRcdFx0cGxheWVyLnRhcmdldCA9IGJcclxuXHRcdFx0cGxheWVyLmNvdW50ID0gMFxyXG5cdFx0XHRwbGF5ZXIuc3RhcnQgPSBtcyBcclxuXHRcdFx0cGxheWVyLnN0b3BwID0gMFxyXG5cdFx0XHRwbGF5ZXIubGV2ZWwgPSBAbGV2ZWxcclxuXHJcblx0cGF0aCA6IChiLHRyZWUpIC0+XHJcblx0XHRyZXR1cm4gW10gaWYgYiA9PSBudWxsXHJcblx0XHRAcGF0aCh0cmVlW2JdLCB0cmVlKS5jb25jYXQgW2JdXHJcblxyXG5cdHNlbGVjdFRhcmdldCA6IChsc3QpIC0+ICMgd2l0aGluIDIxeDIxIHdpbmRvdywgaWYgcG9zc2libGVcclxuXHRcdGJzID0gKGl0ZW0gZm9yIGl0ZW0gaW4gbHN0IHdoZW4gLTEwIDwgaXRlbS54IDw9IDEwIGFuZCAtMTAgPCBpdGVtLnkgPD0gMTApXHJcblx0XHRyZXR1cm4gXy5zYW1wbGUgYnMgaWYgYnMubGVuZ3RoID4gMFxyXG5cdFx0Xy5taW4gbHN0LCAoaXRlbSkgLT4gZGlzdCAwLDAsaXRlbS54LGl0ZW0ueVxyXG5cclxuc2V0dXAgPSAtPlxyXG5cdGNyZWF0ZUNhbnZhcyB3aW5kb3dXaWR0aCwgd2luZG93SGVpZ2h0XHJcblx0ZnJhbWVSYXRlIDE1XHJcblx0dGV4dEFsaWduIENFTlRFUixDRU5URVJcclxuXHRyZWN0TW9kZSBDRU5URVJcclxuXHRzdHJva2VDYXAgU1FVQVJFXHJcblx0I25vU21vb3RoKClcclxuXHRnID0gbmV3IEdhbWUoKVxyXG5cdGcuY3JlYXRlUHJvYmxlbSgpXHRcdFxyXG5cdHhkcmF3KClcclxuXHJcbnhkcmF3ID0gLT5cclxuXHRiZyAwLjVcclxuXHRnLnB1c2goKVxyXG5cdGcudHJhbnNsYXRlIGludCh3aWR0aC8yKSwgaW50KGhlaWdodC8yKVx0IyBpbnRlZ2VycyBuZWVkZWQgaGVyZSBvciBibHVycnkgZ3JpZCBsaW5lc1xyXG5cclxuXHRmb3IgcGxheWVyLGkgaW4gZy5wbGF5ZXJzXHJcblx0XHRnLnB1c2goKVxyXG5cdFx0Zy50cmFuc2xhdGUgKDIqaS0xKSAqIHdpZHRoLzQsIDBcclxuXHRcdHBsYXllci5kcmF3KClcclxuXHRcdGcucG9wKClcclxuXHRnLmRpc3BsYXkuZHJhdygpXHRcclxuXHRnLnJlc3VsdCgpIGlmIGcubW9kZT09MVxyXG5cdGcucG9wKClcclxuXHJcbnRvdWNoU3RhcnRlZCA9IC0+IFxyXG5cdGZvciB0b3VjaCBpbiB0b3VjaGVzXHJcblx0XHRpZiB0b3VjaC5pZCBub3Qgb2YgaWRzIFxyXG5cdFx0XHRpZHNbdG91Y2guaWRdID0gdG91Y2hcclxuXHRcdFx0Zm9yIHBsYXllciBpbiBnLnBsYXllcnNcclxuXHRcdFx0XHRwbGF5ZXIudG91Y2hTdGFydGVkIHRvdWNoLngsdG91Y2gueVxyXG5cdGlkcyA9IHt9IGlmIHRvdWNoLmxlbmd0aCA9PSAwXHJcblx0Zy5kaXNwbGF5LnRvdWNoU3RhcnRlZCB0b3VjaC54LHRvdWNoLnlcclxuXHR4ZHJhdygpXHJcblxyXG5tb3VzZVByZXNzZWQgPSAtPlxyXG5cdHBsYXllci5tb3VzZVByZXNzZWQoKSBmb3IgcGxheWVyIGluIGcucGxheWVyc1xyXG5cdGcuZGlzcGxheS5tb3VzZVByZXNzZWQoKVxyXG5cdHhkcmF3KClcclxuXHJcbmtleVByZXNzZWQgPSAtPlxyXG5cdGlmIGtleSA9PSAnICcgXHJcblx0XHRnLmRpc3BsYXkua2V5UHJlc3NlZChrZXkpXHJcblx0ZWxzZVxyXG5cdFx0cGxheWVyLmtleVByZXNzZWQoa2V5KSBmb3IgcGxheWVyIGluIGcucGxheWVyc1xyXG5cdHhkcmF3KClcclxuXHJcbmF1dG9sZXZlbCA9IC0+XHJcblx0ZmluaXNoZWQgPSAwXHJcblx0cGVyZmVjdCA9IDBcclxuXHRmb3IgcGxheWVyIGluIGcucGxheWVyc1xyXG5cdFx0aWYgcGxheWVyLmZpbmlzaGVkKClcclxuXHRcdFx0ZmluaXNoZWQrK1xyXG5cdFx0aWYgcGxheWVyLnBlcmZlY3QgZy5sZXZlbFxyXG5cdFx0XHRwZXJmZWN0KytcdFxyXG5cdGlmIHBlcmZlY3QgPiAwXHJcblx0XHRnLmxldmVsKytcclxuXHRlbHNlIFxyXG5cdFx0Zy5sZXZlbC0tXHJcblx0aWYgZy5sZXZlbCA9PSAwXHJcblx0XHRnLmxldmVsID0gMVxyXG4iXX0=
//# sourceURL=C:\github\p5Complex\www\sketch.coffee