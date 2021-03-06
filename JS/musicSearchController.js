/**
 * Created by RahulD1 on 04-03-2016.
 */
(function () {
    'use strict';

    /**
     *  Module
     *
     * Description
     */
    angular
        .module('Home')
        .controller('musicSearchController', ['$scope','fetchSearchResults', musicSearchController]);

    function musicSearchController($scope, fetchSearchResults) {

       fetchSearchResults.getData({'ids':['41MnTivkwTO3UUJ8DrqEJJ','6JWc4iAiJ9FjyK0B59ABb4','6UXCm6bOO4gFlDQZV5yL37']}).then(function(response){
                 $scope.allResults= response.data.albums[0].tracks.items;
                 
        });
       

       $scope.getSearchResults= function(){
         $scope.filteredAlbums=[];
         $scope.filteredArtists=[];
         $scope.filteredResults=[];
         var searchInput= $scope.searchInput;
         

         if(searchInput){

             for(var eachItem in $scope.allResults){
                if(($scope.allResults[eachItem].name).toLowerCase()===searchInput.toLowerCase()){
                    $scope.filteredAlbums.push($scope.allResults[eachItem]);
                }

                else if(($scope.allResults[eachItem].artists[0].name).toLowerCase()===searchInput.toLowerCase()){
                     $scope.filteredArtists.push($scope.allResults[eachItem]);
                }
             }

             if($scope.filteredAlbums.length>0){
                $scope.filteredResults= $scope.filteredAlbums;
             }
             else{
                 $scope.filteredResults= $scope.filteredArtists;
             }
             console.log($scope.filteredResults);

             for(var eachItem in $scope.filteredResults){
                for(var eachArtist in $scope.filteredResults[eachItem].artists){
                    var href= $scope.filteredResults[eachItem].artists[eachArtist].href;

                    fetchSearchResults.getData('', href).then(function(response){
                        $scope.filteredArtists= response.data;
                    });

                    // var params= href.split('/')[href.split('/').length-1];
                    // var url= href.substr(0, href.indexOf(params));
                    // fetchSearchResults.getData({'id': params}, url).then(function(response){
                    //      $scope.filteredArtists= response.data;
                    // });
                }
             }
        }
       };

    }
})(); 