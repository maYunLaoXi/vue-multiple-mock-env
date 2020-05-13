import axios from 'axios'

export const getSignature = () => {
  return axios.get('/node/signature', {
    params: {}
  })
}
