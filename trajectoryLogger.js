var fs = require('fs');
const newline = '\n\r';


module.exports.saveToFile = function (name, trajectory) {
    var filename = 'trajectories/' + name + '.log';
    var line = trajectory.timestamp + '|' + trajectory.batchSize + '|' + trajectory.recordCount + '|' + trajectory.timeElapsed;
    fs.appendFileSync(filename, line + newline);
}

