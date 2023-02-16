import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
const serverConfig = require('./build-ssr/webpack.config.js');
import webpack from 'webpack'
import requireFromString from 'require-from-string'

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

const serverCompiler = webpack( serverConfig )
serverCompiler.outputFileSystem = fs;

const render_with_webpack = webpackTransformReact()
webpackBundleFiles()

export default async function handler ( req: Request, res: Response ) {
    const url = req.originalUrl

    console.log( url )
  
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
  
}