'use strict'

module.exports = require('angular').module('wordle', [])
    .directive('wordleSlider', require('./wordle.directive'))
    .directive('slider', require('./slider.directive'))
    .controller('wordleController', require('./wordle.controller'))
    .factory('d3', () => require('d3'))
    .factory('SimpleHttpLoader', $http => url => $http.get(url))
