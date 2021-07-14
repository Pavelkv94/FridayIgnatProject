import React, {ChangeEvent} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

type UpdateItemPT = {
    callback: (title: string) => void
    value: string
    disabled: boolean
}

export function UpdateItem(props: UpdateItemPT) {
    const [open, setOpen] = React.useState(false);
    let [title, setTitle] = React.useState(props.value);
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
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
            {props.disabled ?
                <Button size="small" variant="outlined" color="primary" onClick={handleClickOpen} disabled>
                    Update
                </Button> : <Button size="small" variant="outlined" color="primary" onClick={handleClickOpen}>
                    Update
                </Button>}
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