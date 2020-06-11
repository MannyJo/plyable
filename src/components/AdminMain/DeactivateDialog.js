import React from 'react';
import { 
    withStyles, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography
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

const DeactivateDialog = props => {
    const { classes } = props;
    return (
        <Dialog open={props.deactivateDialog}>
            <DialogTitle className={classes.title}>
                <span className={classes.titleText}>Deactivate</span>
            </DialogTitle>
            <DialogContent>
                <Typography variant="h6" className={classes.typography}>Are you sure you want to deactivate this company?</Typography>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={() => props.handleDeactivateConfirm(props.org_id)}>Yes</Button>
                <Button color="secondary" onClick={props.handleCancelDeactivate}>No</Button>
            </DialogActions>
        </Dialog>
    )
}

export default withStyles(styles)(DeactivateDialog);