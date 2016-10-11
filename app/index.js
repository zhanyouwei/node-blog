/**
 *
 * @authors hechuanhua (you@example.org)
 * @date    2016-06-05 00:58:23
 * @version $Id$
 */
import React,{Component} from 'react'
import { render } from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import {Provider,connect} from 'react-redux'
import {combineReducers, createStore, applyMiddleware} from "redux"
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory,hashHistory } from 'react-router'
import * as actions from './actions/index'

import stores from './reducers/index'
import Index from './components/index'

import MobBox from './containers/mobBox'
import Nav from './containers/nav'
import TipsBox from './containers/tipsBox'

import "./index.less"


let store = createStore(
	stores,
	applyMiddleware(thunkMiddleware)
)
const About = {
	path: 'about',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			return cb(null, require('./components/about'))
		})
	}
}
const News = {
	path: 'news',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			return cb(null, require('./components/about'))
		})
	}
}
const Search = {
	path: 'search',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			return cb(null, require('./components/search'))
		})
	}
}
const Details = {
	path: '/:name/:date/:title',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			return cb(null, require('./components/article/details'))
		})
	}
}
const Publish = {
	path: 'publish',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			return cb(null, require('./components/article/publish'))
		})
	}
}
const Page404 = {
	path: '*',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			return cb(null, require('./components/Page404'))
		})
	}
}

class App extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		let WinH = document.documentElement.clientHeight
		let wrap = document.querySelector('.container')
		wrap.style.minHeight = (WinH - 270) + "px"
	}

	render() {
		return <div className="page">
			<Nav/>
			<div className="container content">{this.props.children || <Index/>}</div>
			<MobBox />
			<Foot/>
			<TipsBox/>
		</div>
	}
}
const Foot = ()=>(
	<div className="Footer">Youwei zhanyouwei@icloud.com</div>
)

const rootRoute = {
	component: 'div',
	childRoutes: [{
		path: '/',
		component: App,
		childRoutes: [
			Publish,
			About,
			Search,
			Details,
			News,
			Page404
		]
	}]
}
render((
	<Provider store={store}>
		<Router history={hashHistory} routes={rootRoute}>
		</Router>
	</Provider>
), document.getElementById("APP"))