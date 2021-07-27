import React, { ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SuperButton from '../SuperComponents/c2-SuperButton/SuperButton';

type AddItemPT = {
    title: string
    callback: (title: string, title2?: string) => void
    disabled?: boolean
    id?: number
}

export const AddedItem = React.memo((props: AddItemPT) => {

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
            <SuperButton style={{ width: "174px" }} onClick={handleClickOpen} disabled={props.disabled}>{props.title}</SuperButton>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">add</DialogTitle>
                <DialogContent>
                    {props.id ? "Question" : "PackName"}
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
})