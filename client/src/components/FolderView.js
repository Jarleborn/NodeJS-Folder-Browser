
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

        <Col class="s6" className="class-name">
        <Row>
          <Col class="s10 fname">
            <h5  > {this.props.folder.folder}</h5>
          </Col>
          <Col class="s2 offset-s3">
            {button}
          </Col>
        </Row>
        { isOpen ?
          (  <Row class="custom-Row">

            <Col class="s3 offset-s8" >
            <ul >
            { this.props.folder.files.map(function (file) {
              return <li> {file} </li>
            })}
            </ul>

            <ul class="s3 offset-s8">
            {this.props.folder.folders[0].map(function (folder) {
              return <Row> <FolderView folder={folder} /> </Row>
            })}
            </ul>

            </Col>
            </Row>
          ) :( ' ')}
        </Col>

      )
    } else{
      return(<p> No folders :( </p>)
    }
  }
}

export default FolderView
