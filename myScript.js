/* This reference path helps to write Angular JS code easily */
/// <reference path="angular.min.js" />

var myApp = angular.module("myModule", []); //creating a module

//register a controller myApp.controller("controllerName", function);
myApp.controller("myController", function($scope){
    
    /*==============================================================
       Database Start 
    ==============================================================*/
    //sales item database - all sales item will be stored in here - while software is on 
    $scope.salesAll = [];
    
    //sales item database - temporary for one customer - when new customer come then this array will be empty  
    $scope.sales = [];
    
    //product database  
    $scope.products = [
        { itemid: 1, itemname: 'Bread', itemrate: 40.00 },
        { itemid: 2, itemname: 'Jelly', itemrate: 120.00 },
        { itemid: 3, itemname: 'Butter', itemrate: 100.00 },
        { itemid: 4, itemname: 'Toothbrush', itemrate: 35.00 },
        { itemid: 5, itemname: 'Toothpaste', itemrate: 32.00 },
        { itemid: 6, itemname: 'Coffee', itemrate: 95.00 },
        { itemid: 7, itemname: 'Shampoo', itemrate: 5.00 },
        { itemid: 8, itemname: 'Chocolate', itemrate: 15.00 },
        { itemid: 9, itemname: 'Biscuit', itemrate: 20.00 },
        { itemid: 10, itemname: 'Milk', itemrate: 45.00 },
        { itemid: 11, itemname: 'Icecream', itemrate: 40.00 },
        { itemid: 12, itemname: 'Juice', itemrate: 30.00 }
        
    ];
    /*==============================================================
       Database End
    ==============================================================*/
    
    
    
    //initialisation 
    $scope.sid = parseInt($scope.sales.length+1); 
    $scope.rate = 0; 
    $scope.quantity = 0; 
    $scope.price = $scope.rate * $scope.quantity; 
    $scope.selectedItem = 'No Item'; //selected product 
    $scope.selectedItemIndex = '';

    //hide pages at the first time
    $("#salePage").hide(); //salesPage where customer want to buy something 
    $("#saleInfo").hide(); //salesInfo where all sales information will be stored 
    $("#productInfo").hide(); //productInfo where all product information will be stored 
    $("#aboutPage").hide(); //aboutPage  
    
    
    //variable  
    var pageName = '';
    $scope.pageName = pageName; 
    $scope.pressEnter = false; 

    

    /*==============================================================================
    Function Start 
    ==============================================================================*/
    
    /*=============================================================*/
    //press Enter key from anywhere then ... 
    $scope.myFunct = function(keyEvent) {
        if (keyEvent.which === 13) //Enter key when cursor will stay in the 'Quantity' field 
            if($scope.pressEnter == true){
                $scope.addSales(); //call the function 
            }else {
                $scope.edit(); //call the function 
            }
    };
    //creating keypress system for using from keyboard 
    /*=============================================================*/
    
        
    /*=============================================================*/
    //function 'Help' for all page  
    $scope.getHelp = function(pName){
        $scope.pName = pName; 

        if(pName=='salePage'){
            var txt = 'Please, select the item from item list by using mouse then type quantity and press ENTER Key, finally click New Sale!';
            alert(txt);
        }
    }; // /function 'Help' for all page  
    /*=============================================================*/
    
    
    /* Sales Inforomation */
    
    //get total sales from sale information 
    $scope.getTotalSales = function(){
        //get the total price 
        $scope.totalPrice = 0; 
        for(i=0;i<$scope.salesAll.length;i++){
            $scope.totalPrice = parseInt($scope.totalPrice) + parseInt($scope.salesAll[i].price);
        }
        alert('Total Sale : ' + $scope.totalPrice + ' Taka');
        
    }
    
     
    
    /* Sales Item */
    
    /*================================== Get Date and Time ==========================================*/
    //get the current date and time 
    $scope.d,$scope.m,$scope.y,$scope.mArray,$scope.monthText,$scope.fullDate,$scope.h,$scope.m,$scope.ampm,$scope.fullTime;
    $scope.dateObject = new Date();
    $scope.getDate = function(){
        $scope.d = $scope.dateObject.getDate();
        $scope.m = $scope.dateObject.getMonth();
        $scope.y = $scope.dateObject.getFullYear();

        //get month name 
        $scope.mArray = ['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec'];
        $scope.monthText =$scope.mArray[$scope.m]; //get month name 

        //add zero when date will be less than 10 
        if ($scope.d < 10) {
            $scope.d = "0" + $scope.d;
        }

        $scope.fullDate = $scope.d + '-' + $scope.monthText + '-' + $scope.y;
    }
    //get time with AM or PM 
    $scope.addZero = function(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    };
    $scope.getTime = function() {
        $scope.h = $scope.addZero($scope.dateObject.getHours());
        $scope.m = $scope.addZero($scope.dateObject.getMinutes());
        if($scope.h>12){
            $scope.h = $scope.h - 12; 
            $scope.ampm='PM';
        }else{
            $scope.ampm='AM';
        }
        $scope.fullTime = $scope.h + ":" + $scope.m + " " + $scope.ampm;
    };
    //get the current date and time 
    /*================================== Get Date and Time ==========================================*/
    
    
    //get total price and also print them for a customer 
    $scope.getTotalPrice = function() {
        $scope.totalPrice = 0; 
        $scope.finalResult = ''; 
        
        //get the total price 
        for(i=0;i<$scope.sales.length;i++){
            $scope.totalPrice = parseFloat($scope.totalPrice) + parseFloat($scope.sales[i].price);
        }
        
        $scope.getDate();
        $scope.getTime();
        
        $scope.finalOutput = '====================================' + '<br>' + "\u00A0" + "\u00A0" + "\u00A0" + 'Total Price : ' + $scope.totalPrice + '<br>' + $scope.fullDate + "\u00A0" + '(' + $scope.fullTime + ')' +'<br>' + '====================================' + '<br>' ; //to add totalPrice with existing content
                
        
        //to prin any element of the div 
        var divContents = $("#salesTablePrint").html();
        var printWindow = window.open('', '', 'height=400,width=300');
        printWindow.document.write('<html><head><title>Supershop</title>');
        printWindow.document.write('</head><body>');
        printWindow.document.write('==================================== <br> Supershop by AngularJS <br> Developed by Alin. <br> ==================================== <br>');
        printWindow.document.write(divContents);
        printWindow.document.write($scope.finalOutput);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print(); //to print elements of the window 
        //to prin any element of the div 
        
        //to fix the problem 
        $scope.totalPrice = ''; 

    };
    

    //function for the newSale - sales item 
    $scope.newSale = function(){   
        var result = confirm('Are you sure you want to create a new sale?');
        if(result==true){
            
            //entry sales data into salesAll 
            for(i=0; i<$scope.sales.length;i++){
                $scope.salesAll.push({
                    sid:$scope.sales[i].sid, item:$scope.sales[i].item, rate:$scope.sales[i].rate, quantity:$scope.sales[i].quantity,price:$scope.sales[i].price
                });
            } 
            
            
            $scope.getTotalPrice();
            $scope.sales = []; //removing array item of the sales array             
            
            
            $scope.getNewSID(); 

        }
    };
    
    //delete any item - sales item 
    $scope.del = function(id) {
        var result = confirm('Are you sure?');
        if(result==true){
            var index = getSelectedIndex(id); 
            $scope.sales.splice(index, 1);  
            $scope.getNewSID();
        }
    };
    
    //save the edit item - sales item 
    $scope.edit = function(){
        $("#btnAdd").show(); //add button 
        $scope.pressEnter = true;
        $("#btnSave").hide(); //save button 
        var index = getSelectedIndex($scope.sid);
        $scope.sales[index].itemname = $scope.selectedItem;
        $scope.sales[index].price = $scope.price;
        $scope.sales[index].quantity = $scope.quantity;
        $scope.sid = parseInt($scope.sales.length+1);
        $scope.item = '';
        $scope.price = 0;
        $scope.quantity = 0;
        
        $scope.getNewSID();
    }
    
    //select any item to edit - sales item 
    $scope.selectEdit = function(id){ 
        $("#btnAdd").hide(); //add button 
        $scope.pressEnter = false; 
        $("#btnSave").show(); //save button 
        var index = getSelectedIndex(id); 
        var sale = $scope.sales[index];
        $scope.sid = sale.sid;
        $scope.selectedItem = sale.item;
        $scope.rate = sale.rate;
        $scope.quantity = sale.quantity;
        $scope.price = sale.price; 
    };
    
    //get the selected index - sales item 
    function getSelectedIndex(id) {
        for(var i=0; i<$scope.sales.length; i++)
            if($scope.sales[i].sid == id)
                return i;
        return -1;
    }
    
    //function to show and hide the page - sales item 
    $scope.selPage = function(pageName){
        $scope.pageName = pageName; 

        if(pageName=='salePage'){
            $("#saleInfo").hide(); //if show then will be hidden 
            $("#productInfo").hide(); //if show then will be hidden 
            $("#aboutPage").hide(); //if show then will be hidden 
            $("#salePage").show(); //salesPage where customer want to buy something 
            $("#btnAdd").show(); //add button 
            $scope.pressEnter = true; 
            $("#btnSave").hide(); //save button 
        }else if(pageName=='saleInfo'){
            $("#salePage").hide(); //if show then will be hidden 
            $("#productInfo").hide(); //if show then will be hidden 
            $("#aboutPage").hide(); //if show then will be hidden 
            $("#saleInfo").show(); //salesPage where customer want to buy something 
            $("#btnAdd").show(); //add button 
            $scope.pressEnter = true; 
            $("#btnSave").hide(); //save button 
        }else if(pageName=='productInfo'){
            $("#salePage").hide(); //if show then will be hidden 
            $("#saleInfo").hide(); //if show then will be hidden 
            $("#aboutPage").hide(); //if show then will be hidden 
            $("#productInfo").show(); //salesPage where customer want to buy something 
            $("#btnAdd").show(); //add button 
            $scope.pressEnter = true; 
            $("#btnSave").hide(); //save button productInfo
        }else if(pageName=='aboutPage'){
            $("#salePage").hide(); //if show then will be hidden 
            $("#saleInfo").hide(); //if show then will be hidden 
            $("#productInfo").hide(); //salesPage where customer want to buy something 
            $("#aboutPage").show(); //if show then will be hidden 
        }
    }; // /function to show and hide the page
    
    
    //getPrice of any product  - sales item 
    $scope.getPrice = function(){
        selectedItemIndex = $("#sitem")[0].selectedIndex; //get index after select any item from database 
        $scope.price = $scope.rate * $scope.quantity; //get price after calculation 
    }
    
    //getRate of any product - sales item 
    $scope.getRate = function(){
        selectedItemIndex = $("#sitem")[0].selectedIndex; //get index after select any item from database 
        $scope.rate = $scope.products[selectedItemIndex].itemrate;  //get the rate of the selected item from database 
        $("#squantity").focus();   
        $scope.quantity = 1;
        $scope.getPrice();
    }
    
    //get new and unique sale id 
    $scope.getNewSID = function(){
        if(($scope.sales.length > 0) && ($scope.salesAll.length < 1)){
            $scope.sid = $scope.sales[parseInt($scope.sales.length-1)].sid + 1; 
            $('#sitem').focus();
            $scope.rate = 0;
            $scope.quantity = 0;
            $scope.price = 0; 
        }else if(($scope.sales.length < 1) && ($scope.salesAll.length > 0)){
            $scope.sid = $scope.salesAll[parseInt($scope.salesAll.length-1)].sid + 1; 
            $('#sitem').focus();
            $scope.rate = 0;
            $scope.quantity = 0;
            $scope.price = 0;  
        }else if(($scope.sales.length > 0) && ($scope.salesAll.length > 0)){
            $scope.sid = $scope.sales[parseInt($scope.sales.length-1)].sid + 1; 
            $('#sitem').focus();
            $scope.rate = 0;
            $scope.quantity = 0;
            $scope.price = 0;  
        }else if(($scope.sales.length < 1) && ($scope.salesAll.length < 1)){
            $scope.sid = $scope.sales[parseInt($scope.sales.length-1)].sid + 1; 
            $('#sitem').focus();
            $scope.rate = 0;
            $scope.quantity = 0;
            $scope.price = 0;  
        }
    }
    
    //function to add sales item - sales item 
    $scope.addSales = function(){
        
        //check validation
        if(($scope.selectedItem != 'No Item') && ($("#squantity").val() != 0) && ($("#srate").val() != 0)){
            //add sales item temporary in the sales array 
            $scope.sales.push({
                sid:$scope.sid, item:$scope.selectedItem, rate:$scope.rate, quantity:$scope.quantity, price:$scope.price
            });
            $scope.getNewSID(); //get new and unique sid 
        }else {
            alert("Please, select any item and quantity! If rate field is not work then again select item. Better to use mouse for it.");
        } 
    }; // /function to add sales item 
    
    /*==============================================================================
    Function End 
    ==============================================================================*/
    
         
    
}); // /Controller Function 