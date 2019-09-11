import * as fs from 'fs';
import * as commander from 'commander';
import { Pathfinder } from './pathfinder.class';

commander.option('-f, --file <path>', 'file path');
commander.parse(process.argv);

try {
	const file = process.argv[2];
	if (!file) {
		throw Error('You must add file param');
	}
	const content = fs.readFileSync(file, { encoding: 'utf8' });
	const pathfinder = new Pathfinder(content);
	console.log(`Path: ${pathfinder.PathString}`);
	console.log(`Collected letters: ${pathfinder.UniquePathCharacters}`);
} catch (error) {
	console.log(error);
}
