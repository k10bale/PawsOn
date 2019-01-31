
import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, CustomInput, Container } from 'reactstrap';
import "./style.css"


class ImageUpload extends Component {

    state = {
        file: '',
        imagePreviewUrl: ''
    };
  
    _handleSubmit = e => {
        e.preventDefault();
        // TODO: do something with -> this.state.file
    }
  
    _handleImageChange = e =>{
        e.preventDefault();
  
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({ file: file, imagePreviewUrl: reader.result });
        }
        reader.readAsDataURL(file)
    }
  
    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
  
      return (
       
        <div>
          
            <Form onSubmit={this._handleSubmit}>
            <FormGroup>
            <Label for="exampleCustomFileBrowser">Upload Photo</Label>
                <CustomInput type="file"  accept='image' onChange={this._handleImageChange} />
                <Button type="submit" onClick={this._handleSubmit}>Upload Image</Button>
                </FormGroup>
            </Form>
            {/* <div className="imgPreview"> */}
            {!$imagePreview && <img src={imagePreviewUrl} />}
            {/* </div> */}
        </div>
       
      )
    }
  
}




// import React from 'react';
// import ImageUploader from 'react-images-upload';

// class ImageUpload extends React.Component {

// 	constructor(props) {
// 		super(props);
// 		 this.state = { pictures: [] };
// 		 this.onDrop = this.onDrop.bind(this);
// 	}

// 	onDrop(pictureFiles, pictureDataURLs) {
// 		this.setState({
//             pictures: this.state.pictures.concat(pictureFiles),
//         });
// 	}

//     render() {
//         return (
//             <ImageUploader
//                 	withIcon={true}
//                 	buttonText='Choose images'
//                 	onChange={this.onDrop}
//                 	imgExtension={['.jpg', '.gif', '.png', '.gif']}
//                 	maxFileSize={5242880}
//             />
//         );
//     }
// }
export default ImageUpload;