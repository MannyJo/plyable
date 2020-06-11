import React from 'react';
import { 
    withStyles, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle 
} from '@material-ui/core';

const styles = () => ({
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