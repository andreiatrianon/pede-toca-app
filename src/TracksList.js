import React from 'react'
import {Col, Card, Icon} from 'react-materialize'
import './App.css'
import './Card.css'

class TracksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.addTrackToPlaylist = this.addTrackToPlaylist.bind(this);
  }

  addTrackToPlaylist(e) {
    let trackFromAPI = e.target.parentElement.getAttribute('data-api');
    let playlist = localStorage.getItem('playlist').split(',');
    if (e.target.innerHTML === 'playlist_add') {
      playlist.push(trackFromAPI);
      localStorage.setItem('playlist', playlist);
      e.target.textContent = 'playlist_add_check';
      e.target.className = 'material-icons small icon-button my-green';
    } else {
      playlist = playlist.filter(el => el !== trackFromAPI);
      localStorage.setItem('playlist', playlist);
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

// data-api={JSON.stringify(track)}

export default TracksList;