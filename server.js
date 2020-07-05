/**
 * if the arg to require() doesn't start with ./, node searches for the module in system modules first,
 * then node_modules directory.
 * if the arg represents a module itself, it's imported as is.
 * but if it represents a directory, node looks for index.js in that directory. usually the index.js exports 
 * all necessary modules.
 * if the arg is a directory, you can also reach out to a specific module in it e.g.
 * var innermodule = require('moduledir/innermodule');
 * 
 * but not every module allows reaching out to an inner module or function.
 */
var http = require('http'),
querystring = require('querystring'),
url = require('url'),
path = require('path'),
fs = require('fs');

var directory = './documents';
var invalidFileNameRegEx = /^[.\ /\\]|\.\./;

var server = http.createServer(function(req, res) {
    if (req.method == "POST") {
        handlePost(req, res);
        return;
    }

    var query = url.parse(req.url, true).query;
    console.log(query);

    if (query.fileName) {
        writeFile(req, res, query.fileName);
        return;
    }

    writeIndex(req, res);
});

function handlePost(req, res) {
    var body = "";

    req.on('data', function(data) {
        body += data;
    });

    req.on('end', function() {
        console.log(body);
        var form = querystring.parse(body);

        if (!form || !form.file || invalidFileNameRegEx.test(form.file)) {
            writeText(req, res, 400, 'Invalid path');
            return;
        }

        try {
            fs.writeFileSync(path.join(directory, form.file), form.content);
            writeIndex(req, res);
        } catch (e) {
            writeText(req, res, 500, 'Unable to write to file');
            console.err(e);
        }
    });
}

function writeFile(req, res, fileName) {
    console.log("fileName: " + fileName);

    if (invalidFileNameRegEx.test(fileName)) {
        writeText(req, res, 400, "Invalid File Name!");
        return;
    }

    var fileContent = "";
    var filePath = path.join(directory, fileName);
    console.log("filePath: " + filePath);

    fs.readFile(filePath, function(err, data) {
        if (err) {
            console.log("error: " + err);
            writeText(req, res, 500, err);
            return;
        }

        fileContent = data.toString();
        console.log("fileContent: " + fileContent);
        writeText(req, res, 200, fileContent);
    });
}

function writeText(req, res, statusCode, textCont) {
    console.log("text: " + textCont);
    res.writeHead(statusCode, {'Content-Type': 'text/plain'});
    res.end(textCont.toString());
}

function writeHtml(req, res, statusCode, html) {
    res.writeHead(statusCode, {'Content-Type': 'text/html'});
    res.end(html);
}

function writeIndex(req, res) {
    fs.readdir(directory, function(err, files) {
        if (err) {
            writeText(req, res, 500, err);
            return;
        }

        var fileNames = "";

        for(var i = 0; i < files.length; i++) {
            var fileName = files[i];
            // var fileBuffer = fs.readFileSync(path.join(directory, fileName));
            fileNames += `<li><a href="?fileName=${fileName}">${fileName}</a></li>`
        }

        var html = `
            read file list:
            <ul>
                ${fileNames}
            </ul>
            <form method="POST">
                <input type="text" name="file"/><p>
                <textarea name="content"></textarea><p>
                <input type="submit"/>
                <input type="file" accept="['.jpeg','.jpg','capture=camera']"/>
            </form>
        `;
        writeHtml(req, res, 200, html);
    });
}

server.listen(5000, function() {
    console.log('server started');
});

