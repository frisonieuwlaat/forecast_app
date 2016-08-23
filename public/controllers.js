// CONTROLLERS
weatherApp.controller('homeController', ['$scope', '$location', 'cityService', function($scope, $location, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
       cityService.city = $scope.city; 
    });
    
    $scope.submit = function() {
       $scope.city = document.querySelector('#result').value;
        $location.path("/forecast");
    };
    
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', 'weatherService', 'weatherService2', function($scope, $resource, $routeParams, cityService, weatherService, weatherService2) {
    
    $scope.city = cityService.city;
    
    $scope.days = $routeParams.days || '2';     
    
    $scope.weatherResult = weatherService.GetWeather($scope.city, $scope.days);
    
    $scope.weatherResult2 = weatherService2.GetWeather($scope.city, $scope.days);
 
    $scope.convertToDate = function(dt) { 
      
        return new Date(dt * 1000);
        
    };
    
}]);




weatherApp.controller('lineChartCtrl2', ['$scope', '$resource', 'cityService', 'weatherService2', function($scope, $resource, cityService, weatherService2) {
    

    weatherService2.GetWeather($scope.city, $scope.days).$promise.then(function (result) {

        $scope.weatherlist2 = result.list;
 
           $scope.data = [
            {
                key: "Gemiddelde temperatuur",
                values: [],
                color: "orange"
            },
            {
                key: "Maximale temperatuur",
                values: [],
                color: "red"
            },
            {
                key: "Minimale temperatuur",
                values: [],
                color: "blue"
            }
        ]
 
      for(var i = 0; i < $scope.weatherlist2.length; i++ ) {
          
             var dd =  [ $scope.weatherlist2[i].dt * 1000 ,  $scope.weatherlist2[i].main.temp ];
             
             var ee =  [$scope.weatherlist2[i].dt * 1000 ,  $scope.weatherlist2[i].main.temp_max ];
          
             var ff =  [ $scope.weatherlist2[i].dt * 1000 ,  $scope.weatherlist2[i].main.temp_min ];
             
             $scope.data[0].values.push(dd)
             
             $scope.data[1].values.push(ee)
             
             $scope.data[2].values.push(ff)
       }
    
            $scope.options = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 65
                },
                x: function(d){return d[0];},
                y: function(d){return d[1];},
                useVoronoi: false,
                clipEdge: true,
                duration: 100,
                useInteractiveGuideline: true,
                xAxis: {
                    axisLabel: 'Aantal dagen',
                    showMaxMin: false,
                    tickFormat: function(d) {
                        return d3.time.format('%d %b, %H:%M')(new Date(d))
                    }
                },
                yAxis: {
                    axisLabel: 'Graden',
                    tickFormat: function(d){
                        return d3.format(',.2f')(d);
                    }
                },
                zoom: {
                    enabled: true,
                    scaleExtent: [1, 10],
                    useFixedDomain: false,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: true,
                    unzoomEventType: 'dblclick.zoom'
                }
            }
        };
    });
}]);

weatherApp.controller('lineChartCtrl3', ['$scope', '$resource', 'cityService', 'weatherService2', function($scope, $resource, cityService, weatherService2) {
    
        weatherService2.GetWeather($scope.city, $scope.days).$promise.then(function (result) {

        $scope.weatherlist2 = result.list;  
            
           $scope.data = [
            {
                key: "Windsnelheid (m/s)",
                values: []
            }
        ]
 
      for(var i = 0; i < $scope.weatherlist2.length; i++ ) {
             var dd =  [ $scope.weatherlist2[i].dt * 1000 ,  $scope.weatherlist2[i].wind.speed ]
             
             $scope.data[0].values.push(dd)
       }  
     
    
            $scope.options = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 30,
                    left: 40
                },
                x: function(d){return d[0];},
                y: function(d){return d[1];},
                useVoronoi: false,
                clipEdge: true,
                duration: 100,
                useInteractiveGuideline: true,
                xAxis: {
                    showMaxMin: false,
                    tickFormat: function(d) {
                        return d3.time.format('%d %b, %H:%M')(new Date(d))
                    }
                },
                yAxis: {
                    tickFormat: function(d){
                        return d3.format(',.2f')(d);
                    }
                },
                zoom: {
                    enabled: true,
                    scaleExtent: [1, 10],
                    useFixedDomain: false,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: true,
                    unzoomEventType: 'dblclick.zoom'
                }
            }
        };
        });
}]);

weatherApp.controller('lineChartCtrl4', ['$scope', '$resource', 'cityService', 'weatherService2', function($scope, $resource, cityService, weatherService2) {
    
    weatherService2.GetWeather($scope.city, $scope.days).$promise.then(function (result) {

        $scope.weatherlist2 = result.list;  
        
           $scope.data = [
            {
                key: "Neerslag (mm)",
                values: []
            }
        ]
 
      for(var i = 0; i < $scope.weatherlist2.length; i++ ) {
             //var dd =  [ $scope.weatherResult2.list[i].dt * 1000 ,  $scope.weatherResult2.list[i]["rain"]["3h"] ]
             
          var dd = null;
             
          /*if($scope.weatherResult2.list[i]["rain"] == null){
                 dd =  [ $scope.weatherResult2.list[i].dt * 1000 ,  0 ];
             }else{
                 dd =  [ $scope.weatherResult2.list[i].dt * 1000 ,  $scope.weatherResult2.list[i]["rain"]["3h"] ];
             }*/
          
          
          dd = ($scope.weatherlist2[i]["rain"] == null ? 
              dd =  [ $scope.weatherlist2[i].dt * 1000 ,  0 ] :
               [ $scope.weatherlist2[i].dt * 1000 ,  $scope.weatherlist2[i]["rain"]["3h"] ]);
            
                    
        //      console.log(dd)
             
             $scope.data[0].values.push(dd)
       }  
    
            $scope.options = {
            chart: {
                type: 'stackedAreaChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 65
                },
                x: function(d){return d[0];},
                y: function(d){return d[1];},
                useVoronoi: false,
                clipEdge: true,
                duration: 100,
                useInteractiveGuideline: true,
                xAxis: {
                    axisLabel: 'Aantal dagen',
                    showMaxMin: false,
                    tickFormat: function(d) {
                        return d3.time.format('%d %b, %H:%M')(new Date(d))
                    }
                },
                yAxis: {
                    axisLabel: 'Neerslag',
                    tickFormat: function(d){
                        return d3.format(',.2f')(d);
                    }
                },
                zoom: {
                    enabled: true,
                    scaleExtent: [1, 10],
                    useFixedDomain: false,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: true,
                    unzoomEventType: 'dblclick.zoom'
                }
            }
        };
    });
}]);

weatherApp.controller('lineChartCtrl5', ['$scope', '$resource', 'cityService', 'weatherService2', function($scope, $resource, cityService, weatherService2) {
    
    weatherService2.GetWeather($scope.city, $scope.days).$promise.then(function (result) {

        $scope.weatherlist2 = result.list;  
        
           $scope.data = [
            {
                key: "Luchtvochtigheid (%)",
                values: []
            }
        ]
 
      for(var i = 0; i < 8; i++ ) {
             //var dd =  [ $scope.weatherResult2.list[i].dt * 1000 ,  $scope.weatherResult2.list[i]["rain"]["3h"] ]
             
          var dd = null;
             
          /*if($scope.weatherResult2.list[i]["rain"] == null){
                 dd =  [ $scope.weatherResult2.list[i].dt * 1000 ,  0 ];
             }else{
                 dd =  [ $scope.weatherResult2.list[i].dt * 1000 ,  $scope.weatherResult2.list[i]["rain"]["3h"] ];
             }*/
          
          
          dd = ($scope.weatherlist2[i]["rain"] == null ? 
              dd =  [ $scope.weatherlist2[i].dt * 1000 ,  0 ] :
               [ $scope.weatherlist2[i].dt * 1000 ,  $scope.weatherlist2[i].main.humidity ]);
            
                    
        //      console.log(dd)
             
             $scope.data[0].values.push(dd)
       }  
    
            $scope.options = {
            chart: {
                type: 'multiBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 65
                },
                x: function(d){return d[0];},
                y: function(d){return d[1];},
                useVoronoi: false,
                clipEdge: true,
                duration: 100,
                useInteractiveGuideline: true,
                xAxis: {
                    axisLabel: 'Aantal dagen',
                    showMaxMin: false,
                    tickFormat: function(d) {
                        return d3.time.format('%d %b, %H:%M')(new Date(d))
                    }
                },
                yAxis: {
                    axisLabel: 'Luchtvochtigheid',
                    tickFormat: function(d){
                        return d3.format(',.2f')(d);
                    }
                }
            }
        };
    });
}]);

weatherApp.controller('lineChartCtrl6', ['$scope', '$resource', 'cityService', 'weatherService2', function($scope, $resource, cityService, weatherService2) {
    
    weatherService2.GetWeather($scope.city, $scope.days).$promise.then(function (result) {

        $scope.weatherlist2 = result.list;  
        
           $scope.data = [
            {
                key: "Luchtdruk (hPa)",
                values: []
            }
        ]
 
      for(var i = 0; i < $scope.weatherlist2.length; i++ ) {
             var dd =  [ $scope.weatherlist2[i].dt * 1000 ,  $scope.weatherlist2[i].main.pressure ]
             
             $scope.data[0].values.push(dd)
       }
    
            $scope.options = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 65
                },
                x: function(d){return d[0];},
                y: function(d){return d[1];},
                useVoronoi: false,
                clipEdge: true,
                duration: 100,
                useInteractiveGuideline: true,
                xAxis: {
                    axisLabel: 'Aantal dagen',
                    showMaxMin: false,
                    tickFormat: function(d) {
                        return d3.time.format('%d %b, %H:%M')(new Date(d))
                    }
                },
                yAxis: {
                    axisLabel: 'Luchtdruk',
                    tickFormat: function(d){
                        return d3.format(',.2f')(d);
                    }
                },
                zoom: {
                    enabled: true,
                    scaleExtent: [1, 10],
                    useFixedDomain: false,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: true,
                    unzoomEventType: 'dblclick.zoom'
                }
            }
        };
    });
}]);

