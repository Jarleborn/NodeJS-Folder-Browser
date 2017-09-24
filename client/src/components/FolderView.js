
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
        <Card className='blue-grey darken-1' textClassName='white-text' title={this.props.folder.folder} actions={[<a href={this.props.houseID}>Read more</a>]}>
        <Collection>
          { files.map(function (file) {
            if (file) {
              return (
                <CollectionItem key={file}>
                  <Row>
                    <Col m={4} s={12}>
                      <b > {file} </b>
                    </Col>
                  </Row>
                </CollectionItem>
              )
            }
          })}
        </Collection>
        </Card>
        </div>
      )
    } else{
      return(<p> No rooms :( </p>)
    }
  }
}

export default FolderView
