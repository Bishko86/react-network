import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Dialogs from './Dialogs';
import { withAuthRedirect } from '../../hoc/WithAuthRedirect'
import { sendMessage } from '../Durax/dialog-reducer';
import { getUserPhotos } from '../Durax/ProfileReducer/profile-selectors'
import { withRouter } from 'react-router';
import { AppStateType } from '../Durax/redux-store';
import { compose } from 'redux';

type PropsFromRedux = ConnectedProps<typeof connector>
type PropsType = PropsFromRedux
class Protector extends React.Component<PropsType> {

    render() {
        return <Dialogs {...this.props} />
    }
}
const mapStateToProps = (state: AppStateType) => {
    return {
        dialogPage: state.dialogPage,
        photos: getUserPhotos(state)
    }
}

const connector = connect(
    mapStateToProps,
    { sendMessage }
)
const DialogContainer = compose(connector, withRouter, withAuthRedirect)(Protector);
export default DialogContainer;