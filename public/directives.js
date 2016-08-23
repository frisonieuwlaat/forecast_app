// DIRECTIVES

weatherApp.directive("weatherTitel", function() {
   return {
       restrict: 'E',
       templateUrl: 'directives/weatherTitel.html',
       replace: true,
       scope: {
           weatherDay: "=",
           convertToStandard: "&",
           convertToDate: "&",
           dateFormat: "@"
       }
   }
});

/*weatherApp.directive("weatherReport1", function() {
   return {
       restrict: 'E',
       templateUrl: 'directives/weatherBericht1.html',
       replace: true,
       scope: {
           weatherDay: "=",
           convertToStandard: "&",
           convertToDate: "&",
           dateFormat: "@"
       }
   }
});*/

weatherApp.directive('googleplace', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                    model.$setViewValue(element.val());                
                });
            });
        }
    };
});
//myApp.factory('myService', function() {});

function MyCtrl($scope) {
    $scope.gPlace;
}

