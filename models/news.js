let news = [];
function getNews() {
    fs.readFile('./data/news.json', encoding = 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        users = JSON.parse(data);
        console.log(news);
    });
    return news;
}

module.exports = getNews;