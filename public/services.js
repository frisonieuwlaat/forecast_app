// SERVICES
weatherApp.service('cityService', function() {
   
    this.city = "";
    
});

weatherApp.service('weatherService', ['$resource', function($resource) {
   
    this.GetWeather = function(city, days) {
        var weatherAPI = $resource("//api.openweathermap.org/data/2.5/forecast/daily?q=zwolle&mode=json&units=metric&appid=ae75fb0d24dc16f7b4d367aeff6eda9d", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    
        return weatherResult = weatherAPI.get({ q: city, cnt: days });
    };
    
}]);

weatherApp.service('weatherService2', ['$resource', function($resource) {
   
    this.GetWeather = function(city, days) {
        var weatherAPI = $resource("//api.openweathermap.org/data/2.5/forecast/?q=rotterdam&mode=json&units=metric&appid=ae75fb0d24dc16f7b4d367aeff6eda9d", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    
        return weatherResult2 = weatherAPI.get({ q: city, cnt: days });
    };
    
}]);