import React, { useState } from "react";
import { useEffect } from "react";

const TreeNode = ({
  node,
  onDragStart,
  onDragOver,
  onDrop,
  onDelete,
  onDeleteError,
  removeNode,
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
              onClick={async () => {
                const result = await onDelete(node);
                if (result) {
                  removeNode(node);
                } else {
                  onDeleteError();
                }
              }}
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
                onDeleteError={onDeleteError}
                removeNode={removeNode}
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
  initialData,
  onDragStart,
  onDragOver,
  onDrop,
  onDeleteNode,
  onDeleteNodeError,
  onEditNode,
  dragEnabled,
  readOnly,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const removeNode = (nodes, targetKey) => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].key === targetKey) {
        nodes.splice(i, 1);
        setData(nodes);
        return true;
      }
      if (nodes[i].children && nodes[i].children.length > 0) {
        const nodeRemoved = removeNode(nodes[i].children, targetKey);
        if (nodeRemoved) {
          setData(nodes);
          return true;
        }
      }
    }
    return false;
  };

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
          onDeleteError={onDeleteNodeError}
          removeNode={(node) => removeNode([...data], node.key)}
          onEditNode={onEditNode}
          dragEnabled={dragEnabled}
          readOnly={readOnly}
        />
      ))}
    </div>
  );
};

export default Tree;
