import React, { useState } from "react";
import Tree from "./Tree";
import { useEffect } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [newNodeTitle, setNewNodeTitle] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch("http://localhost:3000/nodes");
    const nodes = await response.json();
    setData(nodes);
  };

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
        dragEnabled={false}
        readOnly={true}
      />
    </div>
  );
};

export default App;
