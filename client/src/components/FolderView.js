
import React,{Component} from 'react'
import {Col, Row, Collection, Card, CollectionItem} from 'react-materialize'

class FolderView extends Component {
  constructor(props){
    super(props)
    this.state = {folder: this.props.folder}
  }
  componentDidMount() {

  }
  render() {
    if (this.props.folder) {
      let files = []
      let file
      for (file in this.props.folder.files){
        files.push(this.props.folder.files[file])
      }
      return (
        <div className="class-name">

        <h2>{this.props.folder.folder}</h2>
        <ul>
          { files.map(function (file) {
            if (file) {
              return (
                <li>
                  <h4 > {file} </h4>
                </li>
              )
            }
          })}
        </ul>
        <hr />
        </div>
      )
    } else{
      return(<p> No rooms :( </p>)
    }
  }
}

export default FolderView
