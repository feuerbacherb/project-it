import React from 'react';
import { Chart } from "react-google-charts";


export default function Charts() {
  return (
    <Chart
  width={'100%'}
  height={'400px'}
  chartType="Gantt"
  loader={<div>Loading Chart</div>}
  data={[
    [
      { type: 'string', label: 'Project ID' },
      { type: 'string', label: 'Project Name' },
      { type: 'date', label: 'Start Date' },
      { type: 'date', label: 'End Date' },
      { type: 'number', label: 'Duration' },
      { type: 'number', label: 'Percent Complete' },
      { type: 'string', label: 'Tasks' },
    ],
    [
      'Research',
      'Find sources',
      new Date(2015, 0, 1),
      new Date(2015, 0, 5),
      null,
      100,
      null,
    ],
    [
      'Write',
      'Write paper',
      null,
      new Date(2015, 0, 9),
      3 * 24 * 60 * 60 * 1000,
      25,
      'Research,Outline',
    ],
    [
      'Cite',
      'Create bibliography',
      null,
      new Date(2015, 0, 7),
      1 * 24 * 60 * 60 * 1000,
      20,
      'Research',
    ],
    [
      'Complete',
      'Hand in paper',
      null,
      new Date(2015, 0, 10),
      1 * 24 * 60 * 60 * 1000,
      0,
      'Cite,Write',
    ],
    [
      'Outline',
      'Outline paper',
      null,
      new Date(2015, 0, 6),
      1 * 24 * 60 * 60 * 1000,
      100,
      'Research',
    ],
  ]}
  rootProps={{ 'data-testid': '1' }}
/>
  );
}