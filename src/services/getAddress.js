import axios from 'axios';

//const axios = require('axios').default;

async function getAddress(cep, object) {
  const response = (await axios.get(`https://viacep.com.br/ws/${cep}/json/`))
    .data;
  //console.log(response);
  object.rua = response.logradouro;
  object.bairro = response.bairro;
  object.cidade = response.localidade;
  object.estado = response.uf;

  // console.log('rua ' + object.rua);
  // console.log('bairro ' + object.bairro);
  // console.log('cidade ' + object.cidade);
  // console.log('uf ' + object.estado);
}

export default getAddress;
