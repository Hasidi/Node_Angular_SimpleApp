/**
 * Created by Hasidi on 20/06/2017.
 */

app.factory('CityModel', ['$http', function($http) {


    function CityModel(city) {
        if (city)
            this.setData(city);
    }

    CityModel.prototype = {
        setData: function(cityData) {
            angular.extend(this, cityData);
        },
        load: function(cityID) {
            let self = this;
            $http.get('/cities/' + cityID).then(function(cityData) {
                self.setData(cityData);
            });
        },
        add: function () {
            let self = this;
            $http.post('/cities', self).then(function(res) {
                let x = 10;
            });
        },
        delete: function() {
            let self = this;
            $http.delete('cities/delete/' + self.id); //not implemented
        },
        isAvailable: function() { // not implemented
            // let self = this;
            // return self.quantity > 0;
        }
    };
    return CityModel;
}]);