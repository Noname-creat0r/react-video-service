import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
    }
});

instance.interceptors.request.use(
  config => {
    switch (config.url) {
      case ('/video/view'):
        if (!config.data.token && (!config.data.trialVideos ||
            Number(config.data.trialVideos) <= 0)) {
          return Promise.reject('Sign in to watch more!')
        }
        return config
      default: return config
    }
  },
  error => {
    return Promise.reject(error);
  }
)

// instance.interceptors.response.use(function () {
//   // portal the notification 
// })

export default instance;
