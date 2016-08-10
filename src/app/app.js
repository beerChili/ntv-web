'use strict'
const angular = require('angular')

angular.module('myApp', [
  require('./components/wordle-slider').name,
  require('ng-dialog')
])
