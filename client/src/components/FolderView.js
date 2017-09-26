
import React,{Component} from 'react'
import {Row, Col, Button} from 'react-materialize'

class FolderView extends Component {
  constructor(props){
    super(props)
    this.state = {folder: this.props.folder}
    this.state= {open: false}
    this.openFiles.bind(this)
  }

  openFiles = () =>{
    this.setState({open:true})
  }

  closeFiles = () => {
    this.setState({open: false})
  }

  render() {
    console.log(this.props.folder.folder)
    if (this.props.folder.folder) {
      let button = null
      if (this.state.open) {
        button = <Button onClick={this.closeFiles} > Close </Button>
      } else {
        button = <Button onClick={this.openFiles} > Open </Button>
      }

      let isOpen = this.state.open
      return (
        <Row>
        <div class="Col s3" className="class-name">

        <h5  >{this.props.folder.folder}</h5>
        {button}
        { isOpen ?
          (  <Row>
          <ul class="Col s3 offset-s2">
          { this.props.folder.files.map(function (file) {
            return <li> {file} </li>
          })}
          </ul>
          <ul class="Col s3 offset-s6">
          {this.props.folder.folders[0].map(function (folder) {
            return <FolderView folder={folder} />
          })}
          </ul>
          </Row>
          ) :( ' ')}
          </div>
          </Row>
        )
      } else{
        return(<p> No folders :( </p>)
      }
    }
  }

  export default FolderView
