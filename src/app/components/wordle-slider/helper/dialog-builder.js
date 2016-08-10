'use strict'
const moment = require('moment')

module.exports = (data, date) => {
    const dateString = moment(date).format('MMM. Do, YYYY')
    let template = `<h1>${data.value}</h1><i>${dateString}</i><p>Frequency: ${data.count}</p><ul>`
    data.occurrenceRefs.forEach((ref) => {
        template += `<li><a target="_blank" href="${ref.url}">${ref.headline}</a></li>`
    })
    template += '</ul>'
    return {
        template,
        plain: true,
        className: 'ngdialog-theme-plain custom-width'
    }
}
