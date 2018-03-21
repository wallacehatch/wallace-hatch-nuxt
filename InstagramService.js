import axios from 'axios';


const svc = {}

svc.getInstagramMediaInfo = getInstagramMediaInfo;
svc.getInstagramPosts = getInstagramPosts;

function getInstagramPosts() {
	return Promise.resolve(axios.get("https://www.instagram.com/wallacehatch/?__a=1"))
}

function getInstagramMediaInfo(mediaId) {
  return Promise.resolve(axios.get(process.env.API_URL + 'instagram-media/' + String(mediaId)))
}


export default svc
