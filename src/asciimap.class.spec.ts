import { ASCIIMap, Position } from './asciimap.class';

describe('ASCIIMap class', () => {
	describe('Constructor', () => {

		test('should save raw map data', () => {
			const mapData = '---';
			const asciiMap = new ASCIIMap(mapData);
			expect(asciiMap.MapData).toBe(mapData);
		});

		test('should save map data as matrix', () => {
			const mapData = ``;
			const asciiMap = new ASCIIMap(mapData);
			expect(asciiMap.MapMatrix.length).toBe(1);
			expect(asciiMap.MapMatrix[0].length).toBe(0);
		});

		test('should split map data on new line', () => {
			const mapData = `---\n---`;
			const asciiMap = new ASCIIMap(mapData);
			expect(asciiMap.MapMatrix.length).toBe(2);
			expect(asciiMap.MapMatrix[0].length).toBe(3);
		});

	});

	describe('function isPositionWithinMap', () => {

		test('should return true if position within map', () => {
			const mapData = `---\n---`;
			const asciiMap = new ASCIIMap(mapData);
			const testPosition1: Position = {
				x: 0,
				y: 0
			};
			const isPosition1OnMap = asciiMap.isPositionWithinMap(asciiMap, testPosition1);
			expect(isPosition1OnMap).toBe(true);
			const testPosition2: Position = {
				x: 1,
				y: 1
			};
			const isPosition2OnMap = asciiMap.isPositionWithinMap(asciiMap, testPosition2);
			expect(isPosition2OnMap).toBe(true);
		});

		test('should return false if position outside of map', () => {
			const mapData = `---\n---`;
			const asciiMap = new ASCIIMap(mapData);
			const testPosition1: Position = {
				x: 5,
				y: 5
			};
			const isPosition1OnMap = asciiMap.isPositionWithinMap(asciiMap, testPosition1);
			expect(isPosition1OnMap).toBe(false);
			const testPosition2: Position = {
				x: -5,
				y: -5
			};
			const isPosition2OnMap = asciiMap.isPositionWithinMap(asciiMap, testPosition2);
			expect(isPosition2OnMap).toBe(false);
		});

	});

	describe('function getCharacterAtPosition', () => {

		test('should return character at map position', () => {
			const mapData = `--@--\n-x----`;
			const asciiMap = new ASCIIMap(mapData);
			const testPosition1: Position = {
				x: 2,
				y: 0
			};
			const testPosition2: Position = {
				x: 1,
				y: 1
			};
			const charAtPosition1 = asciiMap.getCharacterAtPosition(asciiMap, testPosition1);
			const charAtPosition2 = asciiMap.getCharacterAtPosition(asciiMap, testPosition2);

			expect(charAtPosition1).toBe('@');
			expect(charAtPosition2).toBe('x');

		});

		test('should return null if character not found', () => {
			const mapData = `--@--\n-x----`;
			const asciiMap = new ASCIIMap(mapData);
			const testPosition1: Position = {
				x: 12,
				y: 10
			};
			const testPosition2: Position = {
				x: -11,
				y: -11
			};
			const charAtPosition1 = asciiMap.getCharacterAtPosition(asciiMap, testPosition1);
			const charAtPosition2 = asciiMap.getCharacterAtPosition(asciiMap, testPosition2);

			expect(charAtPosition1).toBe(null);
			expect(charAtPosition2).toBe(null);

		});
	});

	describe('function findCharacterPosition', () => {

		test('should return array of character positions', () => {
			const mapData = `--@--\n-x----`;
			const asciiMap = new ASCIIMap(mapData);
			const characterPosition = asciiMap.findCharacterPosition(asciiMap, '@');
			expect(characterPosition).toBeInstanceOf(Array);
			expect(characterPosition.length).toBe(1);
			expect(characterPosition[0].x).toBe(2);
			expect(characterPosition[0].y).toBe(0);
		});

		test('should return all character positions', () => {
			const mapData = `--@--\n-@----`;
			const asciiMap = new ASCIIMap(mapData);
			const characterPosition = asciiMap.findCharacterPosition(asciiMap, '@');
			expect(characterPosition).toBeInstanceOf(Array);
			expect(characterPosition.length).toBe(2);
			expect(characterPosition[0].x).toBe(2);
			expect(characterPosition[0].y).toBe(0);
			expect(characterPosition[1].x).toBe(1);
			expect(characterPosition[1].y).toBe(1);
		});

		test('should return empty array if character not found', () => {
			const mapData = `--x--\n-x----`;
			const asciiMap = new ASCIIMap(mapData);
			const characterPosition = asciiMap.findCharacterPosition(asciiMap, '@');
			expect(characterPosition).toBeInstanceOf(Array);
			expect(characterPosition.length).toBe(0);
		});

	});

});