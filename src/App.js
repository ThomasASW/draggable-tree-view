import React, { useRef, useState } from "react";
import Tree from "./Tree";


const App = () => {
  const addRef = useRef(null);
  const [newNodeTitle, setNewNodeTitle] = useState("");

  const handleAddNode = async () => {
    addRef.current.addNodeFn(newNodeTitle);
    setNewNodeTitle("");
  };

  return (
    <div>
      <h1>Draggable Tree</h1>
      <br></br>
      <div>
        <input
          id="addNode"
          type="text"
          value={newNodeTitle}
          onChange={(e) => setNewNodeTitle(e.target.value)}
          placeholder="Enter node title"
        />
        <button id="addingNode" onClick={handleAddNode}>
          Add Node
        </button>
      </div>
      <Tree
        addRef={addRef}
        addNodeUrl="http://localhost:8080/api/add"
        fetchNodesUrl="http://localhost:8080/api/full"
        reOrderNodeUrl="http://localhost:8080/api/changeParent"
        deleteNodeUrl="http://localhost:8080/api/delete"
        editNodeUrl="http://localhost:8080/api/edit"
        dragEnabled={true}
        readOnly={false}
      />
    </div>
  );
};

export default App;
