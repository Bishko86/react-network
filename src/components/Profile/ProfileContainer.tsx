import React, { PureComponent } from 'react';
import Profile from './Profile';
import { connect, ConnectedProps } from 'react-redux';
import { getUserProfile, getUserStatus, savePhoto, saveProfile, setUserStatus } from '../Durax/ProfileReducer/profile-reducer';
import { addLike, addPost, closeModalError, deletePost } from '../Durax/ProfileReducer/profile-action-creators';
import { withRouter, RouteComponentProps } from 'react-router';
import { withAuthRedirect } from '../../hoc/WithAuthRedirect'
import { compose } from 'redux';
import { getUserPhotos, getErrResponse, getPosts, getProfile, getStatus, isLoggedUser } from '../Durax/ProfileReducer/profile-selectors'
import { AppStateType } from '../Durax/redux-store';

const dispatchActions = {
    addPost: addPost,
    addLike: addLike,
    getUserProfile: getUserProfile,
    getUserStatus: getUserStatus,
    setUserStatus: setUserStatus,
    savePhoto: savePhoto,
    saveProfile: saveProfile,
    closeModalError: closeModalError,
    deletePost: deletePost
}
const mapStateToProps = (state: AppStateType) => {
    return {
        posts: getPosts(state),
        profile: getProfile(state),
        photos: getUserPhotos(state),
        status: getStatus(state),
        httpError: getErrResponse(state),
        loggedUserId: isLoggedUser(state),
    }
}
const connector = connect(mapStateToProps, {
    addPost,
    addLike,
    getUserProfile,
    getUserStatus,
    setUserStatus,
    savePhoto,
    saveProfile,
    closeModalError,
    deletePost
})
type OwnPropsType = { isOwner: boolean };
type TParams = { userId: string };

type PropsFromRedux = ConnectedProps<typeof connector>
export type PropsType = PropsFromRedux & RouteComponentProps<TParams> & OwnPropsType


// export type PropsType = ReturnType<typeof mapStateToProps> & typeof dispatchActions & RouteComponentProps<TParams> & OwnerPropsType;

class ProfileContainer extends React.Component<PropsType>{
    constructor(props: PropsType) {
        super(props);
    }
    refreshProfile = () => {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.loggedUserId;
        }
        if (!this.props.profile || this.props.profile.userId !== userId) {
            this.props.getUserProfile(userId);
            this.props.getUserStatus(userId);
        }
    }
    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps: any) {
        if (+this.props.match.params.userId !== prevProps.match.params.userId) { this.refreshProfile() }

    }
    render() {
        return (<Profile
            isOwner={!this.props.match.params.userId}
            savePhoto={this.props.savePhoto}
            profile={this.props.profile}
            setUserStatus={this.props.setUserStatus}
            status={this.props.status}
            addLike={this.props.addLike}
            addPost={this.props.addPost}
            posts={this.props.posts}
            saveProfile={this.props.saveProfile}
            httpError={this.props.httpError}
            closeModalError={this.props.closeModalError}
            deletePost={this.props.deletePost}
            photos={this.props.photos} />)
    }
}

const ProfileContainerBlock = compose(connector, withRouter, withAuthRedirect)(ProfileContainer)

export default ProfileContainerBlock;