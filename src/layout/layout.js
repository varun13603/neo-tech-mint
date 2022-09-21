import React from 'react'
import { Header } from './header'

export const LayoutComponent = (props) => {
    return (
        <div>
            <Header />
            <div className="layout-body">
            {props.children}
            </div>
        </div>
    )
}