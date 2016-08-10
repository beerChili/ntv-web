'use strict'

const moment = require('moment'),
    config = require('../../config')

module.exports = ($scope, SimpleHttpLoader) => {
    let request
    $scope.$watch('date', newVal => {
        if (newVal) {
            clearTimeout(request)
            request = setTimeout(() => {
                const source = 'SPIEGEL',
                    date = moment(newVal, config.fullDate).format('YYYY-MM-DD'),
                    url = `${config.api}words?source=${source}&date=${date}`

                SimpleHttpLoader(url)
                    .then(response => {
                        $scope.data = response.data
                    })
            }, 200)
        }
    })
}
