import React from 'react';
import {Row, Input, Button} from 'react-materialize';

class ArtistForm extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      artistsList: [],
      newArtist:{}
    }
    this.postNewArtistInAPI = this.postNewArtistInAPI.bind(this);
    this.createNewArtist = this.createNewArtist.bind(this);
    this.requestPostArtistInAPI = this.requestPostArtistInAPI.bind(this);
  }

  async componentDidMount() {
    let data = await this.props.getArtistsFromAPI();
    this.setState({artistsList: data});
    let artistsName ={}
    data.map(artist => artistsName[artist.name] = 'https://www.shareicon.net/download/2016/08/01/639882_display.svg');
    this.setState({artistsName});
    console.log(this.state.artistsName);
  }

  
  async postNewArtistInAPI() {
    await this.createNewArtist();
    let alreadyHasArtist;
    this.state.artistsList.map(artist => {
      if(artist.name.toLowerCase() === this.state.newArtist.name.toLowerCase() && artist.genre.toLowerCase() === this.state.newArtist.genre.toLowerCase()) {
        alreadyHasArtist = true;
        alert('Esse artista já existe aqui =)');
      }
    })
    if(!alreadyHasArtist) {    
      ////////////////////////CHAMADA PARA CRIAR ARTISTA//////  
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
        <Input id='input-artist-name' s={6} label="Nome do artista" validate defaultValue='' />
        <Input id='input-artist-genre' s={6} label="Gênero musical" validate defaultValue='' />
        <Button waves='light' onClick={this.postNewArtistInAPI}>Criar artista</Button>
      </Row>
    )
  }
}

export default ArtistForm;