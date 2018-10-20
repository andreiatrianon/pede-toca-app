import React from 'react';
import App from './App.js'
import {Row, Col, Card, Input, Button} from 'react-materialize';

class TextFields extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      newArtist:{},
      newTrack:{}
    }
    this.postNewArtistInAPI = this.postNewArtistInAPI.bind(this);
    this.createNewArtist = this.createNewArtist.bind(this);
    this.requestPostArtistInAPI = this.requestPostArtistInAPI.bind(this);
  }

  
  async postNewArtistInAPI() {
    await this.createNewArtist();
    let alreadyHasArtist;
    let data = await this.props.getArtistsFromAPI();
    data.map(artist => {
      if(artist.name.toLowerCase() === this.state.newArtist.name.toLowerCase() && artist.genre.toLowerCase() === this.state.newArtist.genre.toLowerCase()) {
        alreadyHasArtist = true;
        alert('Esse artista já existe aqui =)');
      }
    })
    if(!alreadyHasArtist) {
      await this.requestPostArtistInAPI();
      alert('Seu artista foi inserido! =)');
      window.location.reload();
    }
  }
  
  createNewArtist() {
    let newArtistFromInput = document.getElementById('input-artist-name').value;
    let artistGenreFromInput = document.getElementById('input-artist-genre').value;
    let bodyToOptions = {
      name: newArtistFromInput,
      genre: artistGenreFromInput
    }
    return this.setState({
      newArtist: bodyToOptions
    });
  }
  
  requestPostArtistInAPI() {    
    const BASE_URL = 'https://peaceful-badlands-98440.herokuapp.com'
    const options = {
                      method: 'post',
                      headers: {
                          'Content-Type': 'application/json'
                        },
                        credentials: 'include',
                        body: JSON.stringify(this.state.newArtist)
                     }
    return fetch(`${BASE_URL}/artists`, options);
  }

  render() {
    return (
      <Row>
        <Col m={6} s={12}>
          <Card className='white' textClassName='black-text' title='INSIRA SEU ARTISTA'>
            <Input id='input-artist-name' s={6} label="Nome do artista" validate defaultValue='' />
            <Input id='input-artist-genre' s={6} label="Gênero musical" validate defaultValue='' />
            <Button waves='light' onClick={this.postNewArtistInAPI}>Criar artista</Button>
          </Card>
        </Col>
        <Col m={6} s={12}>
          <Card className='white' textClassName='black-text' title='INSIRA NOVA MÚSICA'>
            <Input s={6} type='select' label="Escolha o artista">
              <option value='1'>Option 1</option>
              <option value='2'>Option 2</option>
              <option value='3'>Option 3</option>
            </Input>
            <Input s={6} label="Nome da música" validate defaultValue='' />
            <Button waves='light'>Criar nova música</Button>
            </Card>
        </Col>
      </Row>
    );
  }
}

export default TextFields;