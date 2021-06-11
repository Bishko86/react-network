import React from 'react';
import Dialogs from './Dialogs';
import { sendMessage } from '../Durax/dialog-reducer';
import { withAuthRedirect } from '../../hoc/WithAuthRedirect';
import { AppStateType } from '../Durax/redux-store';
import { getUserPhotos } from '../Durax/ProfileReducer/profile-selectors';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'redux';

type TParams = { userId: string };
const mapStateToProps = (state: AppStateType) => {
    return {
        dialogPage: state.dialogPage,
        photos: getUserPhotos(state)
    }
}

const connector = connect(mapStateToProps, { sendMessage });

type PropsFromRedux = ConnectedProps<typeof connector>;
export type PropsType = PropsFromRedux & RouteComponentProps<TParams>;

class DialogContainer extends React.Component<PropsType> {

    render() {
        return <Dialogs {...this.props} />
    }
}



export default compose(connector, withRouter, withAuthRedirect)(DialogContainer);