import React, { PureComponent } from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { addLike, addPost, getUserProfile, getUserStatus, setUserStatus, savePhoto, saveProfile } from '../Durax/profile-reducer';
import { withRouter } from 'react-router';
import { withAuthRedirect } from './../../hoc/WithAuthRedirect'
import { compose } from 'redux';
import { render } from '@testing-library/react';

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
            saveProfile={this.props.saveProfile} />)
    }
}
const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        loggedUserId: state.auth.userId,
    }
}
const ProfileContainerBlock = compose(connect(mapStateToProps, { addPost, addLike, getUserProfile, getUserStatus, setUserStatus, savePhoto, saveProfile }), withRouter, withAuthRedirect)(ProfileContainer)

export default ProfileContainerBlock;