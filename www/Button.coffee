class Button
	constructor: (@r,@g,@b, @parent,@alpha,@x,@y,@w,@h,@key,@txt) -> # sixties
		@w0=99
		@h0=99

	draw : ->
		g.push()
		g.translate width*@x/60, height*@y/60

		@x0 = g.x
		@y0 = g.y

		@w0 = g.s*width*@w/60
		@h0 = g.s*height*@h/60

		fc 1,1,1,@alpha
		sc()
		circle 0, 0,  width*@w/120
		#rect 0,0,@w0,@h0

		fc @r,@g,@b
		textSize (@h0+@w0)/6
		text @txt,0,0 
		g.pop()

	mousePressed : () ->
		print @key
		@parent.process @key if @x0-@w0/2 <= mouseX <= @x0+@w0/2 and @y0-@h0/2 <= mouseY <= @y0+@h0/2 
	touchStarted : (x,y) -> @parent.process @key if @x0-@w0/2 <= x <= @x0+@w0/2 and @y0-@h0/2 <= y <= @y0+@h0/2 
	keyPressed : (key) -> @parent.process @key if @key == keyCode or key==" "
			