const fetch = require('node-fetch');
const articleTitle = require('article-title')

const getTitleAtUrl = async (url) =>{
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const responseText = await response.text()
            return articleTitle(responseText);
        }
};

module.exports = {
    getTitleAtUrl
}