import React, { useState } from "react";
import { useEffect } from "react";
import { FaSortDown, FaCaretRight } from "react-icons/fa";

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
      id={node.title}
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
              <button id="editingNode" onClick={handleEditSave}>
                Save
              </button>
            </div>
          ) : (
            ""
          )}
          {node.children.length > 0 && isDropdownOpen ? (
            // <i
            //   className="fa-solid fa-caret-down"
            //   style={{ marginLeft: "10px" }}
            // ></i>
            <FaSortDown style={{ marginLeft: "10px" }} />
          ) : (
            // <i
            //   className="fa-solid fa-caret-right"
            //   style={{ marginLeft: "10px" }}
            // ></i>
            ""
          )}
          {node.children.length > 0 && !isDropdownOpen ? (
            // <i
            //   className="fa-solid fa-caret-right"
            //   style={{ marginLeft: "10px" }}
            // ></i>
            <FaCaretRight style={{ marginLeft: "10px" }} />
          ) : (
            ""
          )}
          {node.children.length === 0 ? (
            <i className="fa" style={{ marginLeft: "24px" }}></i>
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
              id={node.id+"del"}
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
              id={node.id+"edit"}
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
                key={child.id}
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
  addRef,
  fetchNodesUrl,
  addNodeUrl,
  reOrderNodeUrl,
  deleteNodeUrl,
  editNodeUrl,
  dragEnabled,
  readOnly,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchNodes();
  }, []);

  const fetchNodes = async () => {
    try {
      const response = await fetch(fetchNodesUrl);
      const nodes = await response.json();
      setData(nodes);
    } catch (error) {
      console.log(error);
    }
  };

  // const addNode = async (title) => {
  //   try {
  //     await fetch(addNodeUrl, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ title: title }),
  //     });
  //     fetchNodes();
  //   } catch (error) {
  //     console.log(error);
  //     if (error.response.status === 400) {
  //       alert("Duplicate entry");
  //     }
  //   }
  // };

  const addNode = async (title) => {
    try {
      const result = await fetch(addNodeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title }),
      });
      if (result.status === 400) {
        alert("Duplicate entry");
      }
      fetchNodes();
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    addRef.current = { addNodeFn: addNode };
  }, [addNode]);

  // DRAG START

  var isDragging = false;

  const handleDragStart = (draggedNode, e) => {
    if (isDragging) {
      return;
    }

    e.dataTransfer.setData("text/plain", JSON.stringify(draggedNode));
    isDragging = true;
  };

  const handleDragOver = (targetNode, e) => {
    e.preventDefault();
  };

  const handleDrop = async (targetNode, e) => {
    e.preventDefault();

    const draggedNode = JSON.parse(e.dataTransfer.getData("text/plain"));
    console.log(draggedNode);
    console.log(targetNode);

    try {
      await fetch(reOrderNodeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: draggedNode.id,
          parentId: targetNode.id,
        }),
      });
      fetchNodes();
    } catch (error) {
      console.log(error);
      alert("Error rearranging nodes");
    }
  };

  // DRAG END

  // DELETE START

  const removeNode = (nodes, target) => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === target) {
        nodes.splice(i, 1);
        setData(nodes);
        return true;
      }
      if (nodes[i].children && nodes[i].children.length > 0) {
        const nodeRemoved = removeNode(nodes[i].children, target);
        if (nodeRemoved) {
          setData(nodes);
          return true;
        }
      }
    }
    return false;
  };

  const onDeleteNode = async (node) => {
    const nodeToDelete = { ...node };
    try {
      await fetch(deleteNodeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nodeToDelete),
      });
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  };

  // DELETE END

  // EDIT START

  const editNode = (nodes, id, newTitle) => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === id) {
        nodes[i].title = newTitle;
        setData(nodes);
        return true;
      }
      if (nodes[i].children && nodes[i].children.length > 0) {
        const nodeEdited = editNode(nodes[i].children, id, newTitle);
        if (nodeEdited) {
          setData(nodes);
          return true;
        }
      }
    }
    return false;
  };

  const onEditNode = async (node, newTitle) => {
    const editedNode = { ...node };
    try {
      editedNode.title = newTitle;
      await fetch(editNodeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedNode),
      });
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  };

  // EDIT END

  return (
    <div>
      {data.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDelete={onDeleteNode}
          onDeleteError={() => alert("Error deleting node")}
          removeNode={(node) => removeNode([...data], node.id)}
          onEditNode={onEditNode}
          onEditNodeError={() => alert("Error editing node")}
          editNode={(node, newTitle) => editNode([...data], node.id, newTitle)}
          dragEnabled={dragEnabled}
          readOnly={readOnly}
        />
      ))}
    </div>
  );
};

export default Tree;
