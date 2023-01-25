let cms

getCMSFile = () => fetch('./assets/data/lustrumpage.cms.json')
	.then(res => res.json())
	.then(data => cms = data)

buildNumbersAndFacts = () => {
	if (!cms) return
	const { factsList } = cms.lustrum
	const list = document.getElementById('numbers-and-facts-list')
	for(let item of factsList) {
		const html = `
			<li>
				<span class="amount">${ item.amount }</span>
				<span class="label">${ item.label }</span>
			</li>
		`
		list.insertAdjacentHTML('beforeend', html)
	}
}

buildTimeline = () => {
	if (!cms) return
	const { timeline } = cms.lustrum
	const list = document.getElementById('timeline-list')
	for(let item of timeline) {
		let imgHtml = ''
		if (item.image) imgHtml = `<img src="${ item.image.url }" loading="lazy">`
		const html = `
			<li>
				<article>
					<header>
						<span>${ item.date }</span>
						<h3>${ item.title }</h3>
					</header>
					<div>
						<p>${ item.description }</p>
						${ imgHtml }
					</div>
				</article>
			</li>
		`
		list.insertAdjacentHTML('beforeend', html)
	}
}

buildTimetravel = () => {
	if (!cms) return
	const { teamGrid } = cms.lustrum
	const list = document.getElementById('timetravel-list')
	for(let item of teamGrid) {
		const html = `
			<li>
				<img src="${ item.image.url }" loading="lazy">
			</li>
		`
		list.insertAdjacentHTML('beforeend', html)
	}
}

buildCongratulationsList = () => {
	if (!cms) return
	const { messagesList } = cms
	const list = document.getElementById('congratulations-list')
	for(let item of messagesList) {
		const html = `
			<li>
				<div>
					<p>${ item.date }</p>
				</div>
				<div>
					<p>
						<span>"${ item.body }"</span>
						<span>${ item.author }</span>
					</p>
				</div>
			</li>
		`
		list.insertAdjacentHTML('beforeend', html)
	}
}

init = async () => {
	await getCMSFile()
	buildNumbersAndFacts()
	buildTimeline()
	buildTimetravel()
	buildCongratulationsList()
}

addEventListener('submit', (event) => event.preventDefault())
init()

