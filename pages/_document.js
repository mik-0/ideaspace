import Document, {
    Html,
    Head,
    Main,
    NextScript,
} from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)

        return initialProps
    }

    render() {
        return (
        <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=''></link>
                    <link href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;500;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
                    <script src="https://kit.fontawesome.com/d3421d6ab0.js" crossOrigin='anonymous' async></script>
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
        )
    }
}

export default MyDocument