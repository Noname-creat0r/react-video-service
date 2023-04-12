import React, { useState } from "react"
import { useSelector } from "react-redux"
import { mapVideoInfoToCards } from "../../shared/utility"
import * as actions from "../../store/actions/index"
import * as modalModes from "../../shared/playlistModalModes"

import Container from "react-bootstrap/Container"
import HomeVideoCard from "../../components/UI/Card/HomeVideoCard/HomeVideoCard"
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner"
import ListGroup from "react-bootstrap/ListGroup"
import Modal from "../../components/UI/Modal/Modal"
import Image from "react-bootstrap/Image"
import AddImage from "../../assets/images/plus-sign.svg"

import "./Home.css"

/*function mapStateToProps(state) {
   return {
      fetchingVideoData: state.video.pendingRequests > 0,
      fetchingPlaylistData: state.playlist.pendingRequests > 0,
      videosInfo: state.video.videosInfo,
      playlists: state.playlist.playlists,
      isAuthenticated: state.auth.token !== null,
   }
}

function mapDispatchToProps(dispatch) {
   return {
      fetchVideosInfo: (endpoint, options) =>
         dispatch(actions.videoFetchInfo(endpoint, options)),
      fetchPlaylistsData: (endpoint, options) =>
         dispatch(actions.playlistFetchData(endpoint, options)),
      videoStreamStart: videoId => dispatch(actions.videoStreamStart(videoId)),
      notificationSend: (message, type) =>
         dispatch(actions.notificationSend(message, type)),
      playlistEdit: (actionType, playlistInfo) =>
         dispatch(
            actions.playlistEdit(localStorage.getItem("token"), actionType, playlistInfo)
         ),
   }
}*/

export default function Home(props) {
   const [showPlaylists, setShowPlaylists] = useState(false)
   let content = "Home"

   const homeVideoCardClickHandler = (event, id) => {
      //this.props.videoStreamStart(id)
      localStorage.setItem("videoId", id)
   }

   const homeAddToPlaylistClickHandler = async (event, id) => {
      if (!localStorage.getItem("userId")) {
         //this.props.notificationSend("Sign in to manage playlists", "warning")
      } else {
         setShowPlaylists(true)
      }
   }

   /*if (isVideoFetching || isVideoLoading) {
      return <LoadingSpinner />
   } else {
      console.log(videosInfo)
      content = mapVideoInfoToCards(
         {
            videos: videosInfo.videos,
            playlists: {},
         },
         {
            click: homeVideoCardClickHandler,
            playlist: homeAddToPlaylistClickHandler,
         },
         HomeVideoCard
      )
   }*/

   /*let playlistList = []
   if (this.state.showPlaylists) {
      const items = []
      this.props.playlists.forEach(playlist =>
         items.push(
            <ListGroup.Item
               action
               onClick={() =>
                  this.props.playlistEdit(modalModes.ADDING, {
                     playlistId: playlist._id,
                     videoId: localStorage.getItem("videoId"),
                  })
               }>
               {playlist.title}
            </ListGroup.Item>
         )
      )
      items.push(
         <ListGroup.Item action>
            <Image
               src={AddImage}
               className="mx-1"
               width="15px"
               height="15px"
            />
            <b>Create new </b>
         </ListGroup.Item>
      )
      //console.log(this.props.playlists);
      playlistList = <ListGroup>{items}</ListGroup>
   }*/

   return (
      <Container className="d-flex flex-wrap my-3">
         <Modal
            show={showPlaylists}
            hide={setShowPlaylists(false)}
            title="Add to playlist"
         />
         {content}
      </Container>
   )
}
