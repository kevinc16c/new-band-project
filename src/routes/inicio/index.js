import React from 'react';
import Search from './Search.jsx';
import './styles.scss'
const URL = 'https://my-json-server.typicode.com/improvein/dev-challenge/db';

export default class Inicio extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			displayDropdown: false,
			current: 1,
		}
	}
	componentDidMount() {
		this.fetchBands();
	}
	fetchBands = (value) => {
		try {
			fetch(`${URL}`, {
				method: 'GET',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then(response => response.json())
				.then(data => {
					this.setState({
						db: data,
						list: data.bands,
					})
				})
		} catch (err) {
			console.log(err)
		}
	}

	handleOnSearch = (value) => {
		let bands = this.state.db.bands
		let pageSize = this.state.pageSize || 50
		if (value === "") return this.setState({ list: bands })
		bands = bands.filter((item, index) => item.name.toUpperCase().includes(value.toUpperCase()) && index < pageSize)
		return this.setState({ list: bands })
	}

	handlePagination = (pageSize) => {
		let bands = this.state.db.bands
		bands = bands.filter((item, index) => index < pageSize)
		return this.setState({ pageSize, list: bands, displayDropdown: false })
	}

	details() {
		const record = this.state.record
		const albums = this.state.db.albums.filter(item => item.bandId === record.id)
		const genre = this.state.db.genre.find(item => item.code === record.genreCode)
		return (
			<div className="col-7" style={{ marginTop: 10 }}>
				<div className="card">
					<div className="card-header">
						<div className="row">
							<div className="col-10">
								<h4 className="media-heading">{record.name}</h4>
							</div>
							<div className="col-2">
								<button type="button" class="btn btn-outline-dark" onClick={() => this.setState({ viewDetail: false, record: false })}>Close</button>
							</div>
						</div>
					</div>
					<div className="card-body">
						<span>Formed in {record.year} - {record.country}</span>
						<br />
						<span>Genre: {genre.name}</span>
						<br />
						<div className="row">
							<div className="col-6">
								<u>Members:</u> <br />
								{record.members.map((member, index) => (
									<li key={index}>{member.name}</li>
								)
								)}
							</div>
							<div className="col-6">
								<u>Albums:</u> <br />
								{albums.map((album, index) => (
									<li key={index}>{album.year} - {album.name}</li>
								)
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	render() {
		return (
			<>
				<div className="container-fluid mt-10">
					<div className="row" style={{ marginTop: 10 }}>
						<Search
							onHandleSearch={this.handleOnSearch}
						/>
					</div>
					<div className="row">
						<table className="table">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">Name</th>
									<th scope="col">Create on</th>
									<th scope="col">Country</th>
								</tr>
							</thead>
							<tbody>
								{this.state.list && this.state.list.map((record, key) => (
									<tr key={key}>
										<th scope="row">{record.id}</th>
										<td>{record.name}</td>
										<td>{record.year}</td>
										<td>{record.country}</td>
										<td><span className="view-more" onClick={() => this.setState({ viewDetail: true, record })}>View more</span></td>
									</tr>
								))
								}
							</tbody>
						</table>
						<div className="row">
							<div className="col-2">
								<div className="dropdown">
									<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true" onClick={() => this.setState({ displayDropdown: !this.state.displayDropdown })}>
										Dropdown button
									</button>
									<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ display: this.state.displayDropdown ? 'block' : 'none' }}>
										<li className="dropdown-item" onClick={(e) => this.handlePagination(5)}>5</li>
										<li className="dropdown-item" onClick={(e) => this.handlePagination(10)}>10</li>
										<li className="dropdown-item" onClick={(e) => this.handlePagination(25)}>25</li>
									</ul>
								</div>
							</div>
						</div>
						<br />
						<div className="row">
							{this.state.viewDetail &&
								this.details()
							}
						</div>
					</div>
				</div>
			</>
		);
	}

}

