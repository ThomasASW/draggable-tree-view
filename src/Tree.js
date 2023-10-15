import React, { useState } from "react";

const TreeNode = ({
  node,
  onDragStart,
  onDragOver,
  onDrop,
  onDelete,
  onEditNode,
  dragEnabled,
  readOnly,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const [isEditing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(node.title);

  const handleEditInputChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleEditSave = () => {
    onEditNode(node.key, editedTitle);
    setEditing(false);
  };

  return (
    <div
      draggable={dragEnabled}
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
          {isEditing ? (
            <div>
              <input
                type="text"
                value={editedTitle}
                onChange={handleEditInputChange}
              />
              <button onClick={handleEditSave}>Save</button>
            </div>
          ) : (
            ""
          )}

          {node.children.length > 0 && isDropdownOpen ? (
            <i
              className="fa-solid fa-caret-down"
              style={{ marginLeft: "10px" }}
            ></i>
          ) : (
            // <i
            //   className="fa-solid fa-caret-right"
            //   style={{ marginLeft: "10px" }}
            // ></i>
            ""
          )}

          {node.children.length > 0 && !isDropdownOpen ? (
            <i
              className="fa-solid fa-caret-right"
              style={{ marginLeft: "10px" }}
            ></i>
          ) : (
            ""
          )}
          {node.children.length === 0 && !isDropdownOpen ? (
            <i className="fa" style={{ marginLeft: "17px" }}></i>
          ) : (
            ""
          )}
        </span>
        {node.title} &emsp;{" "}
        {readOnly ? (
          <></>
        ) : (
          <>
            <i
              className="fa-solid fa-trash"
              style={{ color: "grey" }}
              onClick={() => onDelete(node.key)}
            ></i>
            &emsp;
            <i
              className="fas fa-edit"
              style={{ color: "dark grey" }}
              onClick={() => setEditing(true)}
            ></i>
          </>
        )}
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
                onEditNode={onEditNode}
                dragEnabled={dragEnabled}
                readOnly={readOnly}
              />
            ))}
        </div>
      )}
    </div>
  );
};

const Tree = ({
  data,
  onDragStart,
  onDragOver,
  onDrop,
  onDeleteNode,
  onEditNode,
  dragEnabled,
  readOnly,
}) => {
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
          onEditNode={onEditNode}
          dragEnabled={dragEnabled}
          readOnly={readOnly}
        />
      ))}
    </div>
  );
};

const removeNode = (nodes, targetKey) => {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].key === targetKey) {
      nodes.splice(i, 1);
      return true;
    }
    if (nodes[i].children && nodes[i].children.length > 0) {
      const nodeRemoved = removeNode(nodes[i].children, targetKey);
      if (nodeRemoved) return true;
    }
  }
  return false;
};

export default Tree;
