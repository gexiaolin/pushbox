$(function(){
	var cubes = [],
		level_page = 0,
		points = [],
		change_points = [],
		colors = ['#a23f9c','#4ca9d8','#fbc45a','#6ec471','#f45958','#8d8ea3','#533637','#269a9a'],
		width = 90,
		c_width = document.querySelector('.main').offsetWidth,
		rows = 4,
		steps_order = [],
		back_flag = false,
		step_num = 0,
		current_num = Number(localStorage.getItem('_high_lv')) || 0;
	function selectLevel(){
		var all_page = $('.level-page').length;
		if( level_page == 0 ){
			$('.level-left').css({display:'none'});
			$('.level-right').css({display:'block'});
		}else if( level_page == all_page - 1 ){
			$('.level-right').css({display:'none'});
			$('.level-left').css({display:'block'});
		}else{
			$('.level-left,.level-right').css({display:'block'});
		}
	};
	function empty(){
		var divs = document.querySelectorAll('.game-item');
		for( var i = 0; i < divs.length; i ++ ){
			document.querySelector('.object-init').removeChild(divs[i]);
		}
		document.querySelector('.back').className = 'back back-no';
		cubes = [];
		points = [];
		change_points = [];
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
				var level_number = Number( localStorage.getItem('_cube_lv') );
				if( level_number + 1 == level.length ){
					document.querySelector('.success-tips').innerHTML = '更多关卡敬请期待！';
					document.querySelector('.do-next').style.display = 'none';
					document.querySelector('.do-share').style.margin = '0 auto';
					document.querySelector('.success-level').style.display = 'block';
					document.querySelector('.do-share').style.float = 'none';
				}else{
					document.querySelector('.success-tips').innerHTML = '下一关继续加油哦！';
					document.querySelector('.do-share').style.margin = '0 1.667rem 0 1.42rem';
					document.querySelector('.do-share').style.float = 'left';
					document.querySelector('.do-next').style.display = 'block';
					document.querySelector('.success-level').style.display = 'block';
					level_number += 1;
					localStorage.setItem('_cube_lv',level_number);
					if( localStorage.getItem('_high_lv') && level_number < localStorage.getItem('_high_lv') ){
						
					}else{
						localStorage.setItem('_high_lv',level_number);
					}
				}
			},200);
		}
	}
	function share(){
		
	}
	function next(){
		empty();
		level[Number( localStorage.getItem('_cube_lv') )].game();
		document.querySelector('.success-level').style.display = 'none';
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
		this.div.style.backgroundColor = colors[this.color];
		this.div.style.left = this.x * width + 'px';
		this.div.style.top = this.y * width + 'px';
		this.div.style.fontSize = width * .4 + 'px';
		this.div.child = document.createElement('div');
		this.div.child.style.backgroundSize = width * .4 + 'px ' + 'auto';
		arrow(this);
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
		this.div.child.style.backgroundColor = colors[this.color];
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
	$('.reset').tap(function(){
		empty();
		level[Number( localStorage.getItem('_cube_lv') )].game();
	});
	$('.back').tap(function(){
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
		success();
	});
	$('.ad-close').tap(function(e){
		e.stopPropagation();
		document.querySelector('.jnc-ad').style.display = 'none';
		document.querySelector('.footer-tool').style.bottom = '0';
	});
	$('.jnc-close').tap(function(e){
		e.stopPropagation();
		$('.success-ad').css({display:'none'});
	});
	$('.jnc-ad,.success-ad').tap(function(){
		$('.ad-pannel').css({display:'block'});
	});
	$('.ad-pannel-close').tap(function(){
		$('.ad-pannel').css({display:'none'});
	});
	$('.do-next').tap(next);
	$(document).on('touchmove',function(e){
		e.preventDefault();
	});
	$('.level-right').tap(function(){
		level_page += 1;
		$('.all-pages').css({left: -level_page * 100 + '%'});
		selectLevel();
	});
	$('.level-left').tap(function(){
		level_page -= 1;
		$('.all-pages').css({left: -level_page * 100 + '%'});
		selectLevel();
	});
	$('.level-page').delegate('.unlock','tap',function(){
		var num = Number( $(this).children('.level-top').text() ) - 1;
		localStorage.setItem('_cube_lv',num);
		$('.level-selector').css({display:'none'});
		empty();
		level[num].game();
	});
	$('.level').tap(function(){
		var all_level = Number( localStorage.getItem('_high_lv') ) + 1;
		for( var i = 0; i < all_level; i ++ ){
			$('.level-page li').eq(i).addClass('unlock');
		};
		$('.level-selector').css({display:'block'});
	});
	$('.level-close').tap(function(){
		$('.level-selector').css({display:'none'});
	});
	var level = [
		{
			game:function(){
				new cube(1,1,4,'down',3);
				new destination(1,3,4,3);
			}
		},
		{
			game:function(){
				new cube(1,3,4,'up',3);
				new cube(1,0,1,'down',3);
				new destination(1,2,4,3);
				new destination(1,1,1,3);
			}
		},
		{
			game:function(){
				new cube(0,2,6,'right',4);
				new cube(1,4,1,'up',4);
				new cube(3,3,3,'left',4);
				new destination(2,2,6,4);
				new destination(1,2,1,4);
				new destination(1,3,3,4);
			}
		},
		{
			game:function(){
				new cube(2,0,0,'down',4);
				new cube(3,2,1,'left',4);
				new destination(2,4,0,4);
				new destination(0,3,1,4);
			}
		},
		{
			game:function(){
				new cube(1,1,4,'down',4);
				new cube(0,2,1,'right',4);
				new cube(2,2,3,'down',4);
				new destination(1,2,4,4);
				new destination(3,4,1,4);
				new destination(2,3,3,4);
			}
		},
		{
			game:function(){
				new cube(1,1,2,'down',4);
				new cube(0,2,5,'right',4);
				new cube(2,2,6,'down',4);
				new destination(1,2,2,4);
				new destination(2,3,5,4);
				new destination(3,4,6,4);
			}
		},
		{
			game:function(){
				new cube(3,1,3,'down',5);
				new cube(4,2,5,'left',5);
				new cube(2,3,1,'up',5);
				new destination(2,4,3,5);
				new destination(1,2,5,5);
				new destination(0,1,1,5);
			}
		},
		{
			game:function(){
				new cube(0,1,3,'down',3);
				new destination(2,1,3,3);
				new changeDir(0,3,'right',3);
				new changeDir(2,3,'up',3);
			}
		},
		{
			game:function(){
				new cube(0,1,3,'down',4);
				new cube(0,3,4,'right',4);
				new destination(2,1,3,4);
				new destination(3,1,4,4);
				new changeDir(2,3,'up',4);
				new changeDir(0,3,'right',4);
			}
		},
		{
			game:function(){
				new cube(0,3,2,'right',4);
				new cube(2,3,0,'up',4);
				new destination(1,2,2,4);
				new destination(2,2,0,4);
				new changeDir(3,3,'left',4);
				new changeDir(2,3,'up',4);
				new changeDir(0,3,'right',4);
			}
		},
		{
			game:function(){
				new cube(2,1,3,'down',5);
				new cube(4,3,1,'left',5);
				new cube(2,5,2,'up',5);
				new destination(1,3,3,5);
				new destination(3,3,1,5);
				new destination(0,3,2,5);
				new changeDir(2,3,'right',5);
			}
		},
		{
			game:function(){
				new cube(0,1,6,'right',5);
				new cube(4,1,4,'left',5);
				new cube(2,5,1,'up',5);
				new destination(1,3,6,5);
				new destination(2,3,4,5);
				new destination(3,3,1,5);
				new changeDir(2,1,'down',5);
			}
		},
		{
			game:function(){
				new cube(0,3,1,'right',4);
				new cube(2,4,3,'up',4);
				new destination(1,3,1,4);
				new destination(1,2,3,4);
				new changeDir(1,1,'down',4);
				new changeDir(3,2,'left',4);
			}
		},
		{
			game:function(){
				new cube(1,1,3,'down',4);
				new cube(3,3,0,'left',4);
				new cube(2,5,2,'up',4);
				new destination(1,0,3,4);
				new destination(0,4,0,4);
				new destination(1,2,2,4);
				new changeDir(1,1,'down',4);
			}
		},
		{
			game:function(){
				new cube(1,1,5,'down',3);
				new cube(2,2,4,'left',3);
				new cube(1,3,1,'up',3);
				new cube(0,2,3,'right',3);
				new destination(2,3,5,3);
				new destination(0,1,4,3);
				new destination(1,2,1,3);
				new destination(2,1,3,3);
			}
		},
		{
			game:function(){
				new cube(0,1,5,'down',4);
				new cube(2,3,2,'up',4);
				new destination(1,2,5,4);
				new destination(1,3,2,4);
				new changeDir(0,2,'right',4);
				new changeDir(3,1,'left',4);
				new changeDir(0,1,'down',4);
			}
		},
		{
			game:function(){
				new cube(0,1,2,'right',4);
				new cube(2,2,4,'left',4);
				new destination(0,2,2,4);
				new destination(3,2,4,4);
				new changeDir(0,1,'right',4);
				new changeDir(2,1,'down',4);
				new changeDir(2,2,'left',4);
				new changeDir(1,3,'up',4);
			}
		},
		{
			game:function(){
				new cube(0,1,1,'down',4);
				new cube(0,2,2,'right',4);
				new cube(3,1,3,'left',4);
				new destination(1,2,1,4);
				new destination(2,2,2,4);
				new destination(3,2,3,4);
				new changeDir(0,1,'down',4);
				new changeDir(0,2,'right',4);
				new changeDir(3,1,'left',4);
				new changeDir(2,3,'up',4);
			}
		},
		{
			game:function(){
				new cube(0,3,1,'down',5);
				new cube(1,4,2,'down',5);
				new cube(2,5,0,'up',5);
				new destination(2,0,1,5);
				new destination(2,2,2,5);
				new destination(2,4,0,5);
				new changeDir(0,6,'right',5);
				new changeDir(1,5,'right',5);
				new changeDir(3,4,'left',5);
				new changeDir(3,6,'up',5);
				new changeDir(0,3,'down',5);
				new changeDir(1,4,'down',5);
				new changeDir(2,5,'up',5);
			}
		},
		{
			game:function(){
				new cube(1,1,6,'down',5);
				new cube(1,3,4,'right',5);
				new cube(3,3,3,'up',5);
				new cube(3,1,1,'left',5);
				new destination(1,2,6,5);
				new destination(2,1,4,5);
				new destination(3,2,3,5);
				new destination(2,3,1,5);
				new changeDir(1,1,'down',5);
				new changeDir(1,3,'right',5);
				new changeDir(3,3,'up',5);
				new changeDir(3,1,'left',5);
				new changeDir(1,5,'up',5);
			}
		},
	];
	level[current_num].game();
});