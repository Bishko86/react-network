import React from 'react';
import {
    follow, unFollow, getUsersThunkCreator
} from '../Durax/UserReducer/users-reducer';
import { setCurrentPage } from './../Durax/UserReducer/user-action-creator'
import { connect, ConnectedProps } from 'react-redux';
import Users from './Users';
import Preloader from '../../common/Preloader';
import { withAuthRedirect } from '../../hoc/WithAuthRedirect'
import { compose } from 'redux';
import { getUsers, followingInProgress } from '../Durax/UserReducer/users-selectors'
import PaginationPage from '../../common/Pagination';
import { AppStateType } from './../Durax/redux-store'

const mapStateToProps = (state: AppStateType) => {
    return {
        users: getUsers(state),
        allUsers: state.usersPage.allUsers,

        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: followingInProgress(state)
    }
}


const connector = connect(mapStateToProps, {
    follow, unFollow,
    setCurrentPage,
    getUsersThunkCreator
})

type PropsFromRedux = ConnectedProps<typeof connector>
type PropsType = PropsFromRedux

class UserContainer extends React.Component<PropsType> {
    constructor(props: PropsType) {
        super(props)
        this.clickPage = this.clickPage.bind(this)
        //     this.usersPages = this.usersPages.bind(this)
    }

    componentDidMount() {
        let size = this.props.pageSize;
        if (this.props.users.length === 0) {
            this.props.getUsersThunkCreator(1, size);
        }
    }

    clickPage(e: React.MouseEvent) {
        let page = +(e.target as Element).id;
        let size = this.props.pageSize;
        this.props.getUsersThunkCreator(page, size);
        this.props.setCurrentPage(page);
    }

    render() {
        return (<>
            {this.props.isFetching ? <Preloader from='user' /> : null}
            {/* <Paginator totalItemCount={100} pageSize={this.props.pageSize} currentPage={this.props.currentPage
            } portionSize={10} onPageChange={this.clickPage} /> */}

            <PaginationPage allUsers={this.props.allUsers} getUsers={this.props.getUsersThunkCreator} />

            {/* list  pages of users */}
            < Users
                followingInProgress={this.props.followingInProgress}
                users={this.props.users}
                unFollow={this.props.unFollow}
                follow={this.props.follow}
            />
        </>
        )
    }
}



export default compose(connector, withAuthRedirect)(UserContainer)
