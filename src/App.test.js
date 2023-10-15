import { render, screen } from "@testing-library/react";
import App from "./App";
import Tree from "./Tree";

const initialData = [
  {
    id: 1,
    key: "1",
    title: "Node 1",
    children: [
      {
        id: 2,
        key: "1-1",
        title: "Node 1.1",
        children: [],
      },
      {
        id: 3,
        key: "1-2",
        title: "Node 1.2",
        children: [],
      },
    ],
  },
  {
    key: "1697365467009",
    title: "Node 6",
    children: [],
    id: 2,
  },
];

const handleDeleteNode = jest.fn(async (node) => {
  console.log(node);
  return true;
});

const deleteNodeError = jest.fn(() => {
  console.log("Error deleting node");
});

const editNodeError = jest.fn(() => {
  console.log("Error editing node");
});

const handleEditNode = jest.fn(async (node, newTitle) => {
  console.log(node, newTitle);
  return true;
});

const handleDragStart = jest.fn((draggedNode, e) => {
  console.log(draggedNode);
});

const handleDrop = jest.fn((targetNode, e) => {
  e.preventDefault();

  console.log(targetNode);
});

const handleDragOver = jest.fn((targetNode, e) => {
  e.preventDefault();
});

test("render", () => {
  render(<App />);
  const text = screen.getByText("Draggable Tree");
  expect(text).toBeInTheDocument();
});

test("render tree", () => {
  render(
    <Tree
      initialData={initialData}
      dragEnabled={true}
      readOnly={false}
      onEditNode={handleEditNode}
      onEditNodeError={editNodeError}
      onDeleteNode={handleDeleteNode}
      onDeleteNodeError={deleteNodeError}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragStart={handleDragStart}
    />
  );
  const text = screen.getByText("Node 1");
  expect(text).toBeInTheDocument();
});
