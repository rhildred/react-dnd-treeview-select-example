import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { ThemeProvider, CssBaseline, Grid } from "@mui/material";
import {
  Tree,
  MultiBackend,
  getBackendOptions
} from "@minoru/react-dnd-treeview";
import { CustomNode } from "./CustomNode";
import { CustomDragPreview } from "./CustomDragPreview";
import { theme } from "./theme";
import styles from "./CustomNode.module.css";
import SampleData from "./sample_data.json";

function App() {
  const [treeData, setTreeData] = useState(SampleData);
  const handleDrop = (newTree) => setTreeData(newTree);
  const [selectedNode, setSelectedNode] = useState(null);
  const handleSelect = (node) => setSelectedNode(node);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <div className={styles.app}>
          <Grid container spacing={2}>
            <Grid item md={8} xs={12}>
              <Tree
                tree={treeData}
                rootId={0}
                render={(node, { depth, isOpen, onToggle }) => (
                  <CustomNode
                    node={node}
                    depth={depth}
                    isOpen={isOpen}
                    isSelected={node.id === selectedNode?.id}
                    onToggle={onToggle}
                    onSelect={handleSelect}
                  />
                )}
                dragPreviewRender={(monitorProps) => (
                  <CustomDragPreview monitorProps={monitorProps} />
                )}
                onDrop={handleDrop}
                classes={{
                  draggingSource: styles.draggingSource,
                  dropTarget: styles.dropTarget
                }}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <p>
                Current node:{" "}
                <span className={styles.currentLabel}>
                  {selectedNode ? selectedNode.text : "none"}
                </span>
              </p>
            </Grid>
          </Grid>
        </div>
      </DndProvider>
    </ThemeProvider>
  );
}

export default App;
