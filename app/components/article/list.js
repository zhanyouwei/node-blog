/**
 * @author: Jason.友伟 zhanyouwei@meitunmama.com
 * Created on 2016/10/11.
 * 文章列表
 */


import React,{Component} from 'react';
import { render } from 'react-dom';
import * as actions from './../../actions/index';
import { Link,IndexLink } from 'react-router';

import './list.less';

const ArticleItem = ({data})=> {
	return (
		<li>
			<article>
				<h1 className="title">
					<a href={"/#"+data.name+"/"+data.time.day+"/"+data.title}>
						{data.title}
					</a>
				</h1>
				<p className="describe">{data.neirong ? data.neirong.substr(0, 50) : ""}...</p>
				<p className="info">作者：{data.name} 阅读量：{data.pv} 发布时间：{data.time.minute}</p>
			</article>
		</li>
	)
};
class PageLi extends Component {
	swtichPage() {
		let type = this.props.type;
		if (type == "index") {
			this.props.ajaxData(type, this.props.currenNum)
		} else if (type == "search") {
			this.props.ajaxData(this.props.keyword, this.props.currenNum)
		}
	}

	render() {
		let currenNum = this.props.currenNum
		let type = this.props.type, pathname = "", query = {}, keyword = this.props.keyword
		if (type == "index") {
			pathname = "/", query = {page: currenNum}
		}
		if (type == "search") {
			pathname = "search", query = {page: currenNum, keyword: keyword}
		}
		return <li onClick={()=>{this.swtichPage()}}><Link to={{ pathname: pathname, query: query }}
		                                                   activeClassName="active">{currenNum}</Link></li>
	}
}
const ArticleList = ({articleList,articleAction,type,keyword})=> {
	let articleTmp = [], pageTmp = [], pageNum = 0;
	if (articleList && articleList.data && articleList.data.length) {
		let data = articleList.data, page = articleList["page"]
		pageNum = Math.ceil(page.count / page.limitNum)//页码最大条数
		for (let i = 0; i < data.length; i++) {
			articleTmp.push(<ArticleItem key={i} data={data[i]}/>)
		}
		if (pageNum > 1) {
			for (let i = 1; i <= pageNum; i++) {
				pageTmp.push(<PageLi key={i} currenNum={i} ajaxData={articleAction} type={type} keyword={keyword}/>)
			}
		}
	}
	return (
		<div>
			<ul className="article-list-container">
				{articleTmp.length ? articleTmp : "无搜索结果"}
			</ul>
			<div className="pageListBox">
				<ul className="pageList">
					{pageTmp}
				</ul>
			</div>
		</div>
	)
};

export default ArticleList
