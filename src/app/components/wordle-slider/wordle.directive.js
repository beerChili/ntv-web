'use strict'

const hash = require('murmurhash').v2,
    dialogBuilder = require('./helper/dialog-builder'),
    colorScale = require('./helper/color-helper'),
    config = require('../../config')

module.exports = (d3, ngDialog) => {
    return {
        restrict: 'E',
        template: '<div data="data"></div> <div slider></div>',
        controller: 'wordleController',
        compile: (element, attrs) => {

            const width = config.cloudWidth,
                height = config.cloudHeight

            const svg = d3.select(element.children().eq(0)[0])
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .style('display', 'block')
                .style('margin', 'auto')
                .append('g')
                .attr('transform', `translate(${width/2},${height/2})`)

            return (scope, element, attrs) => {
                function draw(words) {
                    const cloud = svg.selectAll('g text')
                        .data(words, d => d.value)

                    cloud.enter()
                        .append('text')
                        .on('click', d => {
                            ngDialog.open(dialogBuilder(d, scope.data.date))
                        })
                        .style('font-family', d => d.font)
                        .attr('text-anchor', 'middle')
                        .attr('fill', d => d.color)
                        .attr('transform', d => `translate(${[d.x, d.y]}) rotate(${d.rotate})`)
                        .text(d => d.value)
                        .transition()
                        .duration(200)
                        .style('font-size', d => d.size + 'px')

                    cloud
                        .transition()
                        .duration(800)
                        .style('font-size', d => d.size + 'px')
                        .style('fill-opacity', 1)
                        .attr('fill', d => d.color)
                        .attr('transform', d => `translate(${[d.x, d.y]}) rotate(${d.rotate})`)
                        .text(d => d.value)

                    cloud.exit()
                        .transition()
                        .duration(200)
                        .style('fill-opacity', 1e-6)
                        .attr('font-size', 1)
                        .remove()
                }

                scope.$watch('data', (newVal, oldVal, scope) => {
                    if (newVal) {
                        const wordScale = d3.scalePow()
                            .exponent(1.5)
                            .domain([newVal.words[newVal.words.length - 1].count, newVal.words[0].count])
                            .range([18, 92])

                        d3.cloud = require('d3-cloud')
                        d3.cloud()
                            .size([width, height])
                            .words(newVal.words)
                            .text(d => d.value)
                            .rotate(d => {
                                const length = d.value.length
                                let angle = Math.min(Math.random() * 3 / length, 1)
                                angle = Math.random() < 0.5 ? -angle : angle
                                angle = Math.asin(angle)
                                angle = angle * 180 / Math.PI
                                return angle
                            })
                            .random(seed => hash(seed) / Math.pow(2, 32))
                            .padding(2)
                            .font('Impact')
                            .fontSize(d => wordScale(d.count))
                            .color(d => colorScale(d, newVal, oldVal))
                            .on('end', draw)
                            .start()
                    }
                })
            }
        }
    }
}
