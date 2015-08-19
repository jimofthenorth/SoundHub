'use strict';
import React from 'react';
import Router from 'react-router';
import SongList from './songlist';

import SongActions from '../actions/songActionCreators';
import AudioPlayer from './player-components/AudioPlayer';

import AllSongStore from '../stores/allSongStore';
import UserProfileStore from '../stores/userProfileStore';
import VotedSongStore from '../stores/votedSongStore'

class Home extends React.Component {
  constructor(props) {
    super(props);
    SongActions.getAllSongs();
    SongActions.getUserVotes(UserProfileStore.getCookieID())
    this.state = {songs: {allSongs: []},
                  order: 'like'};
    this.componentDidMount = this.componentDidMount.bind(this);
    this.switchSong = this.switchSong.bind(this);
    this.render = this.render.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount () {
    AllSongStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    AllSongStore.removeChangeListener(this._onChange);
  }

  switchSong(song){
    this.setState({currentsong:song});
  }

  _onChange() {
    this.setState({songs: AllSongStore.getAllSongs()});
    console.log("songs", this.state.songs);
  }

  handleNewestClick() {
    console.log('newest click');
  }

  handleUpvotedClick() {
    console.log('upvoted click');
  }

  render() {
    var order = this.state.order;
    console.log(order);
    return (

      <div className= "HomePage">
        <div className = "select">
          <button className="sortButton">View Newest</button>
          <button className="sortButton">View Most Upvoted</button>
        </div>
        <select>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
        <hr></hr>
        <div className= "playerBox">
          <AudioPlayer song = {this.state.currentsong} mode = "home" />
        </div>
          <SongList data = {this.state.songs.allSongs.sort(function(a, b) {
            return b[order] - a[order];
          })} 
          switchSong = {this.switchSong} />
      </div>
    );
  }
}


export default Home;

