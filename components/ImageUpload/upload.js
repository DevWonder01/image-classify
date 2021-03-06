import React, { Component } from "react";
import Head from 'next/head'

import axios from "axios";
import {
  Input,
  Form,
  Select,
  DatePicker,
  Modal,
  Upload,
  message,
  notification,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

//Change this to your backend endpoint  when in production
const host = "http://127.0.0.1:8000";
// 

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default class MyUpload extends Component {
  state = {
    loading: false,
    loaded: false,
    Image: "",
    Result: null,

    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],

    PreprocessedImage: "",
    buyPizza: false,
  };

  //Image HanldeENDS HERE

  validateFile = (file) => {
    //Checks if file type is a JPG or PNG
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    let pass = true;
    if (!isJpgOrPng) {
    //   message.error("You can only upload JPG/PNG file!");
      pass = false;
    }

    //Checks if file is larger than 2 Megabytes
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error("Image must lesser than 2MB!");
    //   pass = false;
    // }
    if (pass == true) {
      return true;
    } else {
      return false;
    }
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  // Ends Here

  //Processes image file and assigns to state
  handleImage = async (e) => {
    e.preventDefault();

    const upload = e.target.files[0];
    console.log(upload);
    const isUseable = await this.validateFile(upload);
    //File Reader
    const reader = new FileReader();
    if (isUseable == true) {
      var url = reader.readAsDataURL(upload);
      reader.onloadend = () => {
        //For preview
        this.setState({
          Preview: [reader.result],
        });
        console.log(this.state.Preview);
      };

      //the image in this key is sent to the backend for the deep learning model to predict
      this.setState({
        Image: upload,
      });

      console.log(this.state.Image);
    } else {
    //   message.error("Upload an image only");
    }
  };

  //Send the Image to the backend for processing
  uploadImage = async () => {
    const user_image = this.state.Image;
    let fd = new FormData();
    fd.append("imageFile", user_image);

    const endpoint = host + "/core/imageLine/";
    axios.defaults.headers = {
      "Content-Type": "multitype/form-data",
    };
    //this uploads image to the backend via  HTTP POST method
    await axios
      .post(endpoint, fd)
      .then((res) => {
        if (res.status == 200) {
          //Returns the results after the
          const label = res.data.Label.replace("_", " ", "-", "");
          this.setState({
            loading: false,
            loaded: true,
            Result: label,
          });
        } else {
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const { Preview, Result } = this.state;

    return (
      <>
        <Head>
        <title>
        React Image Uploader for TensorFlow & Keras Image Classification
        </title>
        <meta charset="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/logo192.png" />
    
        <link
          rel="styleSheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"></link>
        <link
          rel="styleSheet"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />

    <script async src="https://www.googletagmanager.com/gtag/js?id=G-BKVB7GJH6S"></script>
 

      </Head>

        <div 
        style={{marginTop:200}}
        className="container">
            
            <div className="row">
            <div
          className="col-sm-6">
            <p className="headingText">
              React Image Uploader for TensorFlow & Keras Image Classification
            </p>
            <div className="col-sm-8">
              <form>
                <input
                  onChange={(e) => {
                    this.handleImage(e);
                  }}
                  
                  type="file"
                  name="imageInput"
                />
                <button
                style={{marginTop:20}}
                onClick={this.uploadImage}
                  className="btn btn-success"
                  type="button"
                >
                  Upload
                </button>
              </form>
            </div>
          </div>

          {
              this.state.loaded?(
                  <>

<div className="col-sm-4">
              <p
              style={{fontSize:17}}
              className="text-center">
              You uploaded a {Result}
              </p>
              <div className="preViewImage-box">
              <img 
                className="preViewImage"
                src={Preview} />
              </div>
          </div>
                  </>
              ):(
                  <>
                  </>
              )
          }
            </div>
         
        </div>
      </>
    );
  }
}
