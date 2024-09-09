"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { mutate } from 'swr';

export default function AddFormDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        // mutate("http://localhost:8000/blogs")
        mutate("http://localhost:8000/blogs")
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button className="bg-green-500 text-slate-200" onClick={handleClickOpen}>Add new blog</Button>
            <Dialog
                fullWidth
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        await fetch('http://localhost:8000/blogs', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ title: formJson.title, author: formJson.author, content: formJson.content }),
                        });
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Add New Blog</DialogTitle>
                <DialogContent>
                    <DialogContentText className='py-5'>
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
                        multiline
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}