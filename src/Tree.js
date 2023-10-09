
import React, { useState } from "react";

const TreeNode = ({ node, onDragStart, onDragOver, onDrop,onDelete }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
const deleteNode=(nodeToDelete)=>{
  // const updatedTreeData = node.filter((node) => node.key !== nodeToDelete.key);
  //   setTreeData(updatedTreeData);
}
  return (
    <div
      draggable
      onDragStart={(e) => {
        console.log(node, "drag started");
        onDragStart(node, e);
      }}
      onDragOver={(e) => onDragOver(node, e)}
      onDrop={(e) => onDrop(node, e)}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <span
          onClick={toggleDropdown}
          style={{ cursor: "pointer", marginRight: "10px" }}
        >
          {isDropdownOpen ? <i class="fa-solid fa-caret-down" style={{marginLeft: "10px"}}></i> :<i class="fa-solid fa-caret-right" style={{marginLeft: "10px"}}></i>}
        </span>
        {node.title} &emsp; <i class="fa-solid fa-trash" style={{color: "#fe240b"}} onClick={() => onDelete(node.key)}></i>
      </div>
      {isDropdownOpen && (
        <div style={{ marginLeft: "20px" }}>
          {node.children &&
            node.children.length > 0 &&
            node.children.map((child) => (
              <TreeNode
                key={child.key}
                node={child}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
                onDelete={onDelete}
              />
            ))}
        </div>
      )}
    </div>
  );
};

const Tree = ({ data, onDragStart, onDragOver, onDrop ,onDeleteNode}) => {
  return (
    <div>
      {data.map((node) => (
        <TreeNode
          key={node.key}
          node={node}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onDelete={onDeleteNode}
        />
      ))}
    </div>
  );
};

export default Tree;
