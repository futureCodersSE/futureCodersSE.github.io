window.onload = function(){
	scrollToTop();
}
window.onreset = function(){
	scrollToTop();
}

var get_request = new XMLHttpRequest();
get_request.onreadystatechange = function() {
  if (this.readyState === 4 && this.status === 200) {
	var modalHeader = document.getElementById('howToHeader');
	var modalDiv = document.getElementById('howToContent');
	modalHeader.innerHTML = "";
	modalDiv.innerHTML = "";
	//set HTML for title and content
	var response = JSON.parse(this.responseText);
	modalHeader.innerHTML = response.title;
	var htmlResponses = response.html;
	for(var i=0; i<htmlResponses.length; i++){
		console.log(htmlResponses[i].element);
		modalDiv.innerHTML = modalDiv.innerHTML + htmlResponses[i].element;
	}
  }
  else{
	  console.log("File error");
  }
}

var toggleDropDown = function(){
	var menuItems = document.getElementsByClassName("dropDown-content");
	for (i = 0; i < menuItems.length; i++) {
		if((menuItems[i]).style.display == 'block'){
			(menuItems[i]).style.display = 'none';
		}
		else{
			(menuItems[i]).style.display = 'block';
		}
	}
}

var openPage = function(url){
	closeDropDown();
	scrollToTop();
	if(url.length > 0){
		window.open(url,'_self');			
	}
	else{
		console.log("Error occurred on opening new page");
	}
}

var openInNewTab = function(url){
	if(url.length > 0){
		window.open(url,'_blank');			
	}
	else{
		console.log("Error occurred on opening new page");
	}	
}

function openModal(modalId, jsonFile){
	//get json file with HTML for how to
	var modal = document.getElementById(modalId);
	modal.style.display = 'block';
	var filePath = "json/" + jsonFile + ".json";
	console.log(filePath);
	var url = filePath;
	get_request.open("GET", url, true);
	get_request.send();	
	return false;
}

function closeModal(modalId){
	var modal = document.getElementById(modalId);
	modal.style.display = 'none';	
	console.log("closing modal");
	return false;
}

function closeDropDown(){
	var menuItems = document.getElementsByClassName("dropDown-content");
	for (i = 0; i < menuItems.length; i++) {
		(menuItems[i]).style.display = 'none';
	}	
}

function scrollToTop(){
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera	
}

function scrollToAnchor(anchorId){
	var thisAnchor = document.getElementById(anchorId);
	var scrollTo = parseInt(thisAnchor.getBoundingClientRect().top);
	document.body.scrollTop += scrollTo; // For Safari
	document.documentElement.scrollTop += scrollTo; // For Chrome, Firefox, IE and Opera	
}

/*
var app = angular.module("fc-App", ["ngSanitize"]);

//controller for landing page ==========================================================================================
app.controller("landingCtrl", function($scope, $interval, $timeout) {
	//global variables and set up
	var panelSelector = new PanelSelector();
	var eventBoard = new EventsBoardGenerator();
	var faqs = new FAQGenerator();
	var currPage = "intro";
	var contentTop = angular.element('#fcHeader').innerHeight();

	//initialisation of $scope variables
	var initialise = function(){
		$scope.currentPanel = panelSelector.getCurrPanelItem();
		$scope.eventsBoard = eventBoard.getEvents();
		$scope.faqList = faqs.getFAQs();
		angular.element('#profileMarquee').css('visibility','hidden');
		//angular.element('#updateModal').css('display', 'block');
	}	
	initialise();
	
	function closeDropDown(){
		var menuItems = document.getElementsByClassName("dropDown-content");
		for (i = 0; i < menuItems.length; i++) {
			angular.element(menuItems[i]).css('display','none');
		}
    }
	
	function scrollToTop(){
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	}
	
	$scope.toggleDropDown = function(){
		var menuItems = document.getElementsByClassName("dropDown-content");
		for (i = 0; i < menuItems.length; i++) {
			if(angular.element(menuItems[i]).css('display') == 'block'){
				angular.element(menuItems[i]).css('display','none')
			}
			else{
				angular.element(menuItems[i]).css('display','block');
			}
		}
    }
	
	$scope.sendEmail = function(){
		angular.element('#mailModal').css('display', 'block');
	}
	
	$scope.openModal = function(modalId, leafletName){
		var idModal = '#' + modalId;
		$scope.leaflet = "images/flyers/" + leafletName + ".pdf";
		console.log($scope.leaflet);
		angular.element(idModal).css('display', 'block');
	}	
	
	$scope.closeModal = function(modalId){
		var idModal = '#' + modalId;
		angular.element(idModal).css('display', 'none');
	}
	
	$scope.closeInsertPanel = function(){
		currPage = "intro";
		//only need to do this for about panel - could remove
		angular.element('#profileMarquee').css('visibility','hidden');
	}
	
	// 5 second rolling text messages //
	var changePanel = function(){
		angular.element('#introPanel').css('opacity','0');
		panelSelector.advancePanelItem();
		$scope.currentPanel = panelSelector.getCurrPanelItem();
		angular.element('#introPanel').css('opacity','1');
		return false;
	}
	
	//var panelChanger = $interval(changePanel, 5000);
	
	// open the selected page within the content area //
	$scope.showPage = function(pageToShow){
		closeDropDown();
		scrollToTop();
		if(pageToShow == "outreach"){
			$scope.eventsBoard = eventBoard.getEvents();
		}
		if(currPage == pageToShow){
			currPage = "intro";
		}
		else{
			currPage = pageToShow;
		}
	}
	
	$scope.showBookingPage = function(activity){
		closeDropDown();
		scrollToTop();
		if(currPage == 'book'){
			currPage = "intro";
		}
		else{
			currPage = 'book';
		}
		$scope.currentActivity = activity;
	}	
	
	//open insert panel (selected from link in navigation bar)
	$scope.showInsertPanelPage = function(insertPanelId){	
		closeDropDown();
		scrollToTop();
		if(insertPanelId == "opportunities"){
			$scope.eventsBoard = eventBoard.getEvents();
		}	
		currPage = insertPanelId;
	}
	
	// check to see if pageToShow should be the currently visible page //
	$scope.showing = function(pageToShow){
		if(pageToShow == currPage){
			return true;
		}
		else{
			return false;
		}
	}
	
	$scope.canBook = function(booking){
		if(booking=="yes"){
			console.log(booking);
			return true;
		}
		else{
			return false;
		}
	}
	
	$scope.getPayCode = function(){
		return $scope.currentActivity.paypal;
	}
	
	//open Medium blog in new tab
	$scope.showBlogPosts = function(){
		closeDropDown();
		scrollToTop();
		window.open('https://medium.com/@futureCodersSE', '_blank');
	}
	
	//show given url in new tab
	$scope.openInNewTab = function(url){
		closeDropDown();
		scrollToTop();
		if(url.length > 0){
			window.open(url,'_blank');
		}
		else{
			console.log("Error occurred on opening new tab");
		}
	}
});*/
