(function(){

  var shoppingListCheckOff=angular.module('ShoppingListCheckOff',[]);
  shoppingListCheckOff.controller('toBuyController',ToBuyController);
  shoppingListCheckOff.controller('alreadyBoughtController',AlreadyBoughtController);
  shoppingListCheckOff.service('ShoppingListCheckOffService',ShoppingListCheckOffService);
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService','$scope'];
  ToBuyController.$inject = ['ShoppingListCheckOffService'];

  function ToBuyController(shoppingListService){
    var toBuy=this;
    toBuy.showErrMsg=false;
    toBuy.items=shoppingListService.getToBuyItemsArr();
    toBuy.Add = function(item){
      shoppingListService.addItemsToBoughtList(item);
      shoppingListService.removeItemsFromShopList(item);
      if(toBuy.items.length===0){
        toBuy.showErrMsg=true;
      }
    }
  }
  function AlreadyBoughtController(shoppingListService,$scope){
          var bought=this;
          bought.showMsg=true;
    bought.items=shoppingListService.getBoughtItemsArr();
    $scope.$watch(function() {
      if (bought.items.length > 0) {
        bought.showMsg = false;
      }
    });


  }
  function ShoppingListCheckOffService(){

    var service=this;

    var toBuyItemsArr=[{ name: "cookies", quantity: 10 },{ name: "ice-cream", quantity: 20 }
       ,{ name: "chocolates", quantity: 5 },{ name: "cakes", quantity: 40 },{ name: "donuts", quantity: 15 }];

    var boughtItemsArr=[];

    service.getToBuyItemsArr=function(){
      return toBuyItemsArr;
    }

    service.getBoughtItemsArr=function(){
      console.log(boughtItemsArr);
      return boughtItemsArr;
    }
    service.addItemsToBoughtList=function(item){
      boughtItemsArr.push(item);
    }
    service.removeItemsFromShopList=function(item){
      for( var i=0;i<toBuyItemsArr.length;i++){
        if(item.name===toBuyItemsArr[i].name){
          toBuyItemsArr.splice(i,1);
        }
      }
    }
  }
})()
