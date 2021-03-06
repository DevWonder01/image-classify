import React from 'react'
import { Uploader } from 'rsuite';


function rsuiteHandle(file, callback) {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  }
  
  const styles = {
    width: 150,
    height: 150
  };
  
  const App = () => {
    const [uploading, setUploading] = React.useState(false);
    const [fileInfo, setFileInfo] = React.useState(null);
  
    return (
      <Uploader
        fileListVisible={false}
        listType="picture"
        action="//jsonplaceholder.typicode.com/posts/"
        onUpload={file => {
          setUploading(true);
          previewFile(file.blobFile, value => {
            setFileInfo(value);
          });
        }}
        onSuccess={(response, file) => {
        //   setUploading(false);
        //   toaster.push(<Message type="success">Uploaded successfully</Message>);
          console.log(response);
        }}
        onError={() => {
          setFileInfo(null);
          setUploading(false);
          toaster.push(<Message type="error">Upload failed</Message>);
        }}
      >
        <button style={styles}>
          {uploading && <Loader backdrop center />}
          {fileInfo ? (
            <img src={fileInfo} width="100%" height="100%" />
          ) : (
            <Avatar style={{ fontSize: 80 }} />
          )}
        </button>
      </Uploader>
    );
  };

  export default rsuiteHandle