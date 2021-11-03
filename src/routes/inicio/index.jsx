import React from 'react';

export default function Inicio() {
	const fetch = () => {
		try {
			const req = `${URL}&term=${this.state.terms}&limit=${this.state.limit + 25}&offset=${this.state.offset + 25}`;
			fetch(req, {
				method: 'POST',
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
						list: [...this.state.list, ...data.results],
						offset: this.state.offset + 25,
						limit: this.state.limit + 25,
					})
				})
		} catch (err) {
			console.log(err)
		}
	}
	return (
		<>
			<div className="container-fluid">
				<div className="row">
					<div className="col-sm-12 col-md-12">
						<div className="row">
							<ul className="media-list">
								s
								{/* {this.state.list.map((r, key) => (
										<li key={key} className="media">
											<div className="media-left">
												<img className="media-object" src={r.artworkUrl60} alt="No Artwork" width="60" height="60" />
											</div>
											<div className="media-body">
												<h5 className="media-heading">{`${r.artistName}${r.collectionName ? ' - ' + r.collectionName : ''} (${r.trackCensoredName})`}</h5>
												<span className="tag tag-pill tag-info">{r.wrapperType}</span>{" "}
												<span className="tag tag-pill tag-info">{r.collectionType}</span>{" "}
												<span className="tag tag-pill tag-info">{r.kind}</span>{" "}
												{r.trackName}
											</div>
											<div className="media-right">
												<button
													type="button"
													onClick={this.handleToggle(key)}
													className={'btn media-object btn-outline-' + (this.state.toggles[key] ? 'warning' : 'primary')}
												>
													{this.state.toggles[key] ? 'Unf' : 'F'}avourite
												</button>
											</div>
										</li>
									))} */}

							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);

}