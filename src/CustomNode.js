import React from "react";
import Typography from "@mui/material/Typography";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { TypeIcon } from "./TypeIcon";
import styles from "./CustomNode.module.css";


export const CustomNode = (props) => {
  const { droppable, data } = props.node;
  const indent = props.depth * 24;

  const handleToggle = (e) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const handleSelect = () => props.onSelect(props.node);

  return (
    <div
      className={`${styles.root} ${props.isSelected ? styles.isSelected : ""}`}
      style={{ paddingInlineStart: indent }}
      onClick={handleSelect}
    >
      <div className={`${styles.arrow} ${props.isOpen ? styles.isOpen : ""}`}>
        {props.node.droppable && (
          <div onClick={handleToggle}>
            <ArrowRightIcon />
          </div>
        )}
      </div>
      <div className={styles.filetype}>
        <TypeIcon droppable={droppable || false} fileType={data?.fileType} />
      </div>
      <div className={styles.label}>
        <Typography variant="body2">{props.node.text}</Typography>
      </div>
    </div>
  );
};
