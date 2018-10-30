import React, { Component } from 'react'
import {Col, Card} from 'react-materialize'
import './App.css'
import './Card.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracksList: []
    }
  }

  async componentDidMount() {
    let data = await this.props.getTracksFromAPI()
    return this.setState({tracksList: data})
  }

  render() {
    return (
      <section id='tracks-list' className='white my-text-center my-p-2'>
        {this.state.tracksList.map((track, index) =>
          <Col id={index} data-id={track.id} className='my-w-27 my-d-inline-block my-mr-1'>
            <Card className='my-bg-brown' title={track.title}>
              <iframe src={track.url} />
            </Card>
          </Col>
        )}
      </section>
    )
  }
}

export default App;