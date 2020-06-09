import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

const styles = () => ({
    cardFrame: {
        border: '1px solid #00868b',
        borderRadius: '20px',
        margin: '15px auto',
        maxWidth: '750px',
        maxHeight: '400px',
        backgroundColor: '#00868b',
    },
    title: {
        textAlign: 'center',
        color: 'white',
        fontSize: '20px',
        margin: '10px 0 10px 0',
    },
    subBackground: {
        backgroundColor: 'white',
        borderRadius: '19px',
        padding: '15px',
        textAlign: 'center',
        maxHeight: '300px',
        overflow: 'auto',
    },
});

class CompletedFeedback extends Component {

    componentDidMount() {
        const arr = window.location.hash.split('/');
        let id;
        if (this.props.useOrgId) {
            id = this.props.reduxState.user.org_id
        } else {
            id = this.props.id || arr[arr.length - 1] === '' ? arr[arr.length - 2] : arr[arr.length - 1];
        }
        this.props.dispatch({ type: 'FETCH_PARTICIPATION', payload: id });
    }

    render() {
        let employees = this.props.reduxState.participationReducer.filter(employee => employee.email !== null);
        let uncompleted = employees.filter(employee => Number(employee.count) === 0);
        const { classes } = this.props;
        return (
            <>
            {
                employees.length > 0 ?
                <div className={classes.margin}>
                    {/*Iterates through total employees in organization, checks those who have completed their surveys and subtracts it from the total*/}
                    <div className={classes.cardFrame}>
                        <div className={classes.title}>
                            {employees.length - uncompleted.length}/{employees.length} {this.props.reduxState.adminMainReducer.name} employees have completed their survey
                        </div>
                        <div className={classes.subBackground}>
                            {
                                uncompleted.map(employee => (
                                    <div key={employee.email}>
                                        {employee.email}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div >
                : null
            }
            </>
        );
    }
}

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(withStyles(styles)(CompletedFeedback));