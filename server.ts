import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express, { application } from 'express'
import { createServer as createViteServer } from 'vite'
import glob from 'glob'
import bodyParser from 'body-parser'
const serverConfig = require('./build-ssr/webpack.config.js');
import webpack from 'webpack'
import requireFromString from 'require-from-string'
import MemoryFs from 'memory-fs'

// const fs = new MemoryFs()

const webpackTransformReact: () => ( url: string ) => string = () => {
  const contents = fs.readFileSync(
    path.resolve(
      __dirname, 
      "build-ssr",
      "dist",
      "bundle-server.js" 
    ), 'utf8');
  const a = requireFromString( contents, 'bundle-server.js' );

  return a.app.default
}

const webpackBundleFiles: () => void = () => {

  const comp = webpack( serverConfig )
  comp.outputFileSystem = fs

  comp.run( 
    ( err, stats ) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(
      "running...\n",
      stats!.toString({
        chunks: false, // Makes the build much quieter
        colors: true, // Shows colors in the console
      })
    );
  } )
}

async function createServer() {
  const app = express()

  app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))
  app.use( express.static("build") );

  // parse application/json
  app.use(bodyParser.json( { limit: '50mb' } ))

  const serverCompiler = webpack( serverConfig )
  serverCompiler.outputFileSystem = fs;

  const render_with_webpack = webpackTransformReact()
  webpackBundleFiles()

  app.use( "*", ( req, res ) => {   

    const url = req.originalUrl

    let html = fs.readFileSync(
      path.join( __dirname, "..", "build", "index.html" ),
      "utf-8"
    )

    html = html.replace( 
      `<!-- ssr-outlet -->`, 
      render_with_webpack( url ) 
    )
    console.log( url, render_with_webpack( url ) )

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html) 
  } )

  const PORT = 6173 || process.env.PORT
  app.listen(PORT, () => console.log( `✨ app is running on http://localhost:${ PORT }` ))
}

createServer()