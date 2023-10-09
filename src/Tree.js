// import React from 'react';
// import TreeNode from './TreeNode';

// const Tree = ({ data }) => {
//   return <div>{data.map((node) => <TreeNode key={node.id} node={node} />)}</div>;
// };

// export default Tree;



// import React, { useState } from 'react';

// const TreeNode = ({ node, onDragStart, onDragOver, onDrop }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const handleToggle = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <div
//       draggable
//       onDragStart={(e) => onDragStart(e, node)}
//       onDragOver={(e) => onDragOver(e, node)}
//       onDrop={(e) => onDrop(e, node)}
//     >
//       <div onClick={handleToggle}>
//         {node.children && node.children.length > 0 && (isExpanded ? 'V ' : '> ')}
//         {node.label}
//       </div>
//       {isExpanded && node.children && (
//         <div style={{ marginLeft: '20px' }}>
//           {node.children.map((childNode) => (
//             <TreeNode key={childNode.id} node={childNode} onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const Tree = ({ data }) => {
//   const [draggedItem, setDraggedItem] = useState(null);

//   const handleDragStart = (e, node) => {
//     setDraggedItem(node);
//   };

//   const handleDragOver = (e, node) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e, targetNode) => {
//     const updatedData = [...data];
//     const dropIndex = updatedData.findIndex((node) => node.id === targetNode.id);
//     const draggedIndex = updatedData.findIndex((node) => node.id === draggedItem.id);

//     // Move the dragged item to the new position
//     updatedData.splice(draggedIndex, 1);
//     updatedData.splice(dropIndex, 0, draggedItem);

//     // Update the state with the new data
//     setDraggedItem(null);
//     // TODO: Update your state with updatedData
//   };

//   return (
//     <div>
//       {data.map((node) => (
//         <TreeNode key={node.id} node={node} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} />
//       ))}
//     </div>
//   );
// };

// export default Tree;



// import React from 'react';
// import TreeNode from './TreeNode';

// const Tree = ({ data, onDragStart, onDragOver, onDrop }) => {
//   return (
//     <div className="tree">
//       {data.map((node) => (
//         <TreeNode key={node.key} node={node} onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop} />
//       ))}
//     </div>
//   );
// };

// export default Tree;

// import React, { useState } from 'react';

// const TreeNode = ({ node, onDragStart, onDragOver, onDrop }) => {
//       const [isExpanded, setIsExpanded] = useState(false);

//   const handleToggle = () => {
//     setIsExpanded(!isExpanded);
//   };
//   return (
//     <div
//       draggable
//       onDragStart={(e) => onDragStart(node, e)}
//       onDragOver={(e) => onDragOver(node, e)}
//       onDrop={(e) => onDrop(node, e)}
//     >
//       {node.title}
//       {node.children && node.children.length > 0 && (
//         <div style={{ marginLeft: '20px' }}>
//           {node.children.map((child) => (
//             <TreeNode key={child.key} node={child} onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const Tree = ({ data, onDragStart, onDragOver, onDrop }) => {
//   return (
//     <div>
//       {data.map((node) => (
//         <TreeNode key={node.key} node={node} onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop} />
//       ))}
//     </div>
//   );
// };

// export default Tree;

// import React, { useState } from 'react';

// const TreeNode = ({ node, onDragStart, onDragOver, onDrop }) => {
//   const [isDropdownOpen, setDropdownOpen] = useState(false);

// import React, { useState } from "react";

// const TreeNode = ({ node, dragEnabled, onDragStart, onDragOver, onDrop }) => {
//   const [isExpanded, setIsExpanded] = useState(false);


//   const toggleDropdown = () => {
//     setDropdownOpen(!isDropdownOpen);
//   };

//   return (
//     <div
// <
//       draggable
//       onDragStart={(e) => onDragStart(node, e)}
//       onDragOver={(e) => onDragOver(node, e)}
//       onDrop={(e) => onDrop(node, e)}
//     >
//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         <span onClick={toggleDropdown} style={{ cursor: 'pointer', marginRight: '8px' }}>
//           {isDropdownOpen ? 'v' : '>'}
//         </span>
//         {node.title}
//       </div>
//       {isDropdownOpen && (
//         <div style={{ marginLeft: '20px' }}>
//           {node.children &&
//             node.children.length > 0 &&
//             node.children.map((child) => (
//               <TreeNode
//                 key={child.key}
//                 node={child}
//                 onDragStart={onDragStart}
//                 onDragOver={onDragOver}
//                 onDrop={onDrop}
//               />
//             ))}
// =======
//       draggable={dragEnabled}
//       onDragStart={(e) => onDragStart(e, node)}
//       onDragOver={(e) => onDragOver(e, node)}
//       onDrop={(e) => onDrop(e, node)}
//     >
//       <div onClick={handleToggle}>
//         {node.children &&
//           node.children.length > 0 &&
//           (isExpanded ? "V " : "> ")}
//         {node.label}
//       </div>
//       {isExpanded && node.children && (
//         <div style={{ marginLeft: "20px" }}>
//           {node.children.map((childNode) => (
//             <TreeNode
//               key={childNode.id}
//               node={childNode}
//               onDragStart={onDragStart}
//               onDragOver={onDragOver}
//               onDrop={onDrop}
//             />
//           ))}
// >>>>>>> 78eea9ca5ef1d8b1a5ca77f4c067c4f8a2e2af5c
//         </div>
//       )}
//     </div>
//   );
// };

// const Tree = ({ data, onDragStart, onDragOver, onDrop }) => {
//   return (
//     <div>
//       {data.map((node) => (
//         <TreeNode key={node.key} node={node} onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop} />
// const Tree = ({ data }) => {
//   const [draggedItem, setDraggedItem] = useState(null);

//   const handleDragStart = (e, node) => {
//     setDraggedItem(node);
//   };

//   const handleDragOver = (e, node) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e, targetNode) => {
//     const updatedData = [...data];
//     const dropIndex = updatedData.findIndex(
//       (node) => node.id === targetNode.id
//     );
//     const draggedIndex = updatedData.findIndex(
//       (node) => node.id === draggedItem.id
//     );

//     // Move the dragged item to the new position
//     updatedData.splice(draggedIndex, 1);
//     updatedData.splice(dropIndex, 0, draggedItem);

//     // Update the state with the new data
//     setDraggedItem(null);
//     // TODO: Update your state with updatedData
//   };

//   return (
//     <div>
//       {data.map((node) => (
//         <TreeNode
//           key={node.id}
//           node={node}
//           onDragStart={handleDragStart}
//           onDragOver={handleDragOver}
//           onDrop={handleDrop}
//         />
//       ))}
//     </div>
//   );
// };

// export default Tree;
import React, { useState } from 'react';

const TreeNode = ({ node, onDragStart, onDragOver, onDrop }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(node, e)}
      onDragOver={(e) => onDragOver(node, e)}
      onDrop={(e) => onDrop(node, e)}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span onClick={toggleDropdown} style={{ cursor: 'pointer', marginRight: '8px' }}>
          {isDropdownOpen ? '-' : '+'}
        </span>
        {node.title}
      </div>
      {isDropdownOpen && (
        <div style={{ marginLeft: '20px' }}>
          {node.children &&
            node.children.length > 0 &&
            node.children.map((child) => (
              <TreeNode
                key={child.key}
                node={child}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
              />
            ))}
        </div>
      )}
    </div>
  );
};

const Tree = ({ data, onDragStart, onDragOver, onDrop }) => {
  return (
    <div>
      {data.map((node) => (
        <TreeNode key={node.key} node={node} onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop} />
      ))}
    </div>
  );
};

export default Tree;
