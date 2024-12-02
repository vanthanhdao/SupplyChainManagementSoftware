import { Box, Link } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";

const ExpandableCell = ({ value }: GridRenderCellParams) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Box sx={{ p: 3 }}>
      {expanded ? value : value.slice(0, 200)}&nbsp;
      {value.length > 200 && (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link
          type="button"
          component="button"
          sx={{ fontSize: "inherit", letterSpacing: "inherit" }}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "View Less" : "View More"}
        </Link>
      )}
    </Box>
  );
};

export default ExpandableCell;
