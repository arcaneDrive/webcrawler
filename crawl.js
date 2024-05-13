const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

const url = 'https://www.imdb.com/chart/top/?ref_=nv_mv_250';

async function getHTML() {
    try {
        const { data: html } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });
        return html;
    } catch (error) {
        console.error('Error fetching HTML:', error);
        return null;
    }
}

getHTML().then((html) => {
    if (html) {
        const $ = cheerio.load(html);
        const movies = [];

        $('li.ipc-metadata-list-summary-item').each((index, element) => {
            const title = $(element).find('.ipc-title__text').text().trim();
            const year = $(element).find('.cli-title-metadata-item').eq(0).text().trim();
            const duration = $(element).find('.cli-title-metadata-item').eq(1).text().trim();
            const rating = $(element).find('.ipc-rating-star--imdb-rating').text().trim();

            movies.push({ title, year, duration, rating });
        });

        // Convert movies array to CSV format
        const csv = movies.map(movie => Object.values(movie).join(',')).join('\n');

        // Write CSV to file
        fs.writeFile('movies.csv', csv, (err) => {
            if (err) {
                console.error('Error writing CSV file:', err);
            } else {
                console.log('CSV file saved successfully.');
            }
        });
    }
});
