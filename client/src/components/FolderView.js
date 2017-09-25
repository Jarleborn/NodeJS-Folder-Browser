
import React,{Component} from 'react'


class FolderView extends Component {
  constructor(props){
    super(props)
    this.state = {folder: this.props.folder}
  }
  componentDidMount() {

  }

  render() {
    console.log(this.props.folder.folder)
    if (this.props.folder.folder) {

      return (
        <div className="class-name">

        <h4>{this.props.folder.folder}</h4>
        {this.props.folder.folders[0].map(function (folder) {
          return <FolderView folder={folder} />
        })}
        {this.props.folder.files.map(function (file) {
          return <p> {file} </p>
        })}

        </div>
      )
    } else{
      return(<p> No folders :( </p>)
    }
  }
}

export default FolderView
