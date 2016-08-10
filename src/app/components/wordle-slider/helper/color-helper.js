'use strict'
const d3 = require('d3')

const colors = [
    'rgb(57,59,119)',
    'rgb(107,110,205)',
    'rgb(227,221,132)',
    'rgb(181,204,90)',
    'rgb(233,114,129)',
    'rgb(205,35,62)'
]

module.exports = (currentWord, newData, oldData) => {
    if (oldData) {
        const oldWord = oldData.words.find(word => word.value === currentWord.value)
        if (oldWord) {
            const growth = currentWord.count / oldWord.count
            switch (true) {
                case growth < 0.5:
                    return colors[0]
                case growth < 0.8:
                    return colors[1]
                case growth < 1.2:
                    return colors[2]
                case growth < 1.5:
                    return colors[3]
                case growth < 2:
                    return colors[4]
                default:
                    return colors[5]
            }
        } else {
            // new word
            return 'rgb(77,77,77)'
        }
    } else {
        const colorScale = d3.scaleQuantile()
            .domain([newData.words[newData.words.length - 1].count, newData.words[0].count])
            .range(colors)
        return colorScale(currentWord.count)
    }

}
