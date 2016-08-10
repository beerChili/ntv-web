'use strict'

const moment = require('moment')

module.exports = ($scope, SimpleHttpLoader) => {
    let request
    $scope.$watch('date', newVal => {
        if (newVal) {
          clearTimeout(request)
          request = setTimeout(() => {
            const source = 'SPIEGEL',
                date = moment(newVal, 'dddd, MMMM Do, YYYY').format('YYYY-MM-DD'),
                url = `http://192.168.99.100:10010/api/words?source=${source}&date=${date}`

            SimpleHttpLoader(url)
                .then(response => {
                    $scope.data = response.data
                })
          }, 200)
        }
    })
}
