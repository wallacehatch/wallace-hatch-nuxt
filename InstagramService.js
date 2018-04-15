import axios from 'axios';


const svc = {}

svc.getInstagramMediaInfo = getInstagramMediaInfo;
svc.getInstagramPosts = getInstagramPosts;

function getInstagramPosts() {
	return Promise.resolve(axios.get(process.env.API_URL + 'instagram-media-recent/'))
}

function getInstagramMediaInfo(mediaId) {
  return Promise.resolve(axios.get(process.env.API_URL + 'instagram-media/' + String(mediaId)))
}


export default svc
