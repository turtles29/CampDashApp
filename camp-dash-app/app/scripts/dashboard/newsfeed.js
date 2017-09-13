const NEWS_API_KEY = 'bdff358621fc463bbf3d45c670234c7d';

let settings = {
	'async': true,
	'crossDomain': true,
	'url': 'https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=' + NEWS_API_KEY,
	'method': 'GET',
	'headers': {
		'cache-control': 'no-cache',
		'postman-token': '18f43ca6-ffe4-6a60-034e-80722e82c891'
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
	let newsContent = response.articles.map(function(article) {
		return `
			<a class="article-card" href="${article.url}" target="_blank">
				<img class="article-img" src="${article.urlToImage}" alt="newsfeed-img" />
				<div class="article-content">
					<span class="article-title">${article.title}</span>
					</div>
				</a>
			</a>
		`;
	});

	const newsTar = document.querySelector('#newsfeed-cards');
	var fullList = '';
		for(i = 0; i < newsContent.length - 6; i++){
			fullList += newsContent[i];
		}
	newsTar.innerHTML = fullList;
});


$('#newsfeed-container').hide();

toggleNewsDiv();

function toggleNewsDiv() {
    $('.newsfeed-buttons').click(function() {
		$('#newsfeed-container').toggle('fast');
        $('#time').toggle('fast');
        $('#greeting-wrap').toggle('fast');
        $('#newsfeed-button').toggle('fast');
		
    });
}