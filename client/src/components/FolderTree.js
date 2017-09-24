
import React,{Component} from 'react'
import {Col, Row, Collection} from 'react-materialize'
import FolderView from './FolderView'
class FolderTree extends Component {
  constructor(props){
    super(props)
    this.state = {
      files: [],
    }
  }
  componentDidMount() {
    fetch('http://localhost:1337/getFolders')
    .then(function(res){
      return res.json()
    })
    .then(json => {
      this.setState({'files':json.files})
    })
    .catch(err => console.log(err))
  }
  render() {

    return (
      <div className="all-list">
        <Row>
          <Col s={10} offset='s1'>
            <Collection>
              {this.state.files.map( function(folder, key){
                return <FolderView folder={folder} />
              })}
            </Collection>
          </Col>
        </Row>
      </div>)


  }
}

export default FolderTree
