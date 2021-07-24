import React, { ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';

type UpdateItemPT = {
    callback: (title: string, title2?: string) => void
    value: string
    // value2?: string
    disabled: boolean
}

export function UpdateItem(props: UpdateItemPT) {
    const [open, setOpen] = React.useState(false);
    let [title, setTitle] = React.useState(props.value);
    // let [title2, setTitle2] = React.useState(props.value2);
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    // const changeTitle2 = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle2(e.currentTarget.value)
    // }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickUPD = () => {
        props.callback(title)
        setOpen(false)
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton onClick={handleClickOpen} disabled={props.disabled}>
                <EditIcon />
            </IconButton>

            <Dialog open={open} onClose={handleClickUPD} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update pls</DialogTitle>
                <DialogContent>

                    <TextField
                        value={title}
                        onChange={changeTitle}
                        autoFocus
                        margin="dense"
                        id="name"
                        fullWidth
                    />
                    {/*{props.value2 && <TextField*/}
                    {/*    value={title2}*/}
                    {/*    onChange={changeTitle2}*/}
                    {/*    autoFocus*/}
                    {/*    margin="dense"*/}
                    {/*    id="name2"*/}
                    {/*    fullWidth*/}
                    {/*/>}*/}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClickUPD} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}