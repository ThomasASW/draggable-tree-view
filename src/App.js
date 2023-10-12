import React, { useState } from "react";
// import Tree from "./Tree";

const App = () => {
  const initialData = [
    {
      key: "1",
      title: "Node 1",
      children: [
        {
          key: "1-1",
          title: "Node 1.1",
          children: [],
        },
        {
          key: "1-2",
          title: "Node 1.2",
          children: [],
        },
      ],
    },
    {
      key: "2",
      title: "Node 2",
      children: [
        {
          key: "2-1",
          title: "Node 2.1",
          children: [],
        },
        {
          key: "2-2",
          title: "Node 2.2",
          children: [],
        },
      ],
    },
    {
      key: "3",
      title: "Node 3",
      children: [],
    },
  ];

  const [data, setData] = useState(initialData);
  const [newNodeTitle, setNewNodeTitle] = useState("");

  const handleAddNode = () => {
    // Create a new node with a unique key (you can use a library like uuid to generate unique keys)
    const newNode = {
      key: Date.now().toString(),
      title: newNodeTitle,
      children: [],
    };

    // Update the data state to include the new node
    // for (let i = 0; i < data.length; i++) {
    const title = data.find((data) => data.title === newNode.title);
    if (title) {
      alert("Please enter different name");
      setNewNodeTitle("");
    } else {
      setData([...data, newNode]);
    }

    // Clear the input field after adding the node
    setNewNodeTitle("");
  };

  const handleDeleteNode = (key) => {
    //   console.log(`Deleting node with key: ${key}`);
    //   const updatedTreeData = data.filter((node) => node.key !== key);
    //   console.log(data);
    //   setData(updatedTreeData);
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

    const newData = [...data];

    // Remove the node with the specified key
    removeNode(newData, key);

    setData(newData);
  };
  const handleEditNode = (key, newTitle) => {
    const editNode = (nodes) => {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].key === key) {
          nodes[i].title = newTitle;
          return true;
        }
        if (nodes[i].children && nodes[i].children.length > 0) {
          const nodeEdited = editNode(nodes[i].children);
          if (nodeEdited) return true;
        }
      }
      return false;
    };

    const newData = [...data];
    editNode(newData);
    setData(newData);
  };

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

  const handleDrop = (targetNode, e) => {
    e.preventDefault();

    const draggedNode = JSON.parse(e.dataTransfer.getData("text/plain"));
    console.log(draggedNode);

    const newData = [...data];

    // Remove the dragged node from its original position
    const removeNode = (nodes, key) => {
      for (let i = 0; i < nodes.length; i++) {
        console.log(nodes[i]);
        console.log(key);
        if (nodes[i].key === key) {
          nodes.splice(i, 1);
          console.log(nodes);
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
    console.log(newData);

    if (!targetNode.children) {
      targetNode.children = [];
    }

    targetNode.children.push(draggedNode);
    console.log(targetNode);

    setData(newData);
  };

  return (
    <div>
      <h1>Draggable Tree</h1>
      <br></br>
      <div>
        <input
          type="text"
          value={newNodeTitle}
          onChange={(e) => setNewNodeTitle(e.target.value)}
          placeholder="Enter node title"
        />
        <button onClick={handleAddNode}>Add Node</button>
      </div>
      <Tree
        data={data}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDeleteNode={handleDeleteNode}
        onEditNode={handleEditNode}
      />
    </div>
  );
};
const TreeNode = ({
  node,
  onDragStart,
  onDragOver,
  onDrop,
  onDelete,
  onEditNode,
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
        />
      ))}
    </div>
  );
};
export default App;
