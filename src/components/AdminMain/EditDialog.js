import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    title: {
        textAlign: 'center',
        backgroundColor: '#00868b',
        padding: '15px',
    },
    titleText: {
        color: '#ffffff',
    }
})

const EditDialog = props => {

    const { classes } = props;
    
    return (
        <Dialog open={props.editDialog}>
            <DialogTitle 
                className={classes.title}
            >
                <span className={classes.titleText}>Edit Organization</span>
            </DialogTitle>
            <DialogContent>
                <TextField
                    id="orgName"
                    label="Name"
                    value={props.orgName}
                    onChange={props.handleChangeOrgName}
                    margin="normal"
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button 
                    color="primary" 
                    onClick={props.handleUpdateOrgClick}
                >Update</Button>
                <Button 
                    color="secondary" 
                    onClick={props.handleEditCancelClick}
                >Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default withStyles(styles)(EditDialog);