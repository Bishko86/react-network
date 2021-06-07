import React, { PureComponent } from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getUserStatus, savePhoto, saveProfile, setUserStatus } from '../Durax/ProfileReducer/profile-reducer';
import { addLike, addPost, closeModalError, deletePost } from '../Durax/ProfileReducer/profile-action-creators';
import { withRouter } from 'react-router';
import { withAuthRedirect } from './../../hoc/WithAuthRedirect'
import { compose } from 'redux';
import { getUserPhotos, getErrResponse, getPosts, getProfile, getStatus, isLoggedUser } from '../Durax/ProfileReducer/profile-selectors'

class ProfileContainer extends PureComponent {

    refreshProfile = () => {
        let userId = +this.props.match.params.userId;
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
    componentDidUpdate(prevProps) {
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
const mapStateToProps = (state) => {
    return {
        posts: getPosts(state),
        profile: getProfile(state),
        photos: getUserPhotos(state),
        status: getStatus(state),
        httpError: getErrResponse(state),
        loggedUserId: isLoggedUser(state),
    }
}
const ProfileContainerBlock = compose(connect(mapStateToProps, { addPost, addLike, getUserProfile, getUserStatus, setUserStatus, savePhoto, saveProfile, closeModalError, deletePost }), withRouter, withAuthRedirect)(ProfileContainer)

export default ProfileContainerBlock;