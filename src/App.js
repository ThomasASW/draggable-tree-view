import React, { useState } from "react";
import Tree from "./Tree";
import { useEffect } from "react";
import axios from "axios";
const port = 4034;

const App = () => {
  const [data, setData] = useState([]);
  const [newNodeTitle, setNewNodeTitle] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:${port}/nodes`);
      const nodes = await response.data;
      setData(nodes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddNode = async () => {
    const newNode = {
      key: Date.now().toString(),
      title: newNodeTitle,
      children: [],
    };

    const title = data.find((data) => data.title === newNode.title);
    if (title) {
      alert("Please enter different name");
      setNewNodeTitle("");
    } else {
      axios
        .post(`http://localhost:${port}/nodes`, newNode)
        .then((res) => getData())
        .catch((e) => console.log(e));
    }

    setNewNodeTitle("");
  };

  const handleDeleteNode = async (node) => {
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

    const res = await clearDB(newData);
    if (!res) {
      return false;
    }

    removeNode(newData, node.key);

    const resu = await addToDB(newData);
    if (!resu) {
      return false;
    }

    return true;
  };

  const addToDB = async (newData) => {
    for (let i = 0; i < newData.length; i++) {
      const id = newData[i];
      try {
        await axios.post(`http://localhost:${port}/nodes`, id);
      } catch (error) {
        console.log(error);
        return false;
      }
    }
    return true;
  };

  const clearDB = async (newData) => {
    const ids = newData.map((item) => item.id);

    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      try {
        await axios.delete(`http://localhost:${port}/nodes` + id);
      } catch (error) {
        console.log(error);
        return false;
      }
    }
    return true;
  };

  const deleteNodeError = () => {
    alert("Error deleting node");
  };

  const editNodeError = () => {
    alert("Error editing node");
  };

  const handleEditNode = async (node, newTitle) => {
    const editNode = (nodes) => {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].key === node.key) {
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

    const res = await clearDB(newData);
    if (!res) {
      return false;
    }

    const resu = await addToDB(newData);
    if (!resu) {
      return false;
    }
    return true;
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
        initialData={data}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDeleteNode={handleDeleteNode}
        onDeleteNodeError={deleteNodeError}
        onEditNode={handleEditNode}
        onEditNodeError={editNodeError}
        dragEnabled={true}
        readOnly={false}
      />
    </div>
  );
};

export default App;
