
import React, { useState } from "react";

const TreeNode = ({ node, onDragStart, onDragOver, onDrop }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

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
        {node.title}
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
        <TreeNode
          key={node.key}
          node={node}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
      ))}
    </div>
  );
};

export default Tree;
