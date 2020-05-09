import React, {useEffect, useRef, useState} from 'react';
import ChartJs from 'chart.js';
import PropTypes from 'prop-types';
import './chart.css';

const Chart = props => {
        const canvas = useRef(null);

        const [chartType, setChartType] = useState('bar');
        useEffect(() => {
            const chartOptions = {
                legend: {
                    display: false,
                },
                pointBackgroundColor: '#ff493b',
                tooltips: {
                    callbacks: {
                        title: function (value) {
                            const regex = /\b[\w']+(?:[^\w\n]+[\w']+){0,5}\b/g;
                            return value[0]['xLabel'].match(regex);
                        }
                    }
                }
            };

            if (chartType === 'bar') {
                chartOptions['scales'] = {
                    xAxes: [{
                        stacked: true,
                        ticks: {
                            callback: function (value) {
                                if (value.length > 20) {
                                    return value.substr(0, 10) + '...';
                                } else {
                                    return value
                                }

                            },
                        }
                    }],
                    yAxes: [{
                        stacked: true,
                    }]
                }
            } else if (chartType === 'radar') {
                chartOptions['scale'] = {
                    ticks: {
                        beginAtZero: true,
                        min: 0,
                    }
                }
            }

            const ChartObject = new ChartJs(canvas.current.getContext('2d'), {
                type: chartType,
                data: {
                    labels: props.labels,
                    datasets: [{
                        backgroundColor: randomColors(props.labels.length),
                        data: props.dataset,
                        borderColor: 'rgba(35,110,164,0.96)',
                    }],
                },
                options: chartOptions,
            });
            return function cleanUp() {
                ChartObject.destroy();
            }
        }, [chartType]);


        function randomColors(amount) {
            let colors = [];
            for (let i = 0; i < amount; i++) {
                colors.push('#' + Math.random().toString(16).substr(2, 6));
            }
            return colors;

        }

        return (
            <div className="canvas-container" >
                <h2 className="text-center">{props.title}</h2>
                <h5>Chart type</h5>
                <button className="btn btn-secondary" onClick={() => setChartType('bar')}>Bar</button>
                <button className="btn btn-secondary" onClick={() => setChartType('pie')}>Pie</button>
                <button className="btn btn-secondary" onClick={() => setChartType('radar')}>Radar</button>

                <canvas ref={canvas} height="140"/>
            </div>
        );
    }
;

Chart.propTypes = {
    title: PropTypes.string.isRequired,
    labels: PropTypes.array.isRequired,
    dataset: PropTypes.array.isRequired,
};

export default Chart;
