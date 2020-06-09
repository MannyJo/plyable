import React, { Component } from 'react';
import { connect } from 'react-redux';
/*----Material UI----*/
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
/*----Material UI----*/

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        minHeight: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    margin:  {
        margin: 10
    },
    title: {
        textAlign: 'center',
        width: '100%',
        color: '#ffffff',
        fontSize: '20px',
        padding: '5px',
    },
    form: {
        maxWidth: '500px',
        margin: 'auto',
        backgroundColor: '#00868b',
        borderRadius: '20px',
        padding: '1px',
    },
    container: {
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        padding: '10px',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 'flex',
    },
    submitButton: {
        
    },
    label: {
        textTransform: 'capitalize',
        fontSize: 14,
        color: '#ffffff',
    },
    buttonDiv: {
        textAlign: 'center',
    },
});

class NewOrgForm extends Component {
    state = {
        newOrganization: {
            name: '',
        }
    }

    //currying function that can handle many inputs--currently only handling newOrganization.name
    handleChangeFor = propertyName => event => {
        this.setState({
            newOrganization: {
                ...this.state.newOrganization,
                [propertyName]: event.target.value
            }
        });
    }

    handleOrgSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_NEW_ORGANIZATION', payload: this.state.newOrganization }) //upon submit, action sends info to newOrgSaga
        //spread operator holds former state, setState alters state to make a new organization
        this.setState({
            ...this.state.newOrganization,
            newOrganization: {
                name: '',
            }
        });
        //this will dispatch an action type which triggers a SnackBar alert
        this.props.dispatch({ type: 'ADD_NEW_ORGANIZATION_SNACKBAR' });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.margin}>
                <form className={classes.form}>
                    <div className={classes.title}>Add a New Organization</div>
                    <FormControl className={classes.container} noValidate autoComplete="off">
                        <TextField
                            id="standard-name"
                            label="New Organization"
                            className={classes.textField}
                            value={this.state.newOrganization.name}
                            onChange={this.handleChangeFor('name')}
                            margin="normal"
                        />
                    </FormControl>
                    <div className={classes.buttonDiv}>
                        <Button 
                            classes={{
                                label: classes.label,
                            }}
                            onClick={this.handleOrgSubmit} 
                            type="submit" 
                            value="Submit" 
                            color="primary"
                        >Submit</Button>
                    </div>
                </form>
            </div >
        );
    }
}

NewOrgForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = reduxState => ({
    reduxState,
});

const newOrgFormStyles = withStyles(styles)(NewOrgForm)

export default connect(mapStateToProps)(newOrgFormStyles);

