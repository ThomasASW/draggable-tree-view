
// import React, { useState } from 'react';

// const TreeNode = ({ node }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const handleToggle = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <div>
//       <div onClick={handleToggle}>
//         {node.children && node.children.length > 0 && (isExpanded ? 'v' : '>')}
//         {node.label}
//       </div>
//       {isExpanded && node.children && (
//         <div style={{ marginLeft: '20px' }}>
//           {node.children.map((childNode) => (
//             <TreeNode key={childNode.id} node={childNode} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TreeNode;

