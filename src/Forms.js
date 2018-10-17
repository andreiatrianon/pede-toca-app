import React from 'react';
import {Row, Col, Card, Input, Button} from 'react-materialize';

class TextFields extends React.Component {  
  render() {
    return (
      <Row>
        <Col m={6} s={12}>
          <Card className='white' textClassName='black-text' title='INSIRA SEU ARTISTA'>
            <Input s={6} label="Nome do artista" validate defaultValue='' />
            <Input s={6} label="Gênero musical" validate defaultValue='' />
            <Button waves='light'>Criar artista</Button>
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