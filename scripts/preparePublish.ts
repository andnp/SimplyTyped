import * as fs from 'fs';

const pack = fs.readFileSync('package.json');
const json = JSON.parse(pack.toString());

json.main = 'index';
json.types = 'index.d.ts';
delete json.files;
delete json.private;

fs.writeFileSync('dist/src/package.json', JSON.stringify(json, undefined, 4));

fs.copyFileSync('README.md', 'dist/src/README.md');
