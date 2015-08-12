'use strict';

// Declare app level module which depends on views, and components
angular.module('tulipWebGui', [
    'ngRoute',
    'tulipWebGui.bot',
    'tulipWebGui.exchange',
    'smart-table',
    'ngAnimate',
    'ui.bootstrap',
    'ui.utils.masks'
])
    .service('MarketService', function () {
        var markets = null;
        var exchanges = null;
        return {
            setData: function (data) {
                exchanges = Object.keys(data);
                markets = data;
            },
            Markets: function (exchange) {
                return markets[exchange];
            },
            Exchanges: function () {
                return exchanges;
            }
        };
    })
    //fetch all possible markets and exchanges one time
    .run(function ($http, MarketService,$rootScope) {
        $http.get('markets.json').success(function (data) {
            MarketService.setData(data);
        })
        $rootScope.debug = false;
    })
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'maintext.html',
        });
        $routeProvider.when('/viewconfig', {
            templateUrl: 'displayconfig.html',
            controller: 'MainController'
        });
    }])
    .controller('MainController', ['$scope', 'BotService', 'ExchangeService',
        function ($scope, BotService, ExchangeService) {
            $scope.config = {};
            $scope.config['api'] = ExchangeService.getExchanges();
            $scope.config['bot'] = BotService.getBots();
            $scope.download = function(){
                var hiddenElement = document.createElement('a');
                hiddenElement.href = 'data:attachment/json,' + encodeURI(JSON.stringify($scope.config,null,"    "));
                hiddenElement.target = '_blank';
                hiddenElement.download = 'config.json';
                hiddenElement.click();
            }


        }

    ]);