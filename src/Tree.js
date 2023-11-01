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
  onEditNodeError,
  editNode,
  dragEnabled,
  readOnly,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const [deletePending, setDeletePending] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(node.title);

  useEffect(() => {
    if (deletePending) {
      deleteNode();
    }
  }, [deletePending]);

  const deleteNode = async () => {
    if (isDropdownOpen) {
      toggleDropdown();
    }
    const result = await onDelete(node);
    if (result) {
      removeNode(node);
    } else {
      onDeleteError();
    }
  };

  const handleEditInputChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleEditSave = async () => {
    const result = await onEditNode(node, editedTitle);
    if (result) {
      editNode(node, editedTitle);
    } else {
      onEditNodeError();
    }
    setEditing(false);
  };

  return (
    <div
    id={node.id}
      draggable={dragEnabled && !deletePending && !isEditing}
      onDragStart={(e) => {
        console.log(node, "drag started");
        onDragStart(node, e);
      }}
      onDragOver={(e) => onDragOver(node, e)}
      onDrop={(e) => onDrop(node, e)}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <span
          onClick={() => {
            if (!deletePending && !isEditing) {
              toggleDropdown();
            }
          }}
          style={{ cursor: "pointer", marginRight: "10px" }}
        >
          {isEditing ? (
            <div>
              <input
              id="editNode"
                type="text"
                placeholder="New title"
                value={editedTitle}
                onChange={handleEditInputChange}
              />
              <button id="editingNode" onClick={handleEditSave}>Save</button>
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
          {node.children.length === 0 ? (
            <i className="fa" style={{ marginLeft: "17px" }}></i>
          
          ) : (
            ""
          )}
          &nbsp;
          {node.title}
        </span>
         &emsp;{" "}
        {readOnly ? (
          <></>
        ) : (
          <>
            <i
            id={node.key}
              className="fa-solid fa-trash"
              data-testid={node.id + "delete"}
              style={{ color: "grey" }}
              onClick={() => {
                if (!deletePending && !isEditing) {
                  setDeletePending(true);
                }
              }}
            ></i>
            &emsp;
            <i
            id={node.id}
              className="fas fa-edit"
              data-testid={node.id + "edit"}
              style={{ color: "dark grey" }}
              onClick={() => {
                if (!deletePending && !isEditing) {
                  if (isDropdownOpen) {
                    toggleDropdown();
                  }
                  setEditing(true);
                }
              }}
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
                onEditNodeError={onEditNodeError}
                editNode={editNode}
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
  onEditNodeError,
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

  const editNode = (nodes, key, newTitle) => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].key === key) {
        nodes[i].title = newTitle;
        setData(nodes);
        return true;
      }
      if (nodes[i].children && nodes[i].children.length > 0) {
        const nodeEdited = editNode(nodes[i].children);
        if (nodeEdited) {
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
          onEditNodeError={onEditNodeError}
          editNode={(node, newTitle) => editNode([...data], node.key, newTitle)}
          dragEnabled={dragEnabled}
          readOnly={readOnly}
        />
      ))}
    </div>
  );
};

export default Tree;
