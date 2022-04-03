import React from 'react'
import { HorizontalGridLines, LineSeries, VerticalGridLines, XAxis, XYPlot, YAxis } from 'react-vis';

function ChartLine({ profitData, contributionData, show }) {

    if (show === undefined || !show) {
        return;
    }
    return (
        <XYPlot width={1000} height={600}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <LineSeries data={profitData} />
            <LineSeries data={contributionData} />
        </XYPlot>
    );
}

export default ChartLine