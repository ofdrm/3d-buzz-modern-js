var fs = require('fs'),
path = require('path');

var directory = './documents';

module.exports = {
    read: function() {
        fs.readdir(directory, function(err, files) {
            if (err) {
                console.log(err);
                return;
            }

            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                console.log(file);

                var fileBuffer = fs.readFileSync(path.join(directory, file));
                console.log(fileBuffer.toString());
            }
        });
    }
}