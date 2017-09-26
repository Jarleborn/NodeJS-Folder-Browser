
import React,{Component} from 'react'

import FolderView from './FolderView'
class FolderTree extends Component {
  constructor(props){
    super(props)
    this.state = {
      FoldersAndFiles: [],
    }
  }
  componentDidMount() {
    fetch('http://localhost:1337/getFolders')
    .then(function(res){
      return res.json()
    })
    .then(json => {
      this.setState({'FoldersAndFiles':json})
    })
    .catch(err => console.log(err))
  }
  render() {

    return (
      <div className="container">
        { this.state.FoldersAndFiles.files ? <FolderView folder={this.state.FoldersAndFiles} /> : <h5> Loading.. </h5>}
      </div>
    )
  }
}

export default FolderTree
