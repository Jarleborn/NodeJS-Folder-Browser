import React, { Component } from 'react'
import {Navbar} from 'react-materialize'
import logo from './logo.svg'
import './App.css'
// import io from 'socket.io-client'
import FolderTree from './components/FolderTree'
// let socket = io('http://localhost:1337')


class App extends Component {
  state = { data: {} }

  componentDidMount() {
    // socket.on('server:event', data => {
    //   this.setState({ data })
    // })
  }

  sendMessage = message => {
    console.log(message)
    // socket.emit('getHouse', message)
  }
  render() {
    return (
      <div className="App">
      <Navbar  brand='Folder Browser' >
        </Navbar>
        <FolderTree
        />
      </div>
    )
  }
}

export default App
