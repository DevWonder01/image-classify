import Head from 'next/head'
import Upload from './upload'

export default function Home() {
  return (
    <>
      <Head>
        <title>
        React Next Django Tensorflow Image Classification
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


    <Upload/>
    </>
  )
}
