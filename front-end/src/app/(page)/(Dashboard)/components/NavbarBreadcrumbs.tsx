"use client";
import * as React from "react";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import Breadcrumbs, { breadcrumbsClasses } from "@mui/material/Breadcrumbs";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { usePathname } from "next/navigation";

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: theme.palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: "center",
  },
}));

export default function NavbarBreadcrumbs() {
  const pathname = usePathname();
  const [arrPathName, setArrPathName] = React.useState<string[]>([]);

  React.useEffect(() => {
    const subStrPathName = pathname.substr(11);
    const splitPathName = subStrPathName.split("/");
    setArrPathName(splitPathName);
  }, [pathname]);

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Typography variant="body1">Dashboard</Typography>
      {arrPathName.map((pathname, index) => {
        return (
          <Typography
            variant="body1"
            key={index}
            sx={{ color: "text.primary", fontWeight: 600 }}
          >
            {pathname ? pathname : "Home"}
          </Typography>
        );
      })}
    </StyledBreadcrumbs>
  );
}
