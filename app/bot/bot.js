/**
 * Creaparticularer on 6-8-15.
 */
'use strict';

angular.module('tulipWebGui.bot', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/bot', {
            templateUrl: 'bot/bots.html',
            controller: 'BotController'
        });
    }])
    .run(function($rootScope,$sce){
        //TODO: move all these tooltips...
        $rootScope.typeTooltip = $sce.trustAsHtml("<p>The type of bot you want to use<p/><p><strong>graph</strong> trade on all markets on one exchange.<p/>" +
            "<p><strong>ema</strong> trade on a single market on one exchange, based on information from multiple exchanges.</p>");
        $rootScope.nameTooltip= $sce.trustAsHtml("Give all your bots an nice name");
        $rootScope.apiTooltip = $sce.trustAsHtml("<p>The exchange that you wish to trade on. <p/>The chosen exchange will need API keys.");
        //TODO: move all these ema tooltips...

        $rootScope.targetTooltip = $sce.trustAsHtml("The market you whish to trade on with this bot.");

        $rootScope.marginTooltip = $sce.trustAsHtml("<p>The minimum deviation before the bot will atempt to trade. Ignoring latency issues, this is the average profit that the bot will make each trade.<p/>" +
            "<p><b>Suggested value:</b> between 3 and 5 times the fee on the exchange. Setting this too low and the fees will eat up your profits, setting this too high and you might not do any trades at all.</p>");

        $rootScope.minTooltip = $sce.trustAsHtml("<p>The minimum order size the bot should use.</p>");

        $rootScope.maxTooltip = $sce.trustAsHtml("<p>The <span style='text-decoration: underline;'>maximum order size</span> allows you to limit the size of orders.</p>" +
            "<p>The bot always spends all his funds.</p>" +
            "<p>The bot will create orders with a random size &LT <span style='text-decoration: underline;'>maximum order size</span> and random price &PlusMinus; the" +
            " <span style='text-decoration: underline;'>margin</span> (depending on the side) until all funds for that market are in orders.</p>" +
            "<p>This is useful when you want to push a lot of funds through the market.</p>");

        $rootScope.longTooltip = $sce.trustAsHtml("<p>A rough indication of the amount of trades the bot takes into account when making decisions.</p>" +
            "<p>The bot will wait 2*<span style='text-decoration: underline;'>long</span> time before making it's first trade.</p>" +
            "<p><b>Suggested value:</b> between 3000 and 8000 seems to work best according to backtesting. Lean towards the higher value on exchanges with low liquidity.</p>");

        $rootScope.inputTooltip = $sce.trustAsHtml("<p>The markets this bot wil consider when determining the ideal price of an asset.</p>" +
            "<p><b>Suggested value:</b> Add related markets from different exchanges. If you are trading on BTC/USD, related markets might be BTC/CNY and BTC/EUR. More is usually better.</p>" +
            "<p>You must add at least one market from the exchange this bot is trading on.</p><p>You will not need API keys for exchanges that are only used as inputs.</p>");

        //TODO: move all these graph tooltips...
        $rootScope.profitTooltip = $sce.trustAsHtml("<p>The minimum percentage of 'guaranteed' profit before the bot creates an order.</p>" +
            "<p>Profit is guaranteed the instant the bot places the order, but it might not be anymore by the time the order arrives on the exchange.</p>" +
            "<p><b>Suggested value:</b> a couple times above the fee % on the exchange.</p>");

        $rootScope.specTooltip = $sce.trustAsHtml("<p>The minimum percentage of so called 'speculative' profit before the bot creates an order.</p>" +
            "<p>The graph bot will create an order and waits for it to be filled. </p><p><b>Suggested value:</b> around double of profit.</p>");

        $rootScope.maxinvestTooltip = $sce.trustAsHtml("<p>The maximum amount of BTC to invest in currencies.</p>" +
            "<p><b>Suggested value:</b> As high as possible without running out of BTC. Higher values linearly increase the profit, but you can't trade when neither of the 'big' stocks have anthing left.</p>");

        $rootScope.ignoreTooltip = $sce.trustAsHtml("<p>An comma separated list of currencies you do not whish to trade with. Not case sensitive.</p>" +
            "<p><b>Example:</b> cent, doge, pts</p>");

        $rootScope.bigTooltip = $sce.trustAsHtml("<p>An comma separated list of currencies you whish to keep funds on at all times.</p>" +
            "<p><b>Example:</b> btc, ltc, cny</p>" +
            "<p>It is usefull to enter all currencies that have large amounts or markets here, this ensures that the bot always has enough funds to create an order when opportunities arrive.</p>");

        $rootScope.highTooltip = $sce.trustAsHtml("<p>The maximum amount of funds kept in one of the <span style='text-decoration: underline;'>big</span> currencies. </p>");

        $rootScope.lowTooltip = $sce.trustAsHtml("<p>The minimum amount of funds kept in one of the <span style='text-decoration: underline;'>big</span> currencies. </p>");

        $rootScope.returnTooltip = $sce.trustAsHtml("<p>If all <span style='text-decoration: underline;'>big</span> stocks are already above the <span style='text-decoration: underline;'>low</span> threshold, move funds to this currency instead.</p>" +
            "<p><br/>If you find that the bot is accumating large amounts of funds in this currency, try increasing 'maxinvest'.</p>");
    })
    .service('BotService', function () {
        var bots = [];
        var callbacks = [];
        var addBot = function (bot) {
            bots.push(angular.copy(bot));
            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i](bots);
            }
        }
        var onBotAdded = function (callback) {
            callbacks.push(callback);
        }
        var getBots = function () {
            return bots;
        }
        var getSingleBot = function (index) {
            return bots[index];
        }
        var removeBot = function (index) {
            bots.splice(index, 1);
        }
        return {
            onBotAdded: onBotAdded,
            addBot: addBot,
            getBots: getBots,
            removeBot: removeBot,
            getSingleBot: getSingleBot
        };
    })
    .controller('BotController', ['$scope', 'EmaBot', 'GraphBot', 'ExchangeService', 'BotService', '$modal',
        function ($scope, EmaBot, GraphBot, ExchangeService, BotService, $modal) {

            $scope.Exchanges = ExchangeService.getExchanges();
            $scope.Bots = BotService.getBots();

            $scope.onExchangeAdded = function (exchanges) {
                $scope.Exchanges = exchanges;
            }
            $scope.remove = BotService.removeBot;

            $scope.addBot = function (bot) {
                BotService.addBot(bot);
            }

            $scope.edit = function (index) {
                var modalInstance = $modal.open({
                    animation: 'false',
                    templateUrl: 'bot/create.html',
                    controller: 'BotEditCtrl',
                    size: 'lg',
                    resolve: {
                        bot: function () {
                            return BotService.getSingleBot(index);
                        },
                        index: function () {
                            return index;
                        }
                    }

                });

            }
            //popup
            $scope.open = function () {
                var modalInstance = $modal.open({
                    animation: 'false',
                    templateUrl: 'bot/create.html',
                    controller: 'BotCreateCtrl',
                    size: 'lg'
                });
            };


        }

    ])
    .controller('BotCreateCtrl', function (EmaBot, GraphBot, $scope, $modalInstance, MarketService, ExchangeService, BotService) {
        $scope.Exchanges = ExchangeService.getExchanges();
        $scope.exchange = {};
        $scope.watcherMarket = [];
        $scope.modaltitle = "Create bot";

        $scope.changeType = function (index) {
            if (this.bot.type == "ema") {
                //we need to use scope here with this we loose our reference
                $scope.bot = new EmaBot(this.bot);
            }
            else if (this.bot.type == "graph") {
                $scope.bot = new GraphBot(this.bot);
            }
        }
        $scope.addBot = function () {
            BotService.addBot($scope.bot);
            $modalInstance.close();
        }

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        //TODO: move ema functions
        $scope.changeTargetExchange = function () {
            $scope.Markets = ExchangeService.getExchangeMarkets(this.bot.api);
        }
        $scope.changeExchangeWatcher = function (input, index) {
            $scope.watcherMarket[index] = ExchangeService.getExchangeMarkets(input.name);
        }
        $scope.addNewInput = function () {
            this.bot.watchers.push({});
        }
        $scope.removeInput = function (index) {
            this.bot.watchers.splice(index, 1);

        }


    })
    .controller('BotEditCtrl', function (EmaBot, GraphBot, $scope, $modalInstance, MarketService, ExchangeService, BotService, bot, index) {
        $scope.Exchanges = ExchangeService.getExchanges();
        $scope.bot = bot;
        $scope.watcherMarket = [];
        $scope.Markets = ExchangeService.getExchangeMarkets(bot.api);

        //Todo: move ema Initialize selected dropdowns if type is ema
        if (bot.type == "ema") {
            bot.watchers.forEach(function (input, i) {
                $scope.watcherMarket[i] = ExchangeService.getExchangeMarkets(input.name);
            });
        }
        $scope.modaltitle = "Edit bot";
//Store the current settings
        $scope.botold = angular.copy(bot);

        $scope.changeType = function (index) {
            if (this.bot.type == "ema") {
                //we need to use scope here with this we loose our reference
                angular.copy(new EmaBot(this.bot), $scope.bot)
            }
            else if (this.bot.type == "graph") {
                angular.copy(new GraphBot(this.bot), $scope.bot)
            }
        }
        $scope.addBot = function () {
            $modalInstance.close();
        }

        $scope.cancel = function () {
            angular.copy($scope.botold, $scope.bot);
            $modalInstance.dismiss('cancel');
        };
//TODO: move ema functions
        $scope.changeTargetExchange = function () {
            $scope.Markets = ExchangeService.getExchangeMarkets(this.bot.api);
        }
        $scope.changeExchangeWatcher = function (input, index) {
            $scope.watcherMarket[index] = ExchangeService.getExchangeMarkets(input.name);
        }
        $scope.addNewInput = function () {
            this.bot.watchers.push({});
        }
        $scope.removeInput = function (index) {
            this.bot.watchers.splice(index, 1);

        }

    });