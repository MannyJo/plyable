import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
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

const DeactivateDialog = props => {
    const { classes } = props;
    return (
        <Dialog open={props.deactivateDialog}>
            <DialogTitle className={classes.title}>
                <span className={classes.titleText}>Are you sure you want to deactivate this company?</span>
            </DialogTitle>
            <Button color="primary" onClick={() => props.handleDeactivateConfirm(props.org_id)}>Yes</Button>
            <Button color="secondary" onClick={props.handleCancelDeactivate}>No</Button>
        </Dialog>
    )
}

export default withStyles(styles)(DeactivateDialog);