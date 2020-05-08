import React, {useEffect, useRef, useState} from 'react';
import ChartJs from 'chart.js';
import PropTypes from 'prop-types'

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
                                return value.substr(0, 20) + '...';
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
                    backgroundColor: ['rgb(255, 99, 132)', 'rgb(0,133,115)', 'rgb(41,106,163)'],
                    data: props.dataset,
                    borderColor: 'rgba(6,132,10,0.77)',
                }],
            },
            options: chartOptions,
        });
        return function cleanUp() {
            ChartObject.destroy();
        }
    }, [chartType]);

    return (
        <div>
            <h2 className="text-center">{props.title}</h2>
            <div>
                <h5>Chart type</h5>
                <button onClick={() => setChartType('bar')}>Bar</button>
                <button onClick={() => setChartType('pie')}>Pie</button>
                <button onClick={() => setChartType('radar')}>Radar</button>
            </div>
            <canvas ref={canvas} height="150px">

            </canvas>

        </div>
    );
};

Chart.propTypes = {
    title: PropTypes.string.isRequired,
    labels: PropTypes.array.isRequired,
    dataset: PropTypes.array.isRequired,
};

export default Chart;
