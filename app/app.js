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
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }])
    .controller('MainController', ['$scope', 'BotService', 'ExchangeService','MarketService',
        function ($scope, BotService, ExchangeService,MarketService) {
            $scope.exchanges = MarketService.Exchanges();
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
            $scope.import = function() {

                // define reader
                var reader = new FileReader();

                // A handler for the load event (just defining it, not executing it right now)
                reader.onload = function(e) {
                    $scope.$apply(function() {
                        $scope.configFile = reader.result;
                        $scope.configFile = angular.fromJson($scope.configFile);
                        ExchangeService.addExchanges($scope.configFile.api);
                        BotService.addBots($scope.configFile.bot);
                    });
                };
                var FileInput = $scope.myconfig;

                // use reader to read the selected file
                // when read operation is successfully finished the load event is triggered
                // and handled by our reader.onload function
                reader.readAsText(FileInput);
            };


        }

    ]);