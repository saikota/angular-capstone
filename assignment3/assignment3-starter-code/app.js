(function(){

  var NarrowItDownApp=angular.module('NarrowItDownApp',[]);
  var narrowItDownController=NarrowItDownApp.controller('NarrowItDownController',NarrowItDownController);
  NarrowItDownApp.service('MenuSearchService', MenuSearchService);
  NarrowItDownApp.directive('foundItems', FoundItemsDirective);
  narrowItDownController.$inject=[MenuSearchService];
  MenuSearchService.$inject=['$http'];
  function NarrowItDownController(MenuSearchService){
    var that=this;

    this.getItems=function(){

      MenuSearchService.getMatchedMenuItems(that.search).then(function(result){
        that.found= result
      })
      console.log(that.found);
    }

    this.removeItem=function(index){
      that.found.splice(index, 1);
    }

  }
  function FoundItemsDirective(){
    var ddo={
      templateUrl:"found.html",
      scope: {
        items:'<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'found',
      bindToController: true
      }
    return ddo;
  };

  function FoundItemsDirectiveController(){
    var found=this;
    found.emptyList=function(){
      if(found.items.length===0){
        return true;
      }else{
        return false;
      }
    }
  }

  function MenuSearchService($http){
   var service=this;
    service.getMatchedMenuItems=function(searchTerm){
     return $http.get('https://davids-restaurant.herokuapp.com/menu_items.json').then(function(result){

       var foundItems=[];
       if(searchTerm===""){
         return [];
       }
       for(var i=0;i<result.data.menu_items.length;i++){
         if(result.data.menu_items[i].description.indexOf(searchTerm)>-1){
           foundItems.push(result.data.menu_items[i]);
         }
       }
       return foundItems;
     })
   }
  }
})()
