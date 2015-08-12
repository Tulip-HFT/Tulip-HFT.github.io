angular.module('tulipWebGui.bot').factory('Bot', function () {
    var name;
    var type;
    var exchange;

    /**
     * Constructor, with class name
     */
    var Bot = function () {
        // Public properties, assigned to the instance ('this')
        this.name = "";
        this.type = "";
        this.api = "";
    };

    var Bot = function (data) {
        // Public properties, assigned to the instance ('this')
        this.name = data.name;
        this.type = data.type;
        this.api = data.api;
    };

    /**
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    Bot.build = function (data) {
        return new Bot(
            data.name,
            data.type,
            data.api
        );
    };
    /**
     * Return the constructor function
     */
    return Bot;
})
angular.module('tulipWebGui.bot').factory('EmaBot', function (Bot) {
        var targetmarket = "";
        var margin = 0.01;
        var long = 5000;
        var short = 1;
        var watchers = [{}];
        /**
         * Ema Constructor
         */
        var EmaBot = function (bot) {
            // Public properties, assigned to the instance ('this')
            this.targetmarket = "";
            this.margin = 0.01;
            this.long = 5000;
            this.short = 1;
            this.watchers = [{}];
            Bot.apply(this, arguments);
        };

        /**
         * Return the constructor function
         */
        return EmaBot;
    })
    //Graph factory
angular.module('tulipWebGui.bot').factory('GraphBot', function (Bot) {
        var profitpercentage;
        var speculativeprofitpercentage;
        var maxinvest;
        var ignorecenter;
        var big;
        var high;
        var low;
        var rreturn;

        /**
         * Constructor, with class name
         */
        var GraphBot = function (bot) {
            // Public properties, assigned to the instance ('this')
            this.profitpercentage = 0.03;
            this.speculativeprofitpercentage = 0.04;
            this.maxinvest = 1;
            this.ignorecenter;
            this.big;
            this.high;
            this.low;
            this.rreturn;
            Bot.apply(this, arguments);
        };


        /**
         * Return the constructor function
         */
        return GraphBot;
    })