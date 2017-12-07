import * as fs from 'fs';
import { exec } from 'child_process';

const pack = fs.readFileSync('package.json');
const json = JSON.parse(pack.toString());

const [major, minor, patch] = json.version.split('.');

json.version = [major, minor, parseInt(patch) + 1].join('.');

fs.writeFileSync('package.json', JSON.stringify(json, undefined, 4));

exec("git add package.json && git commit -m 'bump patch version'");
