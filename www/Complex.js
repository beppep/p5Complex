// Generated by CoffeeScript 1.12.2
var Complex;

Complex = (function() {
  function Complex(x, y) {
    this.x = x;
    this.y = y;
  }

  Complex.prototype.add = function(other) {
    return new Complex(this.x + other.x, this.y + other.y);
  };

  Complex.prototype.mul = function(other) {
    var a, b, c, d;
    a = this.x;
    b = this.y;
    c = other.x;
    d = other.y;
    return new Complex(a * c - b * d, b * c + a * d);
  };

  Complex.prototype.mir = function() {
    return new Complex(this.y, this.x);
  };

  Complex.prototype.toString = function() {
    var s, sx, sy;
    if (this.x === 0) {
      sx = "";
    }
    if (this.x > 0) {
      sx = "" + this.x;
    }
    if (this.x < 0) {
      sx = "" + this.x;
    }
    if (this.y === 0) {
      sy = "";
    }
    if (this.y === -1) {
      sy = "-i";
    }
    if (this.y === 1) {
      sy = "i";
    }
    if (this.y > 1) {
      sy = this.y + "i";
    }
    if (this.y < -1) {
      sy = this.y + "i";
    }
    if (sx !== "" && sy !== "") {
      if (this.y < 0) {
        s = sx + sy;
      } else if (this.y === 0) {
        s = sx;
      } else {
        s = sx + "+" + sy;
      }
    } else if (this.x === 0 && this.y === 0) {
      s = "0";
    } else {
      s = sx + sy;
    }
    return s;
  };

  return Complex;

})();

assert("-1", new Complex(-1, 0).toString());

assert("-1-i", new Complex(-1, -1).toString());

assert("-i", new Complex(0, -1).toString());

assert("0", new Complex(0, 0).toString());

assert("i", new Complex(0, 1).toString());

assert("1-2i", new Complex(1, -2).toString());

assert("1-i", new Complex(1, -1).toString());

assert("1", new Complex(1, 0).toString());

assert("1+i", new Complex(1, 1).toString());

assert("1+2i", new Complex(1, 2).toString());

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tcGxleC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkNvbXBsZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFBOztBQUFNO0VBQ1MsaUJBQUMsQ0FBRCxFQUFJLENBQUo7SUFBQyxJQUFDLENBQUEsSUFBRDtJQUFHLElBQUMsQ0FBQSxJQUFEO0VBQUo7O29CQUNkLEdBQUEsR0FBTSxTQUFDLEtBQUQ7V0FDRCxJQUFBLE9BQUEsQ0FBUSxJQUFDLENBQUEsQ0FBRCxHQUFHLEtBQUssQ0FBQyxDQUFqQixFQUFvQixJQUFDLENBQUEsQ0FBRCxHQUFHLEtBQUssQ0FBQyxDQUE3QjtFQURDOztvQkFFTixHQUFBLEdBQU0sU0FBQyxLQUFEO0FBQ0wsUUFBQTtJQUFBLENBQUEsR0FBSSxJQUFDLENBQUE7SUFDTCxDQUFBLEdBQUksSUFBQyxDQUFBO0lBQ0wsQ0FBQSxHQUFJLEtBQUssQ0FBQztJQUNWLENBQUEsR0FBSSxLQUFLLENBQUM7V0FDTixJQUFBLE9BQUEsQ0FBUSxDQUFBLEdBQUUsQ0FBRixHQUFJLENBQUEsR0FBRSxDQUFkLEVBQWlCLENBQUEsR0FBRSxDQUFGLEdBQUksQ0FBQSxHQUFFLENBQXZCO0VBTEM7O29CQU1OLEdBQUEsR0FBTSxTQUFBO1dBQ0QsSUFBQSxPQUFBLENBQVEsSUFBQyxDQUFBLENBQVQsRUFBWSxJQUFDLENBQUEsQ0FBYjtFQURDOztvQkFFTixRQUFBLEdBQVcsU0FBQTtBQUNWLFFBQUE7SUFBQSxJQUFXLElBQUMsQ0FBQSxDQUFELEtBQU0sQ0FBakI7TUFBQSxFQUFBLEdBQUssR0FBTDs7SUFDQSxJQUFnQixJQUFDLENBQUEsQ0FBRCxHQUFLLENBQXJCO01BQUEsRUFBQSxHQUFLLEVBQUEsR0FBRyxJQUFDLENBQUEsRUFBVDs7SUFDQSxJQUFnQixJQUFDLENBQUEsQ0FBRCxHQUFLLENBQXJCO01BQUEsRUFBQSxHQUFLLEVBQUEsR0FBRyxJQUFDLENBQUEsRUFBVDs7SUFFQSxJQUFXLElBQUMsQ0FBQSxDQUFELEtBQU0sQ0FBakI7TUFBQSxFQUFBLEdBQUssR0FBTDs7SUFDQSxJQUFhLElBQUMsQ0FBQSxDQUFELEtBQU0sQ0FBQyxDQUFwQjtNQUFBLEVBQUEsR0FBSyxLQUFMOztJQUNBLElBQVksSUFBQyxDQUFBLENBQUQsS0FBTSxDQUFsQjtNQUFBLEVBQUEsR0FBSyxJQUFMOztJQUNBLElBQWlCLElBQUMsQ0FBQSxDQUFELEdBQUssQ0FBdEI7TUFBQSxFQUFBLEdBQVEsSUFBQyxDQUFBLENBQUYsR0FBSSxJQUFYOztJQUNBLElBQWlCLElBQUMsQ0FBQSxDQUFELEdBQUssQ0FBQyxDQUF2QjtNQUFBLEVBQUEsR0FBUSxJQUFDLENBQUEsQ0FBRixHQUFJLElBQVg7O0lBRUEsSUFBRyxFQUFBLEtBQUksRUFBSixJQUFXLEVBQUEsS0FBSSxFQUFsQjtNQUNDLElBQUcsSUFBQyxDQUFBLENBQUQsR0FBSyxDQUFSO1FBQ0MsQ0FBQSxHQUFJLEVBQUEsR0FBRyxHQURSO09BQUEsTUFFSyxJQUFHLElBQUMsQ0FBQSxDQUFELEtBQUksQ0FBUDtRQUNKLENBQUEsR0FBSSxHQURBO09BQUEsTUFBQTtRQUdKLENBQUEsR0FBSSxFQUFBLEdBQUssR0FBTCxHQUFXLEdBSFg7T0FITjtLQUFBLE1BT0ssSUFBRyxJQUFDLENBQUEsQ0FBRCxLQUFJLENBQUosSUFBVSxJQUFDLENBQUEsQ0FBRCxLQUFJLENBQWpCO01BQ0osQ0FBQSxHQUFJLElBREE7S0FBQSxNQUFBO01BR0osQ0FBQSxHQUFJLEVBQUEsR0FBSyxHQUhMOztXQUlMO0VBdEJVOzs7Ozs7QUF1QlosTUFBQSxDQUFPLElBQVAsRUFBaUIsSUFBQSxPQUFBLENBQVEsQ0FBQyxDQUFULEVBQVcsQ0FBWCxDQUFhLENBQUMsUUFBZCxDQUFBLENBQWpCOztBQUNBLE1BQUEsQ0FBTyxNQUFQLEVBQW1CLElBQUEsT0FBQSxDQUFRLENBQUMsQ0FBVCxFQUFXLENBQUMsQ0FBWixDQUFjLENBQUMsUUFBZixDQUFBLENBQW5COztBQUNBLE1BQUEsQ0FBTyxJQUFQLEVBQWlCLElBQUEsT0FBQSxDQUFRLENBQVIsRUFBVSxDQUFDLENBQVgsQ0FBYSxDQUFDLFFBQWQsQ0FBQSxDQUFqQjs7QUFDQSxNQUFBLENBQU8sR0FBUCxFQUFnQixJQUFBLE9BQUEsQ0FBUSxDQUFSLEVBQVUsQ0FBVixDQUFZLENBQUMsUUFBYixDQUFBLENBQWhCOztBQUNBLE1BQUEsQ0FBTyxHQUFQLEVBQWdCLElBQUEsT0FBQSxDQUFRLENBQVIsRUFBVSxDQUFWLENBQVksQ0FBQyxRQUFiLENBQUEsQ0FBaEI7O0FBQ0EsTUFBQSxDQUFPLE1BQVAsRUFBbUIsSUFBQSxPQUFBLENBQVEsQ0FBUixFQUFVLENBQUMsQ0FBWCxDQUFhLENBQUMsUUFBZCxDQUFBLENBQW5COztBQUNBLE1BQUEsQ0FBTyxLQUFQLEVBQWtCLElBQUEsT0FBQSxDQUFRLENBQVIsRUFBVSxDQUFDLENBQVgsQ0FBYSxDQUFDLFFBQWQsQ0FBQSxDQUFsQjs7QUFDQSxNQUFBLENBQU8sR0FBUCxFQUFnQixJQUFBLE9BQUEsQ0FBUSxDQUFSLEVBQVUsQ0FBVixDQUFZLENBQUMsUUFBYixDQUFBLENBQWhCOztBQUNBLE1BQUEsQ0FBTyxLQUFQLEVBQWtCLElBQUEsT0FBQSxDQUFRLENBQVIsRUFBVSxDQUFWLENBQVksQ0FBQyxRQUFiLENBQUEsQ0FBbEI7O0FBQ0EsTUFBQSxDQUFPLE1BQVAsRUFBbUIsSUFBQSxPQUFBLENBQVEsQ0FBUixFQUFVLENBQVYsQ0FBWSxDQUFDLFFBQWIsQ0FBQSxDQUFuQiIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIENvbXBsZXhcblx0Y29uc3RydWN0b3IgOiAoQHgsQHkpIC0+XG5cdGFkZCA6IChvdGhlcikgLT5cblx0XHRuZXcgQ29tcGxleCBAeCtvdGhlci54LCBAeStvdGhlci55XG5cdG11bCA6IChvdGhlcikgLT5cblx0XHRhID0gQHhcblx0XHRiID0gQHlcblx0XHRjID0gb3RoZXIueFxuXHRcdGQgPSBvdGhlci55XG5cdFx0bmV3IENvbXBsZXggYSpjLWIqZCwgYipjK2EqZFxuXHRtaXIgOiAtPlxuXHRcdG5ldyBDb21wbGV4IEB5LCBAeFxuXHR0b1N0cmluZyA6IC0+XG5cdFx0c3ggPSBcIlwiIGlmIEB4ID09IDBcblx0XHRzeCA9IFwiI3tAeH1cIiBpZiBAeCA+IDBcblx0XHRzeCA9IFwiI3tAeH1cIiBpZiBAeCA8IDBcblxuXHRcdHN5ID0gXCJcIiBpZiBAeSA9PSAwXG5cdFx0c3kgPSBcIi1pXCIgaWYgQHkgPT0gLTFcblx0XHRzeSA9IFwiaVwiIGlmIEB5ID09IDFcblx0XHRzeSA9IFwiI3tAeX1pXCIgaWYgQHkgPiAxXG5cdFx0c3kgPSBcIiN7QHl9aVwiIGlmIEB5IDwgLTFcblxuXHRcdGlmIHN4IT1cIlwiIGFuZCBzeSE9XCJcIlxuXHRcdFx0aWYgQHkgPCAwXG5cdFx0XHRcdHMgPSBzeCtzeVxuXHRcdFx0ZWxzZSBpZiBAeT09MFxuXHRcdFx0XHRzID0gc3hcblx0XHRcdGVsc2Vcblx0XHRcdFx0cyA9IHN4ICsgXCIrXCIgKyBzeVxuXHRcdGVsc2UgaWYgQHg9PTAgYW5kIEB5PT0wXG5cdFx0XHRzID0gXCIwXCJcblx0XHRlbHNlIFxuXHRcdFx0cyA9IHN4ICsgc3lcblx0XHRzXG5hc3NlcnQgXCItMVwiLCBuZXcgQ29tcGxleCgtMSwwKS50b1N0cmluZygpXG5hc3NlcnQgXCItMS1pXCIsIG5ldyBDb21wbGV4KC0xLC0xKS50b1N0cmluZygpXG5hc3NlcnQgXCItaVwiLCBuZXcgQ29tcGxleCgwLC0xKS50b1N0cmluZygpXG5hc3NlcnQgXCIwXCIsIG5ldyBDb21wbGV4KDAsMCkudG9TdHJpbmcoKVxuYXNzZXJ0IFwiaVwiLCBuZXcgQ29tcGxleCgwLDEpLnRvU3RyaW5nKClcbmFzc2VydCBcIjEtMmlcIiwgbmV3IENvbXBsZXgoMSwtMikudG9TdHJpbmcoKVxuYXNzZXJ0IFwiMS1pXCIsIG5ldyBDb21wbGV4KDEsLTEpLnRvU3RyaW5nKClcbmFzc2VydCBcIjFcIiwgbmV3IENvbXBsZXgoMSwwKS50b1N0cmluZygpXG5hc3NlcnQgXCIxK2lcIiwgbmV3IENvbXBsZXgoMSwxKS50b1N0cmluZygpXG5hc3NlcnQgXCIxKzJpXCIsIG5ldyBDb21wbGV4KDEsMikudG9TdHJpbmcoKVxuXG4iXX0=
//# sourceURL=C:\github\p5Complex\www\Complex.coffee