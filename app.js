(function(){
  
  var lunchApp=angular.module('lunchApp',[]);
  lunchApp.controller('lunchController',LunchCheckController);
  lunchController.$inject=['$scope'];
  function LunchCheckController($scope){
    $scope.dishes="";

    $scope.checkLunchList=function(){
      $scope.msg= checkLunchListCount($scope.dishes);
    }

    function checkLunchListCount(dishesList){
      var dishesListVar=dishesList.split(',');
      if(dishesList===""){
        return "Please enter data first"
      }
      if(dishesListVar.length<=3){
        return "Enjoy!"
      }else{
        return "Too much!"
      }
    }
  }
})()
