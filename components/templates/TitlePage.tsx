import { createElement, FC } from "react";
import { default as styles } from '../../styles/Hello.module.css'
import ReactDOM from 'react-dom/client'

const TitlePage: FC = () => {
    
    return (
        <h1 className={ styles.title }>
            Title
        </h1>
    )
}

export default TitlePage