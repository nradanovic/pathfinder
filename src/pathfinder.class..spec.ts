import { Pathfinder } from './pathfinder.class';
import { ASCIIMap } from './asciimap.class';

const map1 = `
  @---A---+
          |
  x-B-+   C
      |   |
      +---+`;

const map2 = `
  @
  | C----+
  A |    |
  +---B--+
    |      x
    |      |
    +---D--+`;

const map3 = `
  @---+
      B
K-----|--A
|     |  |
|  +--E  |
|  |     |
+--E--Ex C
   |     |
   +--F--+`;

const invalidMap1 = `
  @---A---+
          @
  x-B-+   C
      |   |`;

const invalidMap2 = `
K-----|--A
|     |  |
|  +--E  |
|  |     |
+--E--Ex C`;

describe('Pathfinder class', () => {
	describe('Constructor', () => {
		test('should create map', () => {
			const pathfinder = new Pathfinder(map1);
			expect(pathfinder.Map).toBeTruthy();
			expect(pathfinder.Map).toBeInstanceOf(ASCIIMap);
		});
	});

	describe('Map getter', () => {
		test('should return map class', () => {
			const pathfinder = new Pathfinder(map1);
			expect(pathfinder.Map.MapData).toBe(map1);
		});
	});

	describe('PathString getter', () => {
		test('should return string of characters found on path', () => {
			const pathfinder1 = new Pathfinder(map1);
			const pathForMap1 = '@---A---+|C|+---+|+-B-x';
			expect(pathfinder1.PathString).toBe(pathForMap1);

			const pathfinder2 = new Pathfinder(map2);
			const pathForMap2 = '@|A+---B--+|+----C|-||+---D--+|x';
			expect(pathfinder2.PathString).toBe(pathForMap2);

			const pathfinder3 = new Pathfinder(map3);
			const pathForMap3 = '@---+B||E--+|E|+--F--+|C|||A--|-----K|||+--E--Ex';
			expect(pathfinder3.PathString).toBe(pathForMap3);
		});
		test('should throw error if map has multiple start positions', () => {
			const pathfinder1 = new Pathfinder(invalidMap1);
			const error = Error('Invalid map - Multiple start characters found on map');
			expect(() => pathfinder1.PathString).toThrowError(error);
		});

		test('should throw error if map has no start position', () => {
			const pathfinder1 = new Pathfinder(invalidMap2);
			const error = Error('Invalid map - Start character not found on map');
			expect(() => pathfinder1.PathString).toThrowError(error);
		});
	});

	describe('UniquePathCharacters getter', () => {
		test('should return unique characters found on path', () => {
			const pathfinder1 = new Pathfinder(map1);
			const uniqueCharactersForMap1 = 'ACB';
			expect(pathfinder1.PathString).toBeTruthy();
			expect(pathfinder1.UniquePathCharacters).toBe(uniqueCharactersForMap1);

			const pathfinder2 = new Pathfinder(map2);
			const uniqueCharactersForMap2 = 'ABCD';
			expect(pathfinder1.PathString).toBeTruthy();
			expect(pathfinder2.UniquePathCharacters).toBe(uniqueCharactersForMap2);

			const pathfinder3 = new Pathfinder(map3);
			const uniqueCharactersForMap3 = 'BEEFCAKE';
			expect(pathfinder1.PathString).toBeTruthy();
			expect(pathfinder3.UniquePathCharacters).toBe(uniqueCharactersForMap3);
		});

		test('should throw error if map has multiple start positions', () => {
			const pathfinder1 = new Pathfinder(invalidMap1);
			const error = Error('Invalid map - Multiple start characters found on map');
			expect(() => pathfinder1.PathString).toThrowError(error);
		});

		test('should throw error if map has no start position', () => {
			const pathfinder1 = new Pathfinder(invalidMap2);
			const error = Error('Invalid map - Start character not found on map');
			expect(() => pathfinder1.PathString).toThrowError(error);
		});
	});
});
