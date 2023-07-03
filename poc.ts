import axios from 'axios';

const analyticsUrl = 'https://roaring-froyo-aa10c1.netlify.app/';
const namespace = 'roaring-froyo-aa10c1.netlify.app.json';
const apiUrl = `https://simpleanalytics.com/${namespace}`;

const headers = {
  'User-Id': 'sa_user_id_90c94b94-2844-41af-b83f-6238cdad6006',
  'Api-Key': 'sa_api_key_NfjN71wgQeS32EszZKj1o9dD3cVEhND9Bq9W',
  'Content-Type': 'text/csv',
};

const params = {
  version: '5',
  fields: 'histogram',
  start: '2023-06-20',
  end: 'today',
};


async function incrementAccess() {
  try {
    const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.75 Safari/537.36';
    await axios.get(analyticsUrl, { headers: { userAgent } });
    console.log('Acesso incrementado com sucesso!');
  } catch (error) {
    console.error('Erro ao incrementar o acesso:', error);
  }
}

async function fetchData() {
  try {
    const response = await axios.get(apiUrl, { headers: headers, params: params });
    console.log(response.data);
  } catch (error) {
    console.error('Erro ao obter os dados de análise:', error);
  }
}

async function main() {
  await incrementAccess();
  await fetchData();
}

main();
