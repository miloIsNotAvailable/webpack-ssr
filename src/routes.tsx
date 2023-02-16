// import { AnimatePresence } from 'framer-motion'
import { FC } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
/**
 * 
 * @param context is a require.context function
 * @example ```ts
 * const pages = require.context(
 *  "./pages"   // parent folder
 *  true,       // include subfolders
 *  /\.tsx$/    // match files with regex        
 * )
 * ``` 
 * ---
 * @returns an Object that has a React Function Component
 * and path converted to react-router route:
 * ```ts
 * ({ Component: FC<{}>, page: string })[]
 * ```
 * ---
 * **example usage**
 * @example ```tsx
 * const pages = importAll( require.context("./pages", true, /\.tsx$/) );
 * ...
 * <div>
 *  { pages.map( ( { page, Component } ) => (
 *  <Route path={ page } element={ <Component/> }/>
 * ) ) }
 * </div>
 * ```
 */
const importAll: ( 
    context:  __WebpackModuleApi.RequireContext
) => ( { Component: React.FC<{}>, page: string } )[]
= ( context ) => {

    // map through filenames and 
    // get the default export as component
    // and page name changed to react-router route
    const arr = context.keys().map( ( key: any ) => ( {
        // Function Component
        Component: context( key )?.default,
        // file path changed to react-router route
        // ex. ./hello/[id].tsx -> /hello/:id
        page: key
        // get rid of ./'s 
        // name of parent folder (pages)
        // and .tsx extention
        .replace(/\/pages|\.\/|\.tsx$/g, '')
        .replace( "index", "/" )
        // when I wrote this only god and I knew 
        // what this does, now only god knows
        .replace(/\[\.{3}.+\]/, '*')
        // replacing brackets this way 
        // makes it work for deeply nested files
        // replace [ in [filename] with :
        .replace(/\[/g, ':')
        // replace ] in [filename] with ""
        .replace( /\]/g, "" ) 
      } ) )

    return arr
}

const AppRoutes: FC = () => {

    const routes = importAll( require.context( "../pages", true, /\.tsx$/ ) )
    const location = useLocation()

    console.log( routes )

    return (
        // <AnimatePresence mode="wait">
            <Routes location={ location } key={ location.pathname }>
                { routes.map( ( { Component, page: path } ) =>(
                    <Route 
                        path={ path } 
                        element={ <Component/> }
                        key={ path }
                    />
                ) ) }
            </Routes>
        // </AnimatePresence>
    )
}

export default AppRoutes