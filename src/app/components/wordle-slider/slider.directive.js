'use strict'

const noUiSlider = require('nouislider'),
    moment = require('moment'),
    config = require('../../config')

module.exports = (SimpleHttpLoader) => {
    return {
        restrict: 'A',
        template: '<div></div> <p date="date">{{date}}</p>',
        compile: (element, attrs) => {

            const slider = element.children().eq(0)[0]

            return (scope, element, attrs) => {
                SimpleHttpLoader(`${config.api}daterange?source=SPIEGEL`)
                    .then(response => {
                        const fromDate = moment(response.data.from.date).toDate(),
                            toDate = moment(response.data.to.date).toDate()

                        const stepSize = 24 * 60 * 60 * 1000 // one day
                        noUiSlider.create(slider, {
                            range: {
                                min: fromDate.getTime(),
                                max: toDate.getTime()
                            },
                            pips: {
                                mode: 'steps',
                                format: {
                                    to: toDateString
                                },
                                filter: value => moment(value).date() === 1 ? 1 : 0,
                                density: stepSize
                            },
                            step: stepSize,
                            start: toDate.getTime(),
                        })

                        slider.noUiSlider.on('update', (values, handle) => {
                            if (values[handle]) {
                                scope.$applyAsync(() => {
                                    scope.date = moment(+values[handle]).format(config.fullDate)
                                })
                            }
                        })

                    })
            }

            function toDateString(value) {
                const date = moment(value)
                if (date.date() === 1) {
                    if (date.month() === 0) {
                        return date.format('MMM YYYY')
                    }
                    return date.format('MMM')
                }
            }
        }
    }
}
