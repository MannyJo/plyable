import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import securityLevel from '../../constants/securityLevel';
import EditDialog from './EditDialog';
import DeactivateDialog from './DeactivateDialog';
/*----Material UI---*/
import {
    Table, TableBody, TableCell, TableHead, TableRow, TablePagination,
    Paper, Typography, TextField, withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Edit from '@material-ui/icons/Edit';
import Remove from '@material-ui/icons/Remove';
import Send from '@material-ui/icons/Send';
import Add from '@material-ui/icons/Add';
/*----Material UI---*/

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#00868b',
        color: theme.palette.common.white,
        fontSize: 24,
        textAlign: 'center',
        padding: 10,
        '&:last-child' : {
            padding: 10
        },
        border: 'none',
    },
    body: {
        fontSize: 20,
        textTransform: 'upperCase',
        textAlign: 'center',
        padding: 10,
        '&:last-child' : {
            padding: 10
        },
        border: 'none',
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    buttons: {
        background: '#00868b',
        borderRadius: 15,
        border: 0,
        color: 'white',
        height: 30,
        padding: '0 10px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        margin: '5px',
        '&:hover': {
            background: 'rgba(0, 133, 139, .7)',
        }
    },
    secButtons: {
        background: '#EC407A',
        borderRadius: 15,
        border: 0,
        color: 'white',
        height: 30,
        padding: '0 10px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        margin: '5px',
        '&:hover': {
            background: 'rgba(236, 65, 121, .7)',
        }
    },
    label: {
        textTransform: 'capitalize',
        fontSize: 14,
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    margin: {
        margin: 15
    },
    adminWelcome: {
        width: '100%',
        textAlign: 'center',
    },
    addButtonDiv: {
        float: 'right',
        lineHeight: '30px',
    },
    normalCell: {
        fontSize: '15px',
    },
});


class AdminMain extends Component {
    state = {
        emailList: '',
        org_id: 0,
        deactivateDialog: false,
        addManager: false,
        editDialog: false,
        organization: {},
        orgName: '',
        page: 0,
        rowsPerPage: 6,
    }

    //this will fetch all organizations from the database upon page load
    componentDidMount() {
        if (this.props.reduxState.user.security_level !== securityLevel.ADMIN_ROLE) {
            this.props.history.push('/main');
        } else {
            this.props.dispatch({ type: 'FETCH_ORGANIZATIONS', payload: this.props.reduxState.adminMainReducer })
        }
    }

    //this button will take the admin to a form to add a new organization
    handleAddNewOrganizationClick = () => {
        this.props.history.push('/adminmain/createneworganization');
    }

    //this button will take the admin to an organization-specific admin page
    handleViewOrgClick = (id) => {
        this.props.history.push(`/adminmain/organization/${id}`);
    }

    //this button will deactivate the organization, thereby stop the collection of data, but the data will still be viewable
    handleDeactivateClick = (org_id) => {
        this.setState({ deactivateDialog: true, org_id: org_id }); // open dialog box
    }

    handleDeactivateConfirm = (org_id) => {
        this.props.dispatch({ type: 'DEACTIVATE_ORGANIZATION', payload: org_id });
        this.setState({ ...this.state, deactivateDialog: false });
        //this will dispatch an action type which triggers a SnackBar alert
        this.props.dispatch({ type: 'CONFIRM_DEACTIVATE_SNACKBAR' }); 
    }

    handleCancelDeactivate = () => {
        this.setState({ ...this.state, deactivateDialog: false });
    }

    // show edit dialog and store organization's name in state
    handleEditOrgClick = organization => () => {
        this.setState({
            org_id: organization.id,
            orgName: organization.name,
            editDialog: true
        });
    }

    // change orgName in state
    handleChangeOrgName = event => {
        this.setState({ orgName: event.target.value });
    }

    // close dialog when cancel button is clicked
    handleEditCancelClick = () => {
        this.setState({ editDialog: false });
    }

    // close dialog and update organization name
    handleUpdateOrgClick = () => {
        this.setState({ editDialog: false });
        this.props.dispatch({
            type: 'UPDATE_ORGANIZATION',
            payload: {
                id: this.state.org_id,
                name: this.state.orgName,
            }
        });
    }

    //this is the same code for adding employees
    handleAddManagers = id => () => {
        this.setState({
            ...this.state,
            org_id: id,
            addManager: true
        });
    }

    handleCancelAddManager = () => {
        this.setState({
            ...this.state,
            emailList: '',
            org_id: 0,
            addManager: false
        });
    }

    sendInvitationEmails = () => {
        let splitList = this.state.emailList.split('\n'); // creates comma separate array  
        this.props.dispatch({ type: 'ADD_EMPLOYEES', payload: { ...this.state, emailList: splitList } });
        this.handleCancelAddManager();
    }

    //currying for adding emails
    handleChange = event => {
        this.setState({
            ...this.state,
            emailList: event.target.value,
        });
    }

    //pagination
    handleChangeRowsPerPage = event => {
        this.setState({
            ...this.state,
            rowsPerPage: event.target.value
        });
    }

    //pagination
    handleChangePage = (event, page) => {
        this.setState({
            ...this.state,
            page,
        });
    }

    addManagerData = () => {
        this.setState({ emailList: "ridleydan31@gmail.com" });
    }

    render() {
        const { rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.reduxState.adminMainReducer.length - page * rowsPerPage);
        const { classes } = this.props;
        return (
            <div className={classes.margin}>
                <div className={classes.addButtonDiv}>
                    <Button color="primary" onClick={this.handleAddNewOrganizationClick}
                        classes={{
                            root: classes.buttons,
                            label: classes.label,
                        }}
                    >
                        <Add />
                    </Button>
                </div>
                <h1 className={classes.adminWelcome}>Welcome, {this.props.reduxState.user.email}!</h1>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>Organization Name</CustomTableCell>
                                <CustomTableCell>Update Information</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/*this for each loop will map through available organizations in the database and display them 
                            on the DOM in a table*/}
                            {this.props.reduxState.adminMainReducer.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(organization => (
                                    <TableRow hover key={organization.id} organization={organization}>
                                        <CustomTableCell 
                                            onClick={() => this.handleViewOrgClick(organization.id)}
                                        >
                                            {
                                                organization.collecting_data ?
                                                organization.name
                                                : organization.name + '(deactivated)'
                                            }
                                        </CustomTableCell>
                                        <CustomTableCell>
                                            <Button
                                                classes={{
                                                    root: classes.buttons,
                                                    label: classes.label,
                                                }}
                                                variant="contained"
                                                onClick={this.handleEditOrgClick(organization)}>
                                                <Edit />
                                            </Button>
                                            {
                                                organization.collecting_data ?
                                                <>
                                                    <Button
                                                        classes={{
                                                            root: classes.buttons,
                                                            label: classes.label,
                                                        }}
                                                        variant="contained"
                                                        onClick={this.handleAddManagers(organization.id)}
                                                    >
                                                        <Send />&nbsp;Add Manager
                                                    </Button>
                                                    <Button
                                                        classes={{
                                                            root: classes.secButtons,
                                                            label: classes.label,
                                                        }}
                                                        variant="contained"
                                                        onClick={() => this.handleDeactivateClick(organization.id)}>
                                                        <Remove />
                                                    </Button>
                                                </> :
                                                <></>
                                            }
                                        </CustomTableCell>
                                    </TableRow>
                                ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <CustomTableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Paper>
                <TablePagination
                    rowsPerPageOptions={[6, 12, 24]}
                    component="div"
                    count={this.props.reduxState.adminMainReducer.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
                
                <EditDialog
                    editDialog={this.state.editDialog}
                    orgName={this.state.orgName}
                    org_id={this.state.org_id}
                    handleChangeOrgName={this.handleChangeOrgName}
                    handleEditCancelClick={this.handleEditCancelClick}
                    handleUpdateOrgClick={this.handleUpdateOrgClick}
                />

                {/* Dialog box for deactivating */}
                <DeactivateDialog
                    deactivateDialog={this.state.deactivateDialog}
                    handleDeactivateConfirm={this.handleDeactivateConfirm}
                    org_id={this.state.org_id}
                    handleCancelDeactivate={this.handleCancelDeactivate}
                />

                {/* Dialog box for inviting managers */}
                <Dialog open={this.state.addManager}>
                    <DialogTitle onClick={this.addManagerData}>Add Managers</DialogTitle>
                    <DialogContent>
                        <Typography>1 email per line</Typography>
                        {/* Large Input Box */}
                        <TextField
                            id="outlined-multiline-static"
                            label="No Commas"
                            multiline
                            rows="4"
                            placeholder='Email Addresses'
                            className={classes.textField}
                            value={this.state.emailList}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.sendInvitationEmails}>Send Invitations</Button>
                        <Button color="secondary" onClick={this.handleCancelAddManager}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div >
        );
    }
}

AdminMain.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = reduxState => ({
    reduxState,
});

const adminMainRouter = withRouter(AdminMain);
const adminMainRouterStyles = connect(mapStateToProps)(adminMainRouter);

export default withStyles(styles)(adminMainRouterStyles);


