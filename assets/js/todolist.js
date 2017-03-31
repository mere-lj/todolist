$(function(){ //on document.ready

	var iconDelete = '<span class="delete button"><i class="fa fa-trash-o" aria-hidden="true"></i></span>';
	var iconEdit = '<span class="edit button"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span>';

	function rotateLogo() {
		$('#logo1').fadeIn().css('transform', 'rotate(90deg)');
		setTimeout(function(){
			$('#logo2').css('transform', 'rotate(90deg)');
		}, 100)
	}

	function startUp () {
		slide($('#todocontainer ul li:first'));
		changeLogo();
	}

	function changeLogo(time) {
		setTimeout(function(){
			$('#logo1, #logo2').fadeOut(function(){
				$(this).css({
					border: 'none',
					margin: '0 0.5px',
					transform: 'none',
					transition: 'none',
				}, 300).text('D').fadeIn(700)
			})
		}, time||1000)
	}

	function slide (elem){
		elem.slideDown(500, function(){
			var next = $(this).next('li');
			if (next) {
				slide(next);
			}
		});
	}

	function addToDo(todoText) {
		if (todoText){
			$('#todocontainer ul').append('<li>' + iconDelete + iconEdit + '<span class="to-do">' + todoText + '</span></li>');
			$('#todocontainer ul li:last').slideDown(500);
		}
	}

	function editToDo(that) {
		that.closest('li').next().children('.to-do').children('input').focus();

		if(that.val()){
			var toDo = that.parent();
			toDo.html(that.val());
			toDo.siblings().show();
		} else {
			that.val(that.attr('placeholder'));
			editToDo(that)
		};
	}


	


	rotateLogo();
	startUp();

//cross out todo event listener

	$('#todocontainer ul').on('click', '.to-do', function(){ //listener to ul, but only listens for li in ul
		if(!$(this).children().length){
			$(this).toggleClass('crossout');
		}
	})

//delete todo event listener

	$('#todocontainer ul').on('click', '.delete', function(){
		$(this).parent().slideUp(300, function() {
			$(this).remove();
		});
		// e.stopPropagation(); // add not to cross out removed elements 
	})

//edit todo event listener

	$('#todocontainer ul').on('click', '.edit', function(){
		var underInput = $(this).next();
		var toDoValue = underInput.text()
		var newWidth = parseInt($(this).closest('div').css('width'))-20+'px';
		$(this).hide().prev().hide();
		underInput.html('<input type="text" class="todoInput" tabindex="0" placeholder="' + toDoValue + '" value="' + toDoValue + '">');
		underInput.children().css({
				backgroundColor: 'rgba(0, 0, 0, 0)',
				width: newWidth,
				paddingLeft: '10px'
			}).focus();
	})


//create new todo on Enter event listener

	$('#todocontainer').on('keypress', '.todoInput', function(e) {
		if (e.which===13){
			var that = $(this)
			if(that.attr('id')==='newtodo'){
				addToDo(that.val());
				that.val('');
			} else {
				editToDo(that)
			}
		};
	});


//show/hide input event listener

	$('.add-remove').click(function(){
		$('#newtodo').slideToggle('fast');
		setTimeout(function() {
			$('.add-remove').toggleClass('fa-minus').toggleClass('fa-plus');
		}, 100);
	})

})