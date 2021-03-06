import '../styles/globals.css'
import '../styles/upload.css'


import stylesheet from 'antd/dist/antd.min.css'


function MyApp({ Component, pageProps }) {

  return (
    <>
     {/* <style dangerouslySetInnerHTML={{ __html: stylesheet }} /> */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp