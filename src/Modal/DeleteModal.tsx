import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type DeleteModalType = {
    disabled: boolean,
    callback: () => void
}

export const DeleteItem = React.memo((props: DeleteModalType) => {
    let [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const buttonCallback = () => {
        props.callback()
        setOpen(false)

    }
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {props.disabled ?
                <Button size="small" variant="outlined" color="primary" onClick={handleClickOpen} disabled>
                    Del
                </Button> : <Button size="small" variant="outlined" color="primary" onClick={handleClickOpen}>
                    Del
                </Button>}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you serious?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Quit
                    </Button>
                    <Button onClick={buttonCallback} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
})