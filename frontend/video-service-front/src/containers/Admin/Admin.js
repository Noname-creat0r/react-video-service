import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { mapDataToTable } from '../../shared/utility';

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import VideoForm from '../Forms/VideoForm/VideoForm';
import CategoryForm from '../Forms/CategoryForm/CategoryForm';
import Auth from '../Auth/Auth';

import EditIcon from '../../assets/images/edit.svg';
import DeleteIcon from '../../assets/images/delete.svg';

import './Admin.css';

function mapStateToProps(state) {
    return {
        pending: state.admin.pendingRequests,
        users: state.admin.users,
        videos: state.video.videosInfo,
        categories: state.video.categories,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchProfiles: (token) => dispatch(actions.adminFetchProfiles(token)),
        fetchCategoreis: () => dispatch(actions.videoFetchCategoreis()),
        deleteCategory: (payload) => dispatch(actions.videoDeleteCategory(payload)),
        deleteVideo: (payload) => dispatch(actions.videoDelete(payload)), 
        editVideo: (payload) => dispatch(actions.videoEdit(payload)),
    };
};

class Admin extends Component {

    state = {
        showVideoForm: false,
        showUserForm: false,
        showCategoryForm: false,
        currentCategory: null,
        currentVideo: null,
        currentUser: null,
    };

    componentDidMount() {
        this.props.fetchProfiles(localStorage.getItem('token'));
    };

    videoFormToggleHandler = () => {
        this.setState(( prevState ) => {
            return { showVideoForm: !prevState.showVideoForm };
        });
    };

    authFormToggleHandler = () => {
        this.setState(( prevState ) => {
            return { showUserForm: !prevState.showUserForm };
        });
    };

    categoryFormToggleHandler = () => {
        this.setState(( prevState ) => {
            return { 
                showCategoryForm: !prevState.showCategoryForm,
                currentCategory: null,
            };
        });
    };

    deleteVideo = (video) => {

    };

    editVideo = (video) => {

    };

    uploadVideo = () => {

    };

    deleteUser = (user) => {

    };

    editUser = (user) => {

    };

    uploadUser = () => {

    };

    deleteCategory = (category) => {
        this.props.deleteCategory({
            categoryId: category.id,
            token: localStorage.getItem('token')
        });
    };

    editCategory = (category) => {
        this.setState({ 
            currentCategory: category,
            showCategoryForm: true,
        });
    };

    render() {
        if (this.props.pending > 0)
            return <LoadingSpinner/>
        
        const deleteHandlerTemp = (handler) => ({
            title: 'delete',
            function: handler,
            icon: DeleteIcon
        })

        const editHandlerTemp = (handler) => ({
            title: 'edit',
            function: handler,
            icon: EditIcon
        })

        const mappedVideos = [];
        const videoHandlers = [
            editHandlerTemp(this.editVideo),
            deleteHandlerTemp(this.deleteVideo),   
        ]

        if (this.props.videos.size > 0){
            this.props.videos.forEach(video => 
                mappedVideos.push({
                    id: video._id,
                    title: video.title,
                    author: video.author,
                    authorName: video.authorName,
                    views: video.views,
                    likes: video.likes,
                    dislikes: video.dislikes,
                    category: video.category,
                })
            );
        }

        const mappedUsers = [];
        const userHandlers = [
          editHandlerTemp(this.editUser),
          deleteHandlerTemp(this.deleteUser),
        ];

        if (this.props.users.length > 0) {
            this.props.users.forEach(user => {
                if (user.type !== 'Guest')
                    mappedUsers.push({
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        type: user.type, 
                    });
                }
            );
        }

        const mappedCategories = [];
        const categoryHandlers = [
            editHandlerTemp(this.editCategory),
            deleteHandlerTemp(this.deleteCategory),
        ]

        if (this.props.categories.length > 0) {
            this.props.categories.forEach(category => {
                mappedCategories.push({
                    id: category._id,
                    title: category.title,
                })
            })
        }
        //console.log(this.props.videos);
        return (
            <Container className='my-5'>
                <Tabs
                    className=''
                    defaultActiveKey='users'
                    justify>
                    <Tab eventKey='users' title='users'>
                        <Button 
                            className='ControlButton'
                            variant='outline-primary'
                            onClick={this.authFormToggleHandler}>
                            Add new user
                        </Button>
                        { mappedUsers.length > 0 ? 
                            mapDataToTable(mappedUsers, Table, userHandlers) :
                            <h3>There are no users...</h3> }
                    </Tab>
                    <Tab eventKey='videos' title='videos'>
                        <Button 
                            className='ControlButton'
                            variant='outline-primary'
                            onClick={this.videoFormToggleHandler}>
                            Add new video
                        </Button>
                        { mappedVideos.length > 0 ? 
                                mapDataToTable(mappedVideos, Table, videoHandlers) :
                                <h3>There are no videos...</h3> }
                    </Tab>
                    <Tab eventKey='categories' title='categories'>
                        <Button 
                            className='ControlButton'
                            variant='outline-primary'
                            onClick={this.categoryFormToggleHandler}>
                            Add new category
                        </Button>
                        { mappedCategories.length > 0 ? 
                                mapDataToTable(mappedCategories, Table, categoryHandlers) :
                                <h3>There are no categories...</h3> }
                    </Tab>
                </Tabs>
                <Auth
                    show={this.state.showUserForm}
                    hide={this.authFormToggleHandler}/>
                <VideoForm 
                    show={this.state.showVideoForm}
                    hide={this.videoFormToggleHandler}/>
                <CategoryForm 
                    category={this.state.currentCategory}
                    show={this.state.showCategoryForm}
                    hide={this.categoryFormToggleHandler}/>
            </Container>   
        );
    };
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(Admin);