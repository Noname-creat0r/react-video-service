import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import FilterOptions from '../../components/Navigation/FilterOptions/FilterOptions';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Auth from '../Auth/Auth';

import './Layout.css';
import { updateObject } from '../../shared/utility';

class Layout extends Component {
    state = {
        showSideDrawer: false,
        showAuthModal: false,
        showFilterOptions: false,
        filterOptions: [
            {
                category: 'Sort by',
                options: [
                    {
                        title: 'Popularity',
                        type: 'switch',
                        checked: false,     
                    },
                    {
                        title: 'Upload date',
                        type: 'switch',
                        checked: false,
                    }, 
                    {
                        title: 'Most likes',
                        type: 'switch',
                        checked: false
                    },
                ],
            },
            {
                category: 'Type',
                options: [
                    {
                        title: 'Video',
                        type: 'checkbox',
                        checked: false,
                    }, 
                    {
                        title: 'User',
                        type: 'checkbox',
                        checked: false,
                        disabled: true,
                    }, 
                    {
                        title: 'Playlist',
                        type: 'checkbox',
                        checked: false,
                        disabled: true,
                    },
                ],
            }
        ],
    };

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
        //console.log(key);
        const oldState = this.state;
        const categoryId = oldState
            .filterOptions
            .findIndex(filter => filter.category === category);
        const optionId = oldState
            .filterOptions[categoryId]
            .options
            .findIndex(option => option.title === optionTitle);
        const checkedId = oldState
            .filterOptions[categoryId]
            .options
            .findIndex(option => option.checked);
        if (checkedId > -1 ){
            oldState.filterOptions[categoryId].options.forEach((option, id) => {
                option.disabled = id !== checkedId;
                option.checked = id !== checkedId;
            });
        }
        oldState.filterOptions[categoryId].options[optionId].checked = true;
        oldState.filterOptions[categoryId].options[optionId].disabled = false;
        this.setState(oldState);
    };

    searchHandler = (event) => {
        if (event.key == 'Enter'){
            this.props.fetchVideosInfo('info', {
                videoName: event.target.value
            });
            // send GET(event.target.value)
        }
    };

    componentDidUpdate() {
        if (this.props.isAuthenticated && this.props.userName == null){
            this.props.fetchUserData( 
                localStorage.getItem('userId'),
                localStorage.getItem('token'));
        }
        //console.log('Layout update');
    };

    render() {
        return(
            <div>
                <Toolbar 
                    isAuthenticated={this.props.isAuthenticated}
                    userName={this.props.userName}
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
                    <Auth 
                        show={this.state.showAuthModal}
                        hide={this.authModalToggleHandler}/>

                    {this.props.children}

                </main>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        userName: state.profile.data.name,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserData: (userId, token) => dispatch(actions.profileFetchData(userId, token)),
        fetchVideosInfo: (endpoint, options) => dispatch(actions.fetchVideoInfo(endpoint, options)),
        
    };
};

export default connect( mapStateToProps, mapDispatchToProps ) ( Layout );