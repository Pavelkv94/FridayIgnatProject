import React, {ChangeEvent} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

type AddItemPT = {
    callback: (title: string, title2?: string) => void
    disabled?: boolean
    id?: number
}

export function AddedItem(props: AddItemPT) {
    const [open, setOpen] = React.useState(false);
    let [title, setTitle] = React.useState("");
    let [title2, setTitle2] = React.useState("");
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const changeTitle2 = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle2(e.currentTarget.value)
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickUPD = () => {
        props.callback(title, title2)
        setOpen(false)
        setTitle("")
        setTitle2("")
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {props.disabled ?
                <Button size="small" variant="outlined" color="primary" onClick={handleClickOpen} disabled>
                    Add
                </Button> : <Button size="small" variant="outlined" color="primary" onClick={handleClickOpen}>
                    Add
                </Button>}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">add</DialogTitle>
                <DialogContent>
                    {props.id? "Question" : "PackName"}
                    <TextField
                        value={title}
                        onChange={changeTitle}
                        autoFocus
                        margin="dense"
                        id="name"
                        fullWidth
                    />
                </DialogContent>
                {props.id && <DialogContent>
                    Answer
                    < TextField
                        value={title2}
                        onChange={changeTitle2}
                        autoFocus
                        margin="dense"
                        id="name2"
                        fullWidth
                    />
                </DialogContent>}

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClickUPD} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}