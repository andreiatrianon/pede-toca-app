import React, { Component } from 'react'
import {Col, Card, Icon} from 'react-materialize'
import './App.css'
import './Card.css'

class TrackList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: []
    }
    this.addTrackToPlaylist = this.addTrackToPlaylist.bind(this);
  }

  addTrackToPlaylist(e) {
    let trackId = e.target.parentElement.getAttribute('data-id');
    if (e.target.innerHTML === 'playlist_add') {
      this.state.playlist.push(trackId);
      localStorage.setItem('playlist', this.state.playlist);
      e.target.textContent = 'playlist_add_check';
      e.target.className = 'material-icons small icon-button my-green';
    } else {
      this.setState({playlist: this.state.playlist.filter(el => el !== trackId)});
      localStorage.setItem('playlist', this.state.playlist);
      e.target.textContent = 'playlist_add';
      e.target.className = 'material-icons small icon-button my-orange';
    }
  }

  render() {
    return (
      <section id='tracks-list' className='white my-text-center my-p-2'>
        {this.props.tracksDB.map((track, index) =>
          <Col id={index} className='my-w-27 my-d-inline-block my-mr-1'>
            <Card className='my-bg-brown' title={track.title}>
              <div data-id={track.id} onClick={this.addTrackToPlaylist}><Icon className='icon-button my-orange' small>playlist_add</Icon></div>
              <iframe src={track.url} />
            </Card>
          </Col>
        )}
      </section>
    )
  }
}

export default TrackList;