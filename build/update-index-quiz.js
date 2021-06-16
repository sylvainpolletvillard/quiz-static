//requiring path and fs modules
const fs = require('fs');

fs.readdir('./quiz/', function (err, files) {
    if (err) return console.log('Unable to scan directory: ' + err);

    fs.writeFileSync('index-quiz.json', JSON.stringify(files.map(
        name => name.slice(0, name.lastIndexOf("."))
    )))
});