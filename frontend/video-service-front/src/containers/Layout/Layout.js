import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import FilterOptions from '../../components/Navigation/FilterOptions/FilterOptions';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import NotifiactionContainer from '../../components/Notification/NotifiactionContainer';
import NotificationToast from '../../components/Notification/NotificationToast/NotificationToast';
import Auth from '../Auth/Auth';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';

import './Layout.css';
import { updateObject, mapNotificationToasts } from '../../shared/utility';

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        isLoading: state.auth.loading || state.video.pendingRequests > 0,
        userData: state.profile.data,
        categories: state.video.categories,
        notifications: state.notification.notifications,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserData: (userId, token) => dispatch(actions.profileFetchData(userId, token)),
        fetchVideosInfo: (endpoint, options) => dispatch(actions.videoFetchInfo(endpoint, options)),
        fetchCategoreis: () => dispatch(actions.videoFetchCategoreis()),
        closeNotification: (key) => dispatch(actions.notificationClose(key)),
        closeNotifications: () => dispatch(actions.notificationCloseAll()),
    };
};

class Layout extends Component {
    state = {
        showSideDrawer: false,
        showAuthModal: false,
        showFilterOptions: false,
        filterOptions: {
            'Sort' : {
                options: [
                    { title: 'Upload date', disabled: false,},
                    { title: 'Most likes', disabled: false,},
                    { title: 'Popularity', disabled: true,},
                ],
                value: null, 
                type: 'radio',
            },
            'Type': {
                options: [
                    { title: 'Video', disabled: true,},
                    { title: 'User', disabled: true,},
                    { title: 'Playlist', disabled: true,},
                ],
                value: null,
                type: 'radio'
            },
        },
        currentVideoCategory: 'Any',
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    };

    sideDrawerCloseHandler = () => {
        this.setState( { showSideDrawer: false });
    };

    authModalToggleHandler = () => {
        this.setState( (prevState)  => {
            return { showAuthModal: !prevState.showAuthModal };
        });
    };

    filterOptionsToggleHandler = () => {
        this.setState( (prevState)  => {
            return { showFilterOptions: !prevState.showFilterOptions };
        });
    };

    filterOptionCheckHandler = (value) => {
        //console.log(value);
        const updatedFilters = updateObject(this.state.filterOptions, {
            [value.category]: updateObject(this.state.filterOptions[value.category], {
                value: value.title,
            }),
        });
        //console.log(updatedFilters);
        this.setState({ filterOptions: updatedFilters });
    };

    categoryChangeHandler = (event) => {
        //console.log(event.target.value);
        this.setState({ currentVideoCategory: event.target.value});
        //console.log(this.state.currentVideoCategory);
    };

    clearFiltersHandler = () => {
        const updatedState = this.state;
        const filters = updatedState.filterOptions;
        for (const category of Object.keys(filters)){
            filters[category].value = null;
        }
        updatedState.currentVideoCategory = 'Any';
        this.setState({ updatedState });
    };

    searchHandler = (event) => {
        if (event.key == 'Enter'){
            const checkedOptions = [];
            const filters = this.state.filterOptions;
            for (const category of Object.keys(filters)){
                const filterValue = filters[category].value;
                if (filterValue) checkedOptions.push({
                    category: category,
                    option: filterValue,
                });
            }

            const currentCategory = this.state.currentVideoCategory;
            //console.log(currentCategory);
            if (currentCategory)
                checkedOptions.push({
                    category: 'Category',
                    option: currentCategory,
                });

            this.props.fetchVideosInfo('info/filter', {
                videoName: event.target.value,
                filters: checkedOptions,
            });
        }
    };

    componentDidMount() {
        /*this.props.fetchUserData( 
            localStorage.getItem('userId'),
            localStorage.getItem('token'));
        this.props.fetchCategoreis();*/
    }

    notificationToastClickHandler = (event, key) => {
        this.props.closeNotification(key);
    };

    render() {
        if (this.props.isLoading){
           //return <LoadingSpinner />
        }

        let notifications = mapNotificationToasts(
            this.props.notifications,
            NotificationToast,
            this.notificationToastClickHandler);

        return(
            <div>
                <Toolbar 
                    isAuthenticated={this.props.isAuthenticated}
                    userName={this.props.userData.name}
                    searchHandler={this.searchHandler}
                    filterOptionsClicked={this.filterOptionsToggleHandler}
                    drawerToggleClicked={this.sideDrawerToggleHandler} 
                    authModalRequested={this.authModalToggleHandler}/>
                <FilterOptions 
                    filtersData={this.state.filterOptions}
                    videoCategories={this.props.categories}
                    currentVideoCategory={this.props.currentVideoCategory}
                    checkHandler={this.filterOptionCheckHandler}
                    clearFiltersHandler={this.clearFiltersHandler}
                    categoryChangeHandler={this.categoryChangeHandler}
                    show={this.state.showFilterOptions}/>
                <SideDrawer 
                    isAuthenticated={this.props.isAuthenticated}
                    isOpen={this.state.showSideDrawer}
                    close={this.sideDrawerCloseHandler}
                    userType={this.props.userData.type}/>
                <main>
                    <NotifiactionContainer toasts={notifications}/> 
                    <Auth 
                        show={this.state.showAuthModal}
                        hide={this.authModalToggleHandler}/>
                    
                    {this.props.children}

                </main>
            </div>
        );
    };
};



export default connect( mapStateToProps, mapDispatchToProps ) ( Layout );