import React from 'react';
import {Row, Col, Card, Input, Button, Autocomplete} from 'react-materialize';

class TextFields extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      artistsList: [],
      artistsName: {},
      newArtist:{},
      newTrack:{}
    }
    this.postNewArtistInAPI = this.postNewArtistInAPI.bind(this);
    this.createNewArtist = this.createNewArtist.bind(this);
    this.requestPostArtistInAPI = this.requestPostArtistInAPI.bind(this);
    this.postNewTrackInAPI = this.postNewTrackInAPI.bind(this);
    this.requestPostTrackInAPI = this.requestPostTrackInAPI.bind(this);
    this.requestPostTrackWithArtistInAPI = this.requestPostTrackWithArtistInAPI.bind(this);
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

  async postNewTrackInAPI() {
    let artistFromInput = document.getElementById('input-artist-name2').value;
    if (Object.keys(this.state.artistsName).includes(artistFromInput)) {
      let trackFromInput = document.getElementById('input-track-name').value;
      let trackURLFromInput = document.getElementById('input-track-url').value;
      if (!trackFromInput) {
        alert('Por favor, insira o nome da música')
      } else if (!trackURLFromInput) {
        alert('Por favor, insira o link da música')
      } else {
        let trackId = await this.requestPostTrackInAPI(trackFromInput, trackURLFromInput);
        return this.requestPostTrackWithArtistInAPI(trackFromInput,trackURLFromInput,trackId,artistFromInput);
      }
    } else {
      alert('Esse artista ainda não foi criado aqui =( Se quiser, pode criá-lo no outro formulário =)')
    }
  }

  requestPostTrackInAPI(trackFromInput, trackURLFromInput) {
    const BASE_URL = 'https://peaceful-badlands-98440.herokuapp.com'
    const options = {
                      method: 'post',
                      headers: {
                          'Content-Type': 'application/json'
                        },
                        credentials: 'include',
                        body: JSON.stringify({'title': trackFromInput, 'url': trackURLFromInput})
                     }
    return fetch(`${BASE_URL}/tracks`, options)
            .then(res => res.json())
            .then(data => {
              console.log(data)
              return data.id;
            })
  }

  requestPostTrackWithArtistInAPI(trackFromInput,trackURLFromInput,trackId,artistFromInput) {
    let artistId;
    let artistName;
    let artistGenre;
    this.state.artistsList.map(artist => {
      if (artist.name === artistFromInput) {
        artistId = artist.id
        artistName = artist.name
        artistGenre = artist.genre
      }
    })
    const BASE_URL = 'https://peaceful-badlands-98440.herokuapp.com'
    const options = {
                      method: 'post',
                      headers: {
                          'Content-Type': 'application/json'
                        },
                        credentials: 'include',
                        body: JSON.stringify({'id': trackId,
                                              'artist': {'id': artistId,
                                                          'name': artistName,
                                                          'genre': artistGenre
                                                        },
                                              'title': trackFromInput,
                                              'url': trackURLFromInput
                                              }
                        )
                     }
    fetch(`${BASE_URL}/artists/${artistId}/tracks/${trackId}`, options)
    alert('Sua música foi inserida! =)')
    return window.location.reload()
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
            <Row>
              <Autocomplete id='input-artist-name2' title='Escolha o artista' data={this.state.artistsName} />
            </Row>
            <Input s={6} id='input-track-name' label="Nome da música" validate defaultValue='' />
            <Input s={6} id='input-track-url' label="Link da música" validate defaultValue='' />
            <Button waves='light' onClick={this.postNewTrackInAPI}>Criar nova música</Button>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default TextFields;