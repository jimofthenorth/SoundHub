'use strict';
import React from 'react';
import {Glyphicon} from 'react-bootstrap';
import {SongList} from './home';
import Create from './create';
import Router from 'react-router';
import AudioPlayer from './player-components/AudioPlayer';

var arr = [{
  title:'badboy',
  url: "assets/badboy.mp3",
  author:"big bang",
  like:"223"
},{
  title:'bang bang bang',
  url: "assets/bang.mp3",
  author:"big bang",
  like:"53"
},{
  title:'tonight',
  url: "assets/giveyouup.mp3",
  author:"big bang",
  like:"103"
}];


var user = {
  username:"Richie",
  profileImg:"../assets/profileImg.jpg"
}

class ForkList extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>Branches</div>
    );
  }
}


class MyMusic extends React.Component {
  constructor() {
    super();
    this.switchSong = this.switchSong.bind(this);
  }

  switchSong(song){
    this.props.switchsong(song)
  }

  render() {
    return (
      <div className="mylist">
        <SongList data = {arr}  switchSong = {this.switchSong} />
      </div>
    );
  }
}

class Edit extends React.Component {
  constructor() {
    super();
    this.save = this.save.bind(this);
  }

  save(){
    console.log(this.refs.username.getDOMNode().value)
  }

  render() {
    return (
      <div className="boxed-group-profile">
          <div className="pageTitle">Profile</div>
          <div className="boxed-group-inner">
              <div className="edit-profile-avatar">
                <div>Profile picture</div>
                <img id="avatar" />
                <div className="fileUpload btn btn-success">
                      <span>Choose Pic</span>
                      <input type="file" className="upload"></input>
                </div>

                <div className="edit-profile">
                <div>Name</div>
                  <input classNameName="profile-input" ref="username" type="text" placeholder={this.props.username}></input>
                </div>
                <button onClick={this.save} className="btn btn-success">SAVE</button>
              </div>
          </div>
      </div>
    );
  }
}

class Favor extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>Favorite</div>
    );
  }
}


class User extends React.Component {
  constructor(props) {
    super(props);
    this.gotoMusic = this.gotoMusic.bind(this);
    this.gotoBranches = this.gotoBranches.bind(this);
    this.gotoFavourites = this.gotoFavourites.bind(this);
    this.gotoProfile = this.gotoProfile.bind(this);
    this.gotoCreate = this.gotoCreate.bind(this);
    this.setsong = this.setsong.bind(this);
    this.state = {
      profileImg:props.profileImg,
      username:"",
      pageType: props.pageType,
      currentsong: {},
    }
   }

   componentDidMount(){
    this.setState({profileImg:user.profileImg})
    this.setState({username:user.username})
   }

   gotoMusic(){this.setState({pageType:'music',currentsong:{}});}
   gotoBranches(){this.setState({pageType:'branch',currentsong:{}});}
   gotoFavourites(){ this.setState({pageType:'fav',currentsong:{}}); }
   gotoProfile(){ this.setState({pageType:'profile',currentsong:{}}); }
   gotoCreate(){ this.setState({pageType:'create',currentsong:{}}); }
   setsong(song){ this.setState({currentsong:song}); }

  render() {
    var profilePage;
    if(this.state.pageType==='music'){
      profilePage = <MyMusic switchsong = {this.setsong}/>
    }else if(this.state.pageType==='branch'){
      profilePage = <ForkList />
    }else if(this.state.pageType==='fav'){
      profilePage = <Favor />
    }else if(this.state.pageType==='profile'){
      profilePage = <Edit username = {this.state.username}/>
    }else if(this.state.pageType==='create'){
      profilePage = <Create />
    }

    return (
      <div className="profilePage">
      <AudioPlayer song = {this.state.currentsong} mode = "user" />
        <img className='randomBG' src="../assets/random-bg/13772829224_76f2c28068_h.jpg"></img>
        <img className='profileImg' src = {this.state.profileImg}></img>
        <div className="profileButtonCollection">
          <button className="profileButton" onClick={this.gotoMusic}><Glyphicon glyph='music'  /> MyMusic</button>
          <button className="profileButton" onClick={this.gotoBranches}><Glyphicon glyph='paperclip' onClick={this.gotoBranches} /> Branches</button>
          <button className="profileButton" onClick={this.gotoFavourites}><Glyphicon glyph='heart' /> Favourites</button>
          <button className="profileButton" onClick={this.gotoProfile}><Glyphicon glyph='user' /> Profile</button>
          <button className="profileButton" onClick={this.gotoCreate}><Glyphicon glyph='upload' /> Create</button>
        </div>
        {profilePage}
      </div>
    )
  }
}
User.defaultProps = { profileImg: "../assets/placeholder.jpg" , pageType: "music"};

export default User;