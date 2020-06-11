import React from 'react';
import {
    Typography, TextField, withStyles, Button, Dialog,
    DialogActions, DialogContent, DialogTitle
} from '@material-ui/core';

const styles = () => ({
    title: {
        textAlign: 'center',
        backgroundColor: '#00868b',
        padding: '15px',
    },
    titleText: {
        color: '#ffffff',
    },
    typography: {
        paddingTop: '15px',
    }
})

const AddManagerDialog = props => {
    const { classes } = props;
    return (
        <Dialog open={props.addManager}>
            <DialogTitle className={classes.title}>
                <span className={classes.titleText}>Add Managers</span>
            </DialogTitle>
            <DialogContent>
                <Typography variant="h6" className={classes.typography}>1 email per line</Typography>
                <TextField
                    id="outlined-multiline-static"
                    label="No Commas"
                    multiline
                    rows="4"
                    placeholder='Email Addresses'
                    className={classes.textField}
                    value={props.emailList}
                    onChange={props.handleChange}
                    margin="normal"
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={props.sendInvitationEmails}>Send Invitations</Button>
                <Button color="secondary" onClick={props.handleCancelAddManager}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default withStyles(styles)(AddManagerDialog);