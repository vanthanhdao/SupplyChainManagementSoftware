"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import { mutate } from "swr";
import { yellow } from "@mui/material/colors";

interface IProps {
  blog: IBlog;
}

export default function DeleteFromDialog(props: IProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { blog } = props;

  return (
    <React.Fragment>
      <Button
        onClick={() => setOpen(true)}
        className="m-2 bg-red-500 text-slate-200"
      >
        Delete
      </Button>
      <Dialog
        fullWidth
        disableEscapeKeyDown
        open={open}
        PaperProps={{
          component: "form",
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            if (!loading) {
              setLoading(true);
              await fetch(`http://localhost:8000/blogs/${blog.id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  title: formJson.title,
                  author: formJson.author,
                  content: formJson.content,
                }),
              });
            }
            setOpen(false);
            setLoading(false);
            //   mutate("http://localhost:8000/blogs")
            mutate("http://localhost:8000/blogs");
          },
        }}
      >
        <DialogTitle>Delete A Blog</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete the blog?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={() => setOpen(false)}>
            Disagree
          </Button>
          <Button disabled={loading} type="submit">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
