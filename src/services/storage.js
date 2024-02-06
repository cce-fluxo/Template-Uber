import axios from 'axios';
import { Buffer } from 'buffer';

async function uploadToStorage({ photo }) {
  function isEmpty(obj) {
    return obj ? Object.keys(obj).length === 0 : true;
  }

  if (isEmpty(photo)) {
    return null;
  }

  try {
    const uriParts = photo.uri.split('.');
    const imageType = uriParts[uriParts.length - 1];
    const firstResponse = await api.get(`/files/${imageType}`);
    console.log(firstResponse.data);
    const fileName = firstResponse.data.file_name;
    const mediaUrl = firstResponse.data.media_url;

    //É necessária essa linha para converter a imagem para um binary file (tipo de arquivo que o backend precisa)
    const binaryFile = Buffer.from(photo.base64, 'base64');
    const secondResponse = await axios.put(mediaUrl, binaryFile, {
      headers: {
        'Content-Type': imageType,
        'x-amz-acl': 'public-read',
      },
    });
    return fileName;
  } catch (err) {
    console.log(err.response.data);
    toastMessage.current.showMessage({
      message: 'Erro ao fazer upload da foto',
      type: 'danger',
      icon: 'danger',
    });
  }
}

export default uploadToStorage;
