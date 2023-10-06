import React from 'react';
import Tree from './Tree';

const treeData = [
  {
    id: 1,
    label: 'Node 1',
    children: [
      {
        id: 2,
        label: 'Node 1.1',
        children: [
          {
            id: 3,
            label: 'Node 1.1.1',
            children: [],
          },
        ],
      },
      {
        id: 4,
        label: 'Node 1.2',
        children: [],
      },
    ],
  },
];

const App = () => {
  return (
    <div>
      <h1>Tree Library Example</h1>
      <Tree data={treeData} />
    </div>
  );
};

export default App;