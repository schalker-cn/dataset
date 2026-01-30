import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {  
    ResponsiveContainer,
    ComposedChart, 
    CartesianGrid, 
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Area,
    Bar,
    Dot
} from './../../../../components/recharts';

import colors from './../../../../colors';

const data = [
  { key: 0, month: "Jan 22", Tokyo: 1700, "New York": 1500, Berlin: 900 },
  { key: 1, month: "Feb 22", Tokyo: 1650, "New York": 1400, Berlin: 950 },
  { key: 2, month: "Mar 22", Tokyo: 1720, "New York": 1550, Berlin: 1000 },
  { key: 3, month: "Apr 22", Tokyo: 1690, "New York": 1600, Berlin: 980 },
  { key: 4, month: "May 22", Tokyo: 1750, "New York": 1700, Berlin: 1100 },
  { key: 5, month: "Jun 22", Tokyo: 1780, "New York": 1650, Berlin: 1150 }
];

// 保留你的 dot 生成逻辑
const generateDot = ({stroke, ...other}) => (
    <Dot
        { ...other }
        fill={ stroke }
        stroke={ colors['white'] }
        strokeWidth={ 2 }
        r={ 5 }
    />
);

export const AudienceMetricsChart = ({height, className}) => (
    <ResponsiveContainer
        width='100%'
        minHeight='250px'
        className={ className }
        {...(!_.isUndefined(height) ? {
            height
        } : {
            aspect: 2 / 1
        })}
    >
        <ComposedChart data={data}
            margin={{top: 20, right: 20, bottom: 20, left: 20}}>
          <CartesianGrid stroke={ colors['200'] } strokeDasharray='none' vertical={ false }/>
          <XAxis dataKey="month"/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='New York' barSize={5} fill={ colors['400'] } />
          <Area dataKey='Tokyo' fill={ colors['purple-02'] } stroke={ colors['purple'] } activeDot={ null } />
          <Area dataKey='Berlin' fill={ colors['primary-04'] } stroke={ colors['primary'] } activeDot={{r: 5}} dot={generateDot}  />
       </ComposedChart>
    </ResponsiveContainer>
);
AudienceMetricsChart.propTypes = {
    height: PropTypes.string,
    className: PropTypes.string
};
