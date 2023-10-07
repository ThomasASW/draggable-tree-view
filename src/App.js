// import React from 'react';
// import Tree from './Tree';

// const treeData = [
//   {
//     id: 1,
//     label: 'Node 1',
//     children: [
//       {
//         id: 2,
//         label: 'Node 1.1',
//         children: [
//           {
//             id: 3,
//             label: 'Node 1.1.1',
//             children: [],
//           },
//         ],
//       },
//       {
//         id: 4,
//         label: 'Node 1.2',
//         children: [],
//       },
//     ],
//   },
// ];

// const App = () => {
//   return (
//     <div>
//       <h1>Tree Library Example</h1>
//       <Tree data={treeData} />
//     </div>
//   );
// };

// export default App;



// import React from 'react';
// import Tree from './Tree';
// import "./App.css"
// const jsonData = [
//   {
//     id: 1,
//     name: 'Node 1',
//     children: [
//       {
//         id: 2,
//         name: 'Node 1.1',
//         children: [
//           {
//             id: 3,
//             name: 'Node 1.1.1',
//           },
//         ],
//       },
//       {
//         id: 4,
//         name: 'Node 1.2',
//       },
//     ],
//   },
//   {
//     id: 5,
//     name: 'Node 2',
//     children: [
//       {
//         id: 6,
//         name: 'Node 2.1',
//       },
//     ],
//   },
// ];

// const App = () => {
//   return (
//     <div>
//       <h1>Tree Component with Drag and Drop</h1>
//       <Tree data={jsonData} />
//     </div>
//   );
// };

// export default App;


// import React, { useState } from 'react';
// import Tree from './Tree';

// const App = () => {
//   const initialData = [
//     {
//       key: '1',
//       title: 'Node 1',
//       children: [
//         {
//           key: '1-1',
//           title: 'Node 1.1',
//           children: [],
//         },
//         {
//           key: '1-2',
//           title: 'Node 1.2',
//           children: [],
//         },
//       ],
//     },
//     {
//       key: '2',
//       title: 'Node 2',
//       children: [],
//     },
//   ];

//   const [data, setData] = useState(initialData);

//   const handleDragStart = (draggedNode, e) => {
//     // Handle drag start event
//   };

//   const handleDragOver = (targetNode, e) => {
//     // Handle drag over event
//   };

//   const handleDrop = (targetNode, e) => {
//     // Handle drop event and update the tree structure
//   };

//   return (
//     <div>
//       <h1>Draggable Tree</h1>
//       <Tree data={data} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} />
//     </div>
//   );
// };

// export default App;
import React, { useState } from 'react';
import Tree from './Tree';

const App = () => {
  const initialData = [
    {
      key: '1',
      title: 'Node 1',
      children: [
        {
          key: '1-1',
          title: 'Node 1.1',
          children: [],
        },
        {
          key: '1-2',
          title: 'Node 1.2',
          children: [],
        },
      ],
    },
    {
      key: '2',
      title: 'Node 2',
      children: [],
    },
  ];

  const [data, setData] = useState(initialData);

  const handleDragStart = (draggedNode, e) => {
    // Store the dragged node for later use
    e.dataTransfer.setData('text/plain', JSON.stringify(draggedNode));
  };

  const handleDragOver = (targetNode, e) => {
    // Prevent default behavior to allow drop
    e.preventDefault();
  };

  const handleDrop = (targetNode, e) => {
    // Prevent the default drop behavior
    e.preventDefault();

    // Get the dragged node data from the data transfer object
    const draggedNode = JSON.parse(e.dataTransfer.getData('text/plain'));

    // Clone the current data state to avoid mutating the state directly
    const newData = [...data];

    // Find the target node in the tree
    const findNode = (nodes, key) => {
      for (let node of nodes) {
        if (node.key === key) {
          return node;
        }
        if (node.children && node.children.length > 0) {
          const foundNode = findNode(node.children, key);
          if (foundNode) {
            return foundNode;
          }
        }
      }
      return null;
    };

    // Find the dragged node in the tree
    const sourceNode = findNode(newData, draggedNode.key);

    // Remove the dragged node from its original position
    const removeNode = (nodes, key) => {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].key === key) {
          nodes.splice(i, 1);
          return true;
        }
        if (nodes[i].children && nodes[i].children.length > 0) {
          const nodeRemoved = removeNode(nodes[i].children, key);
          if (nodeRemoved) return true;
        }
      }
      return false;
    };

    // Remove the dragged node from its original position
    removeNode(newData, draggedNode.key);

    // Add the dragged node to the target node's children
    if (!targetNode.children) {
      targetNode.children = [];
    }

    targetNode.children.push(sourceNode);

    // Update the state with the new tree structure
    setData(newData);
  };

  return (
    <div>
      <h1>Draggable Tree</h1>
      <Tree data={data} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} />
    </div>
  );
};

export default App;
