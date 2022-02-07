$(document).ready(function(){
	var signInTokens;
	var signIn = new OktaSignIn(
	  {
	    baseUrl: 'https://dev-84547000.okta.com',
		clientId: '0oa3sfgsmhCQQ0zOa5d7',
		redirectUri: 'http://localhost:8080/TonyTest/login/callback'
	  }
	);
	
	signIn.showSignInToGetTokens({
		el: '#widget-container'})
	.then(function(tokens) {
	  // Store tokens
		debugger
		signInTokens = tokens;
		signIn.hide();
		$.ajax({
			  url: tokens.accessToken.userinfoUrl,
			  method: 'GET',
			  beforeSend: function(xhr){
				 xhr.setRequestHeader ("Authorization", "Bearer " + tokens.accessToken.accessToken);
			  },
			  success: function(data){
				user = signIn.getUser();
				var data = {'user' : {'id':user.id, 'profile' : user.profile}};
				showUserFields(data);
			  },
				error : function(data){
					//alert('ajax failed');
					var mockData = {'user' : {'id':'00u3sh9i0tLI5HAUn5d7', 'profile' : {'firstName':'Tony'}}};
					showUserFields(mockData);
				}
			});
	}).catch(function(error) {
	  // Handle error
	});
	
	function showUserFields(data){
		$("#title").hide();
		$("#loggedinTitle span").html(data.user.profile.firstName + "'s");
		$("#loggedinTitle, #todo_wrapper, #buttons").show();
		
		$.ajax({
			url: "/TonyTest/GetToDos",
			method: "POST",
			data: {"user" : data.user.id},
			success: function(data){
				debugger
				if (data.toDos){
					data.toDos.forEach(function(item){
						appendItem(item);
					});
				}
			},
			fail:function(){
				alert('GetToDos ajax fail');
			}
		})	
	}
	
	function appendItem(task){
		var html = "<div class='item'><input type='checkbox'><div class='todo'>" + task + "</div></div>";
		$("#todo_wrapper").append(html);
	}
	
	$("#todo_wrapper").on('change', 'input:checkbox', function(e){	//use 'on' to capture any items added after initial page load
		if ($(this).prop('checked')){
			$(this).next("div.todo").css('text-decoration','line-through');
		}else{
			$(this).next("div.todo").css('text-decoration','none');
		}
	});
	
	$("#addNew").click(function(){
		$("button.standard").hide();
		$("button.adding").show();
		var html = "<div class='item'><input type='checkbox'><div class='todo'><input></input></div></div>";
		$("#todo_wrapper").append(html);
	});
	
	$("#cancel").click(function(){
		$("button.standard").show();
		$("button.adding").hide();
		$("#todo_wrapper .item:last-of-type").remove();		
	});
	
	$("#submit").click(function(){
		var dataObj = {"todo": $("#todo_wrapper .item:last-of-type input:not(:checkbox)").val()};
		$.ajax({
			url: "/TonyTest/AddServlet",
			method: 'POST',
			data: dataObj,
			success: function(data){
				$("#cancel").click();		//to reset buttons and remove text input
				if (data.newToDo) appendItem(data.newToDo);
			},
			fail : function(data){
				alert('AddServlet call failed');
			}
		})
		
	});
	
	$("#logout").click(function(){
		window.location.assign('https://dev-84547000.okta.com/oauth2/default/v1/logout?post_logout_redirect_uri=http://localhost:8080/TonyTest/&id_token_hint=' + signInTokens.idToken.idToken);
	});
	  
	/*signIn.renderEl({
		el: '#widget-container'
	  }, function success(res) {
		if (res.status === 'SUCCESS') {
		  	console.log('Do something with this sessionToken', res.session.token);
			$("#widget-container").hide();  
		
			//res.session.setCookieAndRedirect();		//need java SDK to handle callback? using ajax as workaround
			$.ajax({
			  url: "/TonyTest/login/callback",
			  method: 'POST',
			  data: res,
			  success: function(data){
				console.log('ajax success');
				}
			});
		} else {
		// The user can be in another authentication state that requires further action.
		// For more information about these states, see:
		//   https://github.com/okta/okta-signin-widget#rendereloptions-success-error
		}
	  });
*/

});


