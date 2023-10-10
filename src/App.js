
import React, { useState } from "react";
import Tree from "./Tree";

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
      children: [],
    },
  ];
 
  const [data, setData] = useState(initialData);
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

  // Clone the current data state to avoid mutating the state directly
  const newData = [...data];

  // Remove the node with the specified key
  removeNode(newData, key);

  // Update the state with the new tree structure
  setData(newData);
  };
 
  var isDragging = false;

  const handleDragStart = (draggedNode, e) => {
    if (isDragging) {
      return;
    }
    // Store the dragged node for later use
    e.dataTransfer.setData("text/plain", JSON.stringify(draggedNode));
    isDragging = true;
  };

  const handleDragOver = (targetNode, e) => {
    // Prevent default behavior to allow drop
    e.preventDefault();
  };

  const handleDrop = (targetNode, e) => {
    // Prevent the default drop behavior
    e.preventDefault();

    // Get the dragged node data from the data transfer object
    const draggedNode = JSON.parse(e.dataTransfer.getData("text/plain"));
    console.log(draggedNode);

    // Clone the current data state to avoid mutating the state directly
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

    // Add the dragged node to the target node's children
    if (!targetNode.children) {
      targetNode.children = [];
    }

    targetNode.children.push(draggedNode);
    console.log(targetNode);

    // Update the state with the new tree structure
    setData(newData);
  };

  return (
    <div>
      <h1>Draggable Tree</h1><br></br>
      <Tree
        data={data}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDeleteNode={handleDeleteNode}
      />
    </div>
  );
};

export default App;
