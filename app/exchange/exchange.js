'use strict';

angular.module('tulipWebGui.exchange', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/exchange', {
            templateUrl: 'exchange/exchanges.html',
            controller: 'ExchangeController'
        });
    }])
    .run(function($rootScope, $sce){
        $rootScope.typeTooltip = $sce.trustAsHtml("The exchange to use");
        $rootScope.nameTooltip = $sce.trustAsHtml("Give each of your exchanges an nice name.");
        $rootScope.publicTooltip = $sce.trustAsHtml("<p>The public key of this exchange.</p><p><br/>This can be omitted if you don't plan to trade on this exchange.</p>");
        $rootScope.privateTooltip = $sce.trustAsHtml("<p>The private key of of this exchange. Sometimes called 'secret'.</p><p>This can be omitted if you don't plan to trade on this exchange.</p>");
        $rootScope.usernameTooltip = $sce.trustAsHtml("<p>Your CEX.IO username</p><p><br/></p><p>This can be omitted if you don't plan to trade on this exchange.</p>");
        $rootScope.walletidTooltip = $sce.trustAsHtml("<p>The wallet ID on itbit</p><p><br/></p><p>This can be omitted if you don't plan to trade on this exchange.</p>");
    })
    .service('ExchangeService', function (MarketService) {
        var exchanges = [];
        var callbacks =[];

        var addExchange = function(exchange){
            exchanges.push(angular.copy(exchange));
            for(var i = 0; i <callbacks.length; i++){
                callbacks[i](exchanges);
            }
        }
        var onExchangeAdded = function(callback){
            callbacks.push(callback);
        }
        var getExchanges = function(){
           return exchanges;
        }
        var getSingleExchange = function(index){
            return exchanges[index];
        }
        var getExchangeMarkets = function(name){
            for (var i=0; i < exchanges.length; i++) {
                if (exchanges[i].name === name) {
                    return MarketService.Markets(exchanges[i].type);
                }
            }
        }
        var removeExchange = function(index){
            exchanges.splice( index, 1 );
        }
        return {
            onExchangeAdded : onExchangeAdded,
            addExchange: addExchange,
            getExchanges: getExchanges,
            removeExchange: removeExchange,
            getExchangeMarkets: getExchangeMarkets,
            getSingleExchange : getSingleExchange
        };

    })
    .controller('ExchangeController', ['$scope','MarketService', 'ExchangeService', '$modal',
        function($scope, MarketService, ExchangeService, $modal) {
            $scope.exchanges = ExchangeService.getExchanges();

            $scope.remove = ExchangeService.removeExchange;

            $scope.edit = function(index){
                $scope.exchange = ExchangeService.getSingleExchange(index);
                var modalInstance = $modal.open({
                    animation: 'false',
                    templateUrl: 'exchange/create.html',
                    controller: 'ExchangeEditCtrl',
                    size: 'lg',
                    resolve: {
                        exchange: function () {
                            return $scope.exchange;
                        },
                        index: function(){
                            return index;
                        }
                    }

                });

            }
            //popup
            $scope.open = function () {
                var modalInstance = $modal.open({
                    animation: 'false',
                    templateUrl: 'exchange/create.html',
                    controller: 'ExchangeCreateCtrl',
                    size: 'lg'
                });
            };
        }

    ])
    .controller('ExchangeCreateCtrl', function ($scope, $modalInstance, MarketService, ExchangeService, $sce) {
        $scope.exchangesTypes = MarketService.Exchanges();
        $scope.exchanges = ExchangeService.getExchanges();
        $scope.exchange = {};

        $scope.modaltitle= "Create exchange"

        $scope.addExchange = function(){
            ExchangeService.addExchange($scope.exchange);
            $modalInstance.close();
        }

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    })
    .controller('ExchangeEditCtrl', function ($scope, $modalInstance, MarketService, ExchangeService, exchange,index, $sce) {
        $scope.exchangesTypes = MarketService.Exchanges();
        $scope.exchanges = ExchangeService.getExchanges();
        $scope.exchangeold = angular.copy(exchange);
        $scope.exchange = exchange;

        $scope.modaltitle= "Edit exchange";

        $scope.addExchange = function(){
            $modalInstance.close();
        }

        $scope.cancel = function () {
            angular.copy($scope.exchangeold,$scope.exchange);
            $modalInstance.dismiss('cancel');
        };
    });
