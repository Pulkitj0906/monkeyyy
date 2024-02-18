import io from 'socket.io-client'
const socket = io('https://keynkong.onrender.com/', {
    autoConnect: false
})
export default socket