import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import FilterOptions from '../../components/Navigation/FilterOptions/FilterOptions';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import NotifiactionContainer from '../../components/Notification/NotifiactionContainer';
import NotificationToast from '../../components/Notification/NotificationToast/NotificationToast';
import Auth from '../Auth/Auth';
import PlaylistForm from '../Profile/PlaylistForm/PlaylistForm';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';

import './Layout.css';
import { updateObject, mapNotificationToasts } from '../../shared/utility';

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        isLoading: state.auth.loading || state.profile.fetching,
        userData: state.profile.data,
        notifications: state.notification.notifications,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserData: (userId, token) => dispatch(actions.profileFetchData(userId, token)),
        fetchVideosInfo: (endpoint, options) => dispatch(actions.fetchVideoInfo(endpoint, options)),
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
                'Popularity': {
                    type: 'switch',
                    checked: false,    
                    disabled: true, 
                },
                'Upload date': {
                    type: 'switch',
                    checked: false,
                    disabled: false,
                }, 
                'Most likes': {
                    type: 'switch',
                    checked: false,
                    disabled: true,
                },
            },
            'Type': {
               'Video': {
                        type: 'checkbox',
                        checked: false,
                        disabled: true,
               },
                'User': {
                        type: 'checkbox',
                        checked: false,
                        disabled: true,
                },
                'Playlist': {
                        type: 'checkbox',
                        checked: false,
                        disabled: true,
                },
            },
        },
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

    filterOptionCheckHandler = (optionTitle, category) => {
        const isChecked = this.state.filterOptions[category][optionTitle].checked;
        const updatedFilters = updateObject(this.state.filterOptions, {
            [category]: updateObject(this.state.filterOptions[category], {
                [optionTitle]: updateObject(this.state.filterOptions[category][optionTitle], {
                    checked: !isChecked,
                })
            }),
        });

        if (!isChecked)
            for (const optionKey of Object.keys(updatedFilters[category])){
                const isOptionChecked = updatedFilters[category][optionKey].checked ;
                if (isOptionChecked && optionTitle !== optionKey)
                    updatedFilters[category][optionKey].checked = false;
            };
        
        //console.log(updatedFilters);
        this.setState({ filterOptions: updatedFilters });
    };

    searchHandler = (event) => {
        if (event.key == 'Enter'){
            const checkedOptions = [];
            const filters = this.state.filterOptions;
            for (const category of Object.keys(filters)){
                for (const optionKey of Object.keys(filters[category])){
                    if (filters[category][optionKey].checked)
                        checkedOptions.push({category: category, option: optionKey});
                }
            }

            this.props.fetchVideosInfo('info/filter', {
                videoName: event.target.value,
                filters: checkedOptions,
            });
        }
    };

    componentDidMount() {
        console.log("Layout mount")
    }

    componentDidUpdate() {
        console.log('Layout update');
        if (this.props.isAuthenticated && this.props.userData.name == null ){
            //console.log(localStorage.getItem('userId'));
            //console.log(localStorage.getItem('token'));
            this.props.fetchUserData( 
                localStorage.getItem('userId'),
                localStorage.getItem('token'));
        }
    };

    notificationToastClickHandler = (event, key) => {
        this.props.closeNotification(key);
    };

    render() {
        /*if (this.props.isLoading){
           return <LoadingSpinner />
        }*/

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
                    options={this.state.filterOptions}
                    checkHandler={this.filterOptionCheckHandler}
                    show={this.state.showFilterOptions}/>
                <SideDrawer 
                    isAuthenticated={this.props.isAuthenticated}
                    isOpen={this.state.showSideDrawer}
                    close={this.sideDrawerCloseHandler}/>
                <main>
                    <NotifiactionContainer toasts={notifications}/> 
                    <Auth 
                        show={this.state.showAuthModal}
                        hide={this.authModalToggleHandler}/>
                    <PlaylistForm />
                    {this.props.children}

                </main>
            </div>
        );
    };
};



export default connect( mapStateToProps, mapDispatchToProps ) ( Layout );