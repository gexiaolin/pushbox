$(function(){
	var cubes = [],
		points = [],
		change_points = [],
		colors = ['#a23f9c','#4ca9d8','#fbc45a','#6ec471','#f45958','#8d8ea3','#533637','#269a9a'],
		current_color = [],
		width = 90,
		c_width = document.querySelector('.main').offsetWidth,
		rows = 4,
		steps_order = [],
		back_flag = false,
		step_num = 0,
		num = Number(localStorage.getItem('_cube_lv')) || 0;
	function theColor(){
		var color_num = Math.floor( Math.random() * (colors.length - 1 ) );
		current_color.push( colors[color_num] );
		colors.splice(color_num,1);
	}
	function drawColor(){
		for( var i = 0; i < current_color.length; i ++ ){
			cubes[i].div.style.backgroundColor = current_color[i];
			points[i].div.child.style.backgroundColor = current_color[i];
		}
	}
	function empty(){
		var divs = document.querySelectorAll('.game-item');
		for( var i = 0; i < divs.length; i ++ ){
			document.querySelector('.object-init').removeChild(divs[i]);
		}
		document.querySelector('.back').className = 'back back-no';
		cubes = [];
		points = [];
		change_points = [];
		colors = ['#a23f9c','#4ca9d8','#fbc45a','#6ec471','#f45958','#8d8ea3','#533637','#269a9a'];
		current_color = [];
		back_flag = false;
		step_num = 0;
		steps_order = [];
	}
	function colMore(el,dir){
		if( dir == 0 ){
			var flag = true;
			for( var i = 0; i < cubes.length; i ++ ){
				if( el.y - 1 == cubes[i].y && el.x == cubes[i].x ){
					if( cubes[i].y == 0 ){
						flag = false;
					}else{
						for( var j = 0; j < cubes.length; j ++ ){
							if( el.y - 2 == cubes[j].y && el.x == cubes[j].x ){
								if( cubes[j].y == 0 ){
									flag = false;
								}else{
									cubes[j].y -= 1;
									cubes[j].div.style.top = cubes[j].y * width + 'px';
									changeDirTest(cubes[j]);
								}
							}
						};
						if( flag ){
							cubes[i].y -= 1;
							cubes[i].div.style.top = cubes[i].y * width + 'px';
							changeDirTest(cubes[i]);
						}
					}
				}
			}
			if( flag ){
				if( el.y == 0 ){
					return;
				}else{
					el.y -= 1;
					el.div.style.top = el.y * width + 'px';
				}
			}
		}else if( dir == 1 ){
			var flag = true;
			for( var i = 0; i < cubes.length; i ++ ){
				if( el.y + 1 == cubes[i].y && el.x == cubes[i].x ){
					if ( document.querySelector('#container').offsetHeight - parseInt(cubes[i].div.style.top) - c_width/cubes[i].rows < c_width/cubes[i].rows ) {
						flag = false;
					}else{
						for( var j = 0; j < cubes.length; j ++ ){
							if( el.y + 2 == cubes[j].y && el.x == cubes[j].x ){
								if( document.querySelector('#container').offsetHeight - parseInt(cubes[j].div.style.top) - c_width/cubes[j].rows < c_width/cubes[j].rows ){
									flag = false;
								}else{
									cubes[j].y += 1;
									cubes[j].div.style.top = cubes[j].y * width + 'px';
									changeDirTest(cubes[j]);
								}
							}
						};
						if( flag ){
							cubes[i].y += 1;
							cubes[i].div.style.top = cubes[i].y * width + 'px';
							changeDirTest(cubes[i]);
						}
					}
				}
			}
			if( flag ){
				if( document.querySelector('#container').offsetHeight - parseInt(el.div.style.top) - c_width/el.rows < c_width/el.rows ){
					return;
				}else{
					el.y += 1;
					el.div.style.top = el.y * width + 'px';
				}
			}
		}else if( dir == 2 ){
			var flag = true;
			for( var i = 0; i < cubes.length; i ++ ){
				if( el.x - 1 == cubes[i].x && el.y == cubes[i].y ){
					if( cubes[i].x == 0 ){
						flag = false;
					}else{
						for( var j = 0; j < cubes.length; j ++ ){
							if( el.x - 2 == cubes[j].x && el.y == cubes[j].y ){
								if( cubes[j].x == 0 ){
									flag = false;
								}else{
									cubes[j].x -= 1;
									cubes[j].div.style.left = cubes[j].x * width + 'px';
									changeDirTest(cubes[j]);
								}
							}
						};
						if( flag ){
							cubes[i].x -= 1;
							cubes[i].div.style.left = cubes[i].x * width + 'px';
							changeDirTest(cubes[i]);
						}
					}
				}
			}
			if( flag ){
				if( el.x == 0 ){
					return;
				}else{
					el.x -= 1;
					el.div.style.left = el.x * width + 'px';
				}
			}
		}else if( dir == 3 ){
			var flag = true;
			for( var i = 0; i < cubes.length; i ++ ){
				if( el.x + 1 == cubes[i].x && el.y == cubes[i].y ){
					if( cubes[i].x + 1 == cubes[i].rows ){
						flag = false;
					}else{
						for( var j = 0; j < cubes.length; j ++ ){
							if( el.x + 2 == cubes[j].x && el.y == cubes[j].y ){
								if( cubes[j].x + 1 == cubes[j].rows ){
									flag = false;
								}else{
									cubes[j].x += 1;
									cubes[j].div.style.left = cubes[j].x * width + 'px';
									changeDirTest(cubes[j]);
								}
							}
						};
						if( flag ){
							cubes[i].x += 1;
							cubes[i].div.style.left = cubes[i].x * width + 'px';
							changeDirTest(cubes[i]);
						}
					}
				}
			}
			if( flag ){
				if( el.x + 1 == el.rows ){
					return;
				}else{
					el.x += 1;
					el.div.style.left = el.x * width + 'px';
				}
			}
		}
	}
	function collision(el,direction){
		if( direction == 'up' ){
			colMore(el,0);
		}else if( direction == 'down' ){
			colMore(el,1);
		}else if( direction == 'left' ){
			colMore(el,2);
		}else if( direction == 'right' ){
			colMore(el,3);
		}
	}
	function changeDirTest(el){
		for( var i = 0; i < change_points.length; i ++ ){
			if( el.x == change_points[i].x && el.y == change_points[i].y ){
				el.direction = change_points[i].dir;
				arrow(el);
			}
		}
	}
	function steps(){
		var item = [];
		for( var i = 0; i < cubes.length; i ++ ){
			item.push( {color: cubes[i].color,x: cubes[i].x, y: cubes[i].y, direction: cubes[i].direction,rows: cubes[i].rows} );
		};
		steps_order.push(item);
		step_num += 1;
		if( step_num == 0 ){
			document.querySelector('.back').className = 'back back-no';
		}else{
			document.querySelector('.back').className = 'back';
		}
	}
	function success(){
		var flag = true;
		for( var i = 0; i < cubes.length; i ++ ){
			if( cubes[i].x != points[i].x || cubes[i].y != points[i].y ){
				cubes[i].div.child.style.display = 'none';
				flag = false;
			}else{
				cubes[i].div.child.style.display = 'block';
			}
		};
		if( flag ){
			setTimeout(function(){
				alert('success');
				if( num + 1 == level.length ){
					alert('通关！');
				}else{
					num += 1;
					localStorage.setItem('_cube_lv',Number(num));
				}
				empty();
				level[num].game();
			},200);
		}
	}
	function arrow(el){
		if( el.direction == 'up' ){
			el.div.innerHTML = '<i class="iconfont icon-path3"></i>'
		}else if( el.direction == 'down' ){
			el.div.innerHTML = '<i class="iconfont icon-path4"></i>'
		}else if( el.direction == 'left' ){
			el.div.innerHTML = '<i class="iconfont icon-path1"></i>'
		}else if( el.direction == 'right' ){
			el.div.innerHTML = '<i class="iconfont icon-path2"></i>'
		}
		el.div.appendChild(el.div.child);
	}
	function cube(x,y,color,direction,rows){
		var that = this;
		width = c_width / rows;
		this.color = color;
		this.rows = rows;
		this.x = x;
		this.y = y;
		this.direction = direction;
		this.div = document.createElement('div');
		this.div.className = 'game-item cube';
		this.div.style.width = width + 'px';
		this.div.style.height = width + 'px';
		this.div.style.left = this.x * width + 'px';
		this.div.style.top = this.y * width + 'px';
		this.div.style.fontSize = width * .4 + 'px';
		this.div.child = document.createElement('div');
		this.div.child.style.backgroundSize = width * .4 + 'px ' + 'auto';
		arrow(this);
		if( !back_flag ){
			theColor();
		}
		$(this.div).tap(function(){
			steps();
			collision(that,that.direction);
			success();
			changeDirTest(that);
		});
		document.querySelector('.object-init').appendChild(this.div);
		cubes.push(this);
	}
	function destination(x,y,color,rows){
		width = c_width / rows;
		this.color = color;
		this.x = x;
		this.y = y;
		this.div = document.createElement('div');
		this.div.className = 'game-item';
		this.div.style.left = this.x * width + 'px';
		this.div.style.top = this.y * width + 'px';
		this.div.style.width = width + 'px';
		this.div.style.height = width + 'px';
		this.div.child = document.createElement('div');
		this.div.child.className = 'game-el';
		this.div.child.innerHTML = '<img src="images/point_logo.png">';
		this.div.child.style.width = width - 40 + 'px';
		this.div.child.style.height = width - 40 + 'px';
		document.querySelector('.object-init').appendChild(this.div);
		this.div.appendChild(this.div.child);
		points.push(this);
	}
	function changeDir(x,y,dir,rows){
		width = c_width / rows;
		this.x = x;
		this.y = y;
		this.dir = dir;
		this.div = document.createElement('div');
		this.div.className = 'game-item point';
		this.div.style.width = width + 'px';
		this.div.style.height = width + 'px';
		this.div.style.left = this.x * width + 'px';
		this.div.style.top = this.y * width + 'px';
		if( this.dir == 'up' ){
			this.div.innerHTML = '<i class="iconfont icon-path3"></i>'
		}else if( this.dir == 'down' ){
			this.div.innerHTML = '<i class="iconfont icon-path4"></i>'
		}else if( this.dir == 'left' ){
			this.div.innerHTML = '<i class="iconfont icon-path1"></i>'
		}else if( this.dir == 'right' ){
			this.div.innerHTML = '<i class="iconfont icon-path2"></i>'
		}
		document.querySelector('.object-init').appendChild(this.div);
		change_points.push(this);
	};
	document.querySelector('.reset').onclick = function(){
		empty();
		level[num].game();
	};
	document.querySelector('.back').onclick = function(){
		back_flag = true;
		if( step_num > 0 ){
			var divs = document.querySelectorAll('.cube');
			for( var i = 0; i < divs.length; i ++ ){
				document.querySelector('.object-init').removeChild(divs[i]);
				cubes = [];
			}
			for( var i = 0; i < steps_order[step_num - 1].length; i ++ ){
				new cube(steps_order[step_num - 1][i].x,steps_order[step_num - 1][i].y,steps_order[step_num - 1][i].color,steps_order[step_num - 1][i].direction,steps_order[step_num - 1][i].rows);
			}
			for( var i = 0; i < current_color.length; i ++ ){
				cubes[i].div.style.backgroundColor = current_color[i];
			}
			steps_order.pop();
			step_num -= 1;
			if( step_num == 0 ){
				document.querySelector('.back').className = 'back back-no';
			}else{
				document.querySelector('.back').className = 'back';
			}
		}else{
			return;
		}
	};
	document.querySelector('.ad-close').onclick = function(){
		document.querySelector('.jnc-ad').style.display = 'none';
		document.querySelector('.footer-tool').style.bottom = '0';
	};
	$(document).on('touchmove',function(e){
		e.preventDefault();
	});
	var level = [
		{
			game:function(){
				new cube(1,1,1,'down',3);
				new destination(1,3,1,3);
				drawColor();
			}
		},
		{
			game:function(){
				new cube(1,3,0,'up',3);
				new cube(1,0,1,'down',3);
				new destination(1,2,0,3);
				new destination(1,1,1,3);
				drawColor();
			}
		},
		{
			game:function(){
				new cube(0,2,0,'right',4);
				new cube(1,4,1,'up',4);
				new cube(3,3,2,'left',4);
				new destination(2,2,0,4);
				new destination(1,2,1,4);
				new destination(1,3,2,4);
				drawColor();
			}
		},
		{
			game:function(){
				new cube(2,1,0,'down',4);
				new cube(3,3,1,'left',4);
				new destination(2,5,0,4);
				new destination(0,4,1,4);
				drawColor();
			}
		},
		{
			game:function(){
				new cube(1,1,0,'down',4);
				new cube(0,2,1,'right',4);
				new cube(2,2,2,'down',4);
				new destination(1,2,0,4);
				new destination(3,4,1,4);
				new destination(2,3,2,4);
				drawColor();
			}
		},
		{
			game:function(){
				new cube(1,1,0,'down',4);
				new cube(0,2,1,'right',4);
				new cube(2,2,2,'down',4);
				new destination(1,2,0,4);
				new destination(2,3,1,4);
				new destination(3,4,2,4);
				drawColor();
			}
		},
		{
			game:function(){
				new cube(3,1,0,'down',5);
				new cube(4,2,1,'left',5);
				new cube(2,3,2,'up',5);
				new destination(2,4,0,5);
				new destination(1,2,1,5);
				new destination(0,1,2,5);
				drawColor();
			}
		},
		{
			game:function(){
				new cube(0,1,0,'down',3);
				new destination(2,1,0,3);
				new changeDir(0,3,'right',3);
				new changeDir(2,3,'up',3);
				drawColor();
			}
		},
		{
			game:function(){
				new cube(0,1,0,'down',4);
				new cube(0,3,1,'right',4);
				new destination(2,1,0,4);
				new destination(3,1,1,4);
				new changeDir(2,3,'up',4);
				new changeDir(0,3,'right',4);
				drawColor();
			}
		},
		{
			game:function(){
				new cube(0,3,0,'right',4);
				new cube(2,3,1,'up',4);
				new destination(1,2,0,4);
				new destination(2,2,1,4);
				new changeDir(3,3,'left',4);
				new changeDir(2,3,'up',4);
				new changeDir(0,3,'right',4);
				drawColor();
			}
		},
		{
			game:function(){
				new cube(2,1,0,'down',5);
				new cube(4,3,1,'left',5);
				new cube(2,5,2,'up',5);
				new destination(1,3,0,5);
				new destination(3,3,1,5);
				new destination(0,3,2,5);
				new changeDir(2,3,'right',5);
				drawColor();
			}
		},
		{
			game:function(){
				new cube(0,1,0,'right',5);
				new cube(4,1,1,'left',5);
				new cube(2,5,2,'up',5);
				new destination(1,3,0,5);
				new destination(2,3,1,5);
				new destination(3,3,2,5);
				new changeDir(2,1,'down',5);
				drawColor();
			}
		},
		{
			game:function(){
				new cube(0,3,0,'right',4);
				new cube(2,4,1,'up',4);
				new destination(1,3,0,4);
				new destination(1,2,1,4);
				new changeDir(1,1,'down',4);
				new changeDir(3,2,'left',4);
				drawColor();
			}
		},
		{
			game:function(){
				new cube(1,1,0,'down',4);
				new cube(3,3,1,'left',4);
				new cube(2,5,2,'up',4);
				new destination(1,0,0,4);
				new destination(0,4,1,4);
				new destination(1,2,2,4);
				new changeDir(1,1,'down',4);
				drawColor();
			}
		},
		{
			game:function(){
				new cube(1,1,0,'down',3);
				new cube(2,2,1,'left',3);
				new cube(1,3,2,'up',3);
				new cube(0,2,3,'right',3);
				new destination(2,3,0,3);
				new destination(0,1,1,3);
				new destination(1,2,2,3);
				new destination(2,1,3,3);
				drawColor();
			}
		},
		{
			game:function(){
				new cube(0,1,0,'down',4);
				new cube(2,3,1,'up',4);
				new destination(1,2,0,4);
				new destination(1,3,1,4);
				new changeDir(0,2,'right',4);
				new changeDir(3,1,'left',4);
				new changeDir(0,1,'down',4);
				drawColor();
			}
		},
		{
			game:function(){
				new cube(0,1,0,'right',4);
				new cube(2,2,1,'left',4);
				new destination(0,2,0,4);
				new destination(3,2,1,4);
				new changeDir(0,1,'right',4);
				new changeDir(2,1,'down',4);
				new changeDir(2,2,'left',4);
				new changeDir(1,3,'up',4);
				drawColor();
			}
		},
		{
			game:function(){
				new cube(0,1,0,'down',4);
				new cube(0,2,1,'right',4);
				new cube(3,1,2,'left',4);
				new destination(1,2,0,4);
				new destination(2,2,1,4);
				new destination(3,2,2,4);
				new changeDir(0,1,'down',4);
				new changeDir(0,2,'right',4);
				new changeDir(3,1,'left',4);
				new changeDir(2,3,'up',4);
				drawColor();
			}
		},
	];
	level[num].game();
	
});