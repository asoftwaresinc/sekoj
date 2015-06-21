var NewsApp = angular.module('NewsApp', ['angular-loading-bar','ngRoute','ngTouch','mobile-angular-ui','mobile-angular-ui.drag']);

NewsApp.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {cfpLoadingBarProvider
.includeSpinner = false;
}])
NewsApp.config(function($routeProvider) {$routeProvider
.when('/', {templateUrl : 'view/Home.html?view=', controller: 'HomeController'})
.when('/Home', {templateUrl : 'view/Home.html?view=', controller: 'HomeController'})
.when('/Home/:City', {templateUrl : 'view/Home.html?view=', controller: 'HomeCityController'})
.when('/Cities', {templateUrl : 'view/CityList.html?view='})

.when('/News', {templateUrl : 'view/News.html?view=', controller: 'NewsListController'})
.when('/News/:Category', {templateUrl : 'view/News.html?view=', controller: 'NewsListController'})
.when('/News/Detail/:q', {templateUrl : 'view/NewsDetail.html?view='})
.when('/Publish/News', {templateUrl : 'view/PublishNews.html?view='})

.when('/GovtJobs', {templateUrl : 'view/GovtJobs.html?view='})
.when('/GovtJobs/Detail/:q', {templateUrl : 'view/GovtJob.html?view='})
.when('/Publish/GovtJob', {templateUrl : 'view/PublishGovtJob.html?view='})

.when('/Classified', {templateUrl : 'view/Classifieds.html?view='})
.when('/Classified/Detail/:q', {templateUrl : 'view/Classified.html?view='})
.when('/Publish/Classified', {templateUrl : 'view/PublishClassified.html?view='})

.when('/Settings/MyProfile', {templateUrl : 'view/MyProfile.html?view='})

.when('/Jobs', {templateUrl : 'view/Jobs.html?view='})
.when('/Jobs/Detail/:q', {templateUrl : 'view/Job.html?view='})
.when('/Publish/Job/New', {templateUrl : 'view/PublishJobNew.html?view='})
.when('/Publish/Job/Dashbord', {templateUrl : 'view/PublishJobDashbord.html?view='})

.when('/Jokes', {templateUrl : 'view/Jokes.html?view='})
.when('/Jokes/Detail/:q', {templateUrl : 'view/Joke.html?view='})

.when('/Quotes', {templateUrl : 'view/Quotes.html?view='})
.when('/Quotes/Detail/:q', {templateUrl : 'view/Quote.html?view='})

.when('/About', {templateUrl : 'view/About.html?view='})

.when('/Weather', {templateUrl : 'view/Weather.html?view='})
.when('/Cricket', {templateUrl : 'view/Cricket.html?view='})
.when('/Cricket/:Cricketid', {templateUrl : 'view/CricketScore.html?view='})
.when('/Login/Login', {templateUrl : 'view/Login.html?view=', controller: 'LoginController'})
.when('/Login/Register', {templateUrl : 'view/Register.html?view=', controller: 'LoginController'})
.otherwise({ redirectTo: '/Home/Indore'})
;
;});

 



NewsApp.controller('HomeController',function($scope,$http,$routeParams) {
$scope.loading = true;
var site = "http://cdn.anemaindia.com/apps/iindia/ajax/News.php?Token="+ $scope.Token+"&City="+$scope.iCity;  
$http.get(site ,{cache: true}) .success(function(response){$scope.News = response;$scope.loading = false; });
});


NewsApp.controller('HomeCityController',function($rootScope,$scope,$http,$routeParams) {
$scope.loading = true;
var site = "http://cdn.anemaindia.com/apps/iindia/ajax/News.php?Token="+ $scope.Token+ "&City="; var page = $routeParams.City; $scope.City=site + page; 
$http.get(site + page,{cache: true}) .success(function(response) {$scope.News = response;
if(page!=''){localStorage.setItem("iCity",page);}
$rootScope.iCity = localStorage.getItem('iCity');
$scope.loading = false;

});

});




NewsApp.controller('NewsListController',function($scope,$http,$routeParams) {
$scope.loading = true;
$http.get("http://cdn.anemaindia.com/apps/iindia/ajax/News.php?Token="+ $scope.Token+ "&Category="+ $routeParams.Category ,{cache: true}) .success(function(response) {$scope.News = response; $scope.loading = false;});
});





NewsApp.controller('NewsDetailController',function($scope,$http,$routeParams) {
$scope.loading = true;
var site = "http://cdn.anemaindia.com/apps/iindia/ajax/News.php?Token="+ $scope.Token+ "&Id="; var page = $routeParams.q; $scope.q=site + page; 
$http.get(site + page ,{cache: true}) .success(function(response) {$scope.News = response; $scope.loading = false;});

var site = "http://cdn.anemaindia.com/apps/iindia/ajax/Comments.php?Token="+ $scope.Token+ "&NewsId="; var page = $routeParams.q; $scope.q=site + page; 
$http.get(site + page ,{cache: true}) .success(function(response) {$scope.Comments = response; $scope.loading = false;});

/*Add Comment*/
$scope.AddNewComment = function(){
var AddCommentUrl = "http://cdn.anemaindia.com/apps/iindia/ajax/AddComment.php?Token="+ $scope.Token+ "&NewsId="; var page = $routeParams.q; 
$scope.q=AddCommentUrl + page; 
$http({ method:'POST',headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}, url:$scope.q, data: $scope.AddComment})
.success(function(response){$scope.response=response; $scope.loading = false;})
.error(function(response){$scope.error=response; $scope.loading = false;})
$scope.Comments="";
var site = "http://cdn.anemaindia.com/apps/iindia/ajax/Comments.php?Token="+ $scope.Token+ "&NewsId="; var page = $routeParams.q; $scope.q=site + page; 
$http.get(site + page) .success(function(response) {$scope.Comments = response; $scope.loading = false;
$scope.AddComment.Comment='';}
);};
});

NewsApp.controller('PublishNewsController',function($scope,$http,$routeParams) {

$scope.PublishNewsSubmit = function(){
var PublishNewsUrl = "http://cdn.anemaindia.com/apps/iindia/ajax/PublishNews.php?Token="+ $scope.Token+ "&"; var page = $routeParams.q; 
$scope.q=PublishNewsUrl + page; 
$http({method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}, url:$scope.q, data: $scope.PublishNews})
.success(function(response){$scope.PublishNews='';})
.error(function(response){$scope.error=response; $scope.PublishNews='';})
//$scope.PublishNews='';
};
});










NewsApp.controller('JobsListController',function($scope,$http,$routeParams) {
$scope.loading = true;
var site = "http://cdn.anemaindia.com/apps/iindia/ajax/Jobs.php?Token="+ $scope.Token+"&"; var page = $routeParams.q; $scope.q=site + page; 
$http.get(site + page ,{cache: true}) .success(function(response) {$scope.Jobs = response; $scope.loading = false;});
});

NewsApp.controller('JobsDetailController',function($scope,$http,$routeParams) {
$scope.loading = true;
var site = "http://cdn.anemaindia.com/apps/iindia/ajax/Job.php?Token="+ $scope.Token+"&Id="; var page = $routeParams.q; $scope.q=site + page; 
$http.get(site + page ,{cache: true}) .success(function(response) {$scope.Job = response; $scope.loading = false;});

/*Apply for job*/
$scope.ApplyForJobSubmit = function(){
var ApplyForJobUrl = "http://cdn.anemaindia.com/apps/iindia/ajax/ApplyForJob.php?Token="+ $scope.Token+"&Id="; var page = $routeParams.q; 
$scope.q=ApplyForJobUrl + page; 
$http({ method:'get', url:$scope.q, data: $scope.ApplyForJob})
.success(function(response){$scope.Response=response; $scope.jobapplyresponse=Response; })
.error(function(response){$scope.error=response;})
};
});

NewsApp.controller('PublishJobNewCtrl',function($scope,$http,$routeParams) {


$scope.PublishJobNewSubmit = function(){
var PublishJobNewUrl = "http://cdn.anemaindia.com/apps/iindia/ajax/PublishJobNew.php?Token="+ $scope.Token;
$scope.q=PublishJobNewUrl;
$http({ method:'POST',headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}, url:$scope.q, data: $scope.PublishJobNewForm})
.success(function(response){
$scope.PublishJobNewResponse=response;
$scope.PublishJobNewForm='';
})
.error(function(response){$scope.error=response;})
};
});









NewsApp.controller('GovtJobsListController',function($scope,$http,$routeParams) {
$scope.loading = true;
var site = "http://cdn.anemaindia.com/apps/iindia/ajax/GovtJobs.php?Token="+ $scope.Token+ "&"; var page = $routeParams.q; $scope.q=site + page; 
$http.get(site + page ,{cache: true}) .success(function(response) {$scope.GovtJobs = response; $scope.loading = false;});
});
NewsApp.controller('GovtJobsDetailController',function($scope,$http,$routeParams) {
$scope.loading = true;
var site = "http://cdn.anemaindia.com/apps/iindia/ajax/GovtJob.php?Token="+ $scope.Token+ "&Id="; var page = $routeParams.q; $scope.q=site + page; 
$http.get(site + page ,{cache: true}) .success(function(response) {$scope.GovtJob = response; $scope.loading = false;});
});
NewsApp.controller('PublishGovtJobController',function($scope,$http,$routeParams) {
$scope.PublishGovtJobSubmit = function(){
var PublishGovtJobUrl = "http://cdn.anemaindia.com/apps/iindia/ajax/PublishGovtJob.php?Token="+ $scope.Token+ "&"; var page = $routeParams.q; 
$scope.q=PublishGovtJobUrl + page; 
$http({ method:'POST',headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}, url:$scope.q, data: $scope.PublishGovtJob})
.success(function(response){$scope.response=response; $scope.PublishGovtJob='';})
.error(function(response){$scope.error=response;})
};
});










NewsApp.controller('ClassifiedListController',function($scope,$http,$routeParams) {
$scope.loading = true;
var site = "http://cdn.anemaindia.com/apps/iindia/ajax/Classifieds.php?Token="+ $scope.Token+ "&"; var page = $routeParams.q; $scope.q=site + page; 
$http.get(site + page, { cache: true }) .success(function(response) {$scope.Classified = response; $scope.loading = false;});
});
NewsApp.controller('ClassifiedDetailController',function($scope,$http,$routeParams) {
$scope.loading = true;
var site = "http://cdn.anemaindia.com/apps/iindia/ajax/Classified.php?Token="+ $scope.Token+ "&Id="; var page = $routeParams.q; $scope.q=site + page; 
$http.get(site + page ,{cache: true}) .success(function(response) {$scope.Classified = response; $scope.loading = false;});
});
NewsApp.controller('PublishClassifiedController',function($scope,$http,$routeParams) {
$scope.PublishClassifiedSubmit = function(){
var PublishClassifiedUrl = "http://cdn.anemaindia.com/apps/iindia/ajax/PublishClassified.php?Token="+ $scope.Token+ "&"; var page = $routeParams.q; 
$scope.q=PublishClassifiedUrl + page; 
$http({ method:'POST',headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}, url:$scope.q, data: $scope.PublishClassified})
.success(function(response){$scope.response=response; $scope.PublishClassified='';})
.error(function(response){$scope.error=response; $scope.PublishClassified='';})
};
});






NewsApp.controller('MyProfileController',function($scope,$http,$routeParams) {
$scope.loading = true;

$scope.MyProfile ='';
var site = "http://cdn.anemaindia.com/apps/iindia/ajax/MyProfile.php?Token="+ $scope.Token+ "&"; var page = $routeParams.q; $scope.q=site + page; 
$http.get(site + page) .success(function(response) {$scope.MyProfile = response; $scope.loading = false;});
$scope.UpdateMyProfile = function(){$http({ method:'POST',headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}, url:'http://cdn.anemaindia.com/apps/iindia/ajax/MyProfileUpdate.php?Token='+ $scope.Token, data: $scope.MyProfile})
.success(function(response){$scope.response=response; $scope.loading = false;})
.error(function(response){$scope.error=response; $scope.loading = false;})};
});




NewsApp.controller('CricketCtrl', function($scope,$http,$routeParams) {
$scope.loading = true;
$http.get("http://wegivejob.com/anemasoftwares.com/api/cricket.php?Token="+ $scope.Token+ "&") .success(function(response) {$scope.Cricket = response;$scope.loading = false;});
});

NewsApp.controller('CricketScoreCtrl', function($scope,$http,$routeParams) {
$scope.loading = true;
//$scope.Cricket ='';
var site = "http://wegivejob.com/anemasoftwares.com/api/cricket.php?Token="+ $scope.Token+ "&Id="; var page = $routeParams.Cricketid;  
$http.get(site + page) .success(function(response) {$scope.CricketScore = response; $scope.loading = false;});

setInterval(function () { $http.get(site + page) .success(function(response) {$scope.CricketScore = response;});},5000);

});


NewsApp.controller('WeatherCtrl', function($scope,$http,$routeParams) {
$scope.loading = true;
$http.get("http://wegivejob.com/anemasoftwares.com/api/weather.php?Token="+ $scope.Token+ "&City="+$scope.iCity) .success(function(response) {$scope.Weather = response;
$scope.Weather.query.results.channel.item.condition.temp=$scope.Weather.query.results.channel.item.condition.temp-32; 
$scope.Weather.query.results.channel.item.condition.temp=$scope.Weather.query.results.channel.item.condition.temp*.55555;

$scope.loading = false;});
});









NewsApp.controller('JokesListController',function($scope,$http,$routeParams) {
$scope.loading = true;
var site = "http://cdn.anemaindia.com/apps/iindia/ajax/Jokes.php?Token="+ $scope.Token+"&"; var page = $routeParams.q; $scope.q=site + page; 
$http.get(site + page ,{cache: true}) .success(function(response) {$scope.Jokes = response; $scope.loading = false;});
});

NewsApp.controller('JokeDetailController',function($scope,$http,$routeParams) {
$scope.loading = true;
var site = "http://cdn.anemaindia.com/apps/iindia/ajax/Joke.php?Token="+ $scope.Token+"&Id="; var page = $routeParams.q; $scope.q=site + page; 
$http.get(site + page ,{cache: true}) .success(function(response) {$scope.Joke = response; $scope.loading = false;});
});


NewsApp.controller('PublishJokeNewCtrl',function($scope,$http,$routeParams) {
$scope.PublishJokeNewSubmit = function(){
var PublishJokeNewUrl = "http://cdn.anemaindia.com/apps/iindia/ajax/PublishJokeNew.php?Token="+ $scope.Token;
$scope.q=PublishJokeNewUrl;
$http({ method:'POST',headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}, url:$scope.q, data: $scope.PublishJokeNewForm})
.success(function(response){
$scope.PublishJokeNewResponse=response;
$scope.PublishJokeNewForm='';
})
.error(function(response){$scope.error=response;})
};
});









NewsApp.controller('QuotesListController',function($scope,$http,$routeParams) {
$scope.loading = true;
var site = "http://cdn.anemaindia.com/apps/iindia/ajax/Quotes.php?Token="+ $scope.Token+"&"; var page = $routeParams.q; $scope.q=site + page; 
$http.get(site + page ,{cache: true}) .success(function(response) {$scope.Quotes = response; $scope.loading = false;});
});
  
NewsApp.controller('QuoteDetailController',function($scope,$http,$routeParams) {
$scope.loading = true;
var site = "http://cdn.anemaindia.com/apps/iindia/ajax/Quote.php?Token="+ $scope.Token+"&Id="; var page = $routeParams.q; $scope.q=site + page; 
$http.get(site + page ,{cache: true}) .success(function(response) {$scope.Quote = response; $scope.loading = false;});
});









NewsApp.controller('MainCtrl', function($scope,$http,$routeParams,$cacheFactory,$rootScope) {
$rootScope.Token=localStorage.getItem("Token");
$rootScope.iCity = localStorage.getItem('iCity');

localStorage.setItem("Version",'1.0');

$scope.loading = true;
//if ($rootScope.Token=="") { $rootScope.LoginStatus=false;};

$http.get("http://cdn.anemaindia.com/apps/iindia/ajax/Jobs.php?Token="+ $scope.Token+ "&undefined",{cache: true}) .success(function(response) {$scope.Jobs = response; $scope.loading = false;});
$http.get("http://cdn.anemaindia.com/apps/iindia/ajax/GovtJobs.php?Token="+ $scope.Token+ "&undefined",{cache: true}) .success(function(response) {$scope.GovtJobs = response; $scope.loading = false;});
$http.get("http://cdn.anemaindia.com/apps/iindia/ajax/Classifieds.php?Token="+ $scope.Token+ "&undefined", { cache: true }) .success(function(response) {$scope.Classified = response; $scope.loading = false;});
$http.get("http://cdn.anemaindia.com/apps/iindia/ajax/MyProfile.php?Token="+ $scope.Token+ "&undefined" ,{cache: true}) .success(function(response) {$scope.MyProfile = response; $scope.loading = false;});
$http.get("http://cdn.anemaindia.com/apps/iindia/ajax/Settings.php?Token="+ $scope.Token+ "&undefined",{ cache: true }) .success(function(response) {$scope.Settings = response; $scope.loading = false;});


$scope.LogoutSubmit = function(){
$http.get("http://cdn.anemaindia.com/apps/iindia/ajax/Login.php?Logout") .success(function(response) {
localStorage.setItem("Token",'');
localStorage.setItem("Name",'');

window.location = "./";
});
};

});




NewsApp.controller('LoginController',function($scope,$http,$routeParams) {
$scope.LoginSubmit = function(){
var LoginUrl = "http://cdn.anemaindia.com/apps/iindia/ajax/Login.php?Token="+ $scope.Token+ "&"; var page = $routeParams.q; 
$scope.q=LoginUrl + page; 
$http({ method:'POST',headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},url:$scope.q, data: $scope.Login})
.success(function(response){
localStorage.setItem("Token",response.Token);
localStorage.setItem("Name",response.Name);
localStorage.setItem("iCity",response.iCity);
window.location = "./";
})
.error(function(response){$scope.error=response;})
};
});


NewsApp.controller('RegisterController',function($scope,$http,$routeParams) {
$scope.RegisterSubmit = function(){
var LoginUrl = "http://cdn.anemaindia.com/apps/iindia/ajax/Register.php"; 
$http({ method:'POST',headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},url:LoginUrl, data: $scope.Register})
.success(function(response){
if (response!="") {
localStorage.setItem("Token",response.Token);
localStorage.setItem("iCity",response.iCity);
window.location = "./";
};
})
.error(function(response){$scope.error=response;})
};
});