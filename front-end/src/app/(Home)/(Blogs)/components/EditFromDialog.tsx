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

export default function AddFormDialog(props: IProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (reason: string) => {
    if (reason === "backdropClick") setOpen(true);
  };

  const { blog } = props;

  return (
    <React.Fragment>
      <Button
        className="m-2 bg-yellow-300 text-slate-200"
        onClick={handleClickOpen}
      >
        Edit
      </Button>
      <Dialog
        fullWidth
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            if (!loading) {
              setLoading(true);
              await fetch(`http://localhost:8000/blogs/${blog.id}`, {
                method: "PUT",
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
        <DialogTitle>Edit A Blog</DialogTitle>
        <DialogContent>
          <DialogContentText className="py-5">
            This is the from that allows users to add a new blog.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title Blog"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={blog.title}
            disabled={loading}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="author"
            name="author"
            label="Author Blog"
            type="text"
            fullWidth
            variant="outlined"
            disabled={loading}
            defaultValue={blog.author}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="content"
            name="content"
            label="Content Blog"
            type="text"
            fullWidth
            variant="outlined"
            disabled={loading}
            defaultValue={blog.content}
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button disabled={loading} type="submit">
            Save
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: yellow[500],
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
