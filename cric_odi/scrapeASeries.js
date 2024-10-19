
//   await page.goto('https://www.espncricinfo.com/series/nepal-in-hong-kong-2023-24-1423436/match-schedule-fixtures-and-results', { waitUntil: 'networkidle0' });

const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');

// (async () => {
//   try {
//     // Perform GET request to fetch page HTML
//     const response = await axios.get('https://www.espncricinfo.com/series/nepal-in-hong-kong-2023-24-1423436/match-schedule-fixtures-and-results'); // Replace with actual URL

//     // Load the HTML response into cheerio for parsing
//     const $ = cheerio.load(response.data);

//     // Extract the JSON from the <script> tag
//     const jsonData = $('#__NEXT_DATA__').html();

//     if (jsonData) {
//       // Save the JSON data to a file
//       fs.writeFileSync('data.json', jsonData, 'utf-8');
//       console.log('JSON saved to data.json');
//     } else {
//       console.error('Could not find the JSON data in the script tag.');
//     }

//   } catch (error) {
//     console.error('Error fetching the page:', error);
//   }
// })();

async function getHtmlUsingLinkAndStoreInFile(url,filename)
{
  try {
    // Perform GET request to fetch page HTML
    const response = await axios.get(url); // Replace with actual URL

    // Load the HTML response into cheerio for parsing
    const $ = cheerio.load(response.data);

    // Extract the JSON from the <script> tag
    const jsonData = $('#__NEXT_DATA__').html();

    if (jsonData) {
      // Save the JSON data to a file
      fs.writeFileSync(filename, jsonData, 'utf-8')
      console.log(`JSON saved to ${filename}`);
    } else {
      console.error('Could not find the JSON data in the script tag.');
    }

  } catch (error) {
    console.error('Error fetching the page:', error);
  }
}

module.exports = {getHtmlUsingLinkAndStoreInFile}
