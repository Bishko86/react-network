import React from 'react';
import { connect } from 'react-redux';
import Dialogs from './Dialogs';
import { withAuthRedirect } from './../../hoc/WithAuthRedirect'
import { sendMessage } from '../Durax/dialog-reducer';

import { withRouter } from 'react-router';

class Protector extends React.Component {

    render() {
        return <Dialogs {...this.props} />
    }
}
const mapStateToProps = (state) => {
    return {
        dialogPage: state.dialogPage,
    }
}
const AuthRedirectComponent = withAuthRedirect(Protector);
const RouteData = withRouter(AuthRedirectComponent)


const DialogContainer = connect(
    mapStateToProps,
    { sendMessage }
)(RouteData);
export default DialogContainer;