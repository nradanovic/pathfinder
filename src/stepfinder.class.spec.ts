import { StepFinder } from './stepfinder.class';
import { ASCIIMap } from './asciimap.class';
import { Step, EDirection } from './pathfinder.class';

const startPathMapMap = `

  @`;

const horizontalMapString = `---`;

const verticalMapString = `
|
|
|`;

const horizontalCornerMap = `
-+
 |
`;
const verticalCornerMap = `
|
+-
`;

const charSameDirectionAlphabetMap = `
 |
-F-
 |
`;

const charCornerAlphabetnMap = `

-F
 |
`;

const endPathMapMap = `

  x`;

describe('Pathfinder class', () => {
	describe('getNextStep function', () => {
		test('should return start step without direction if no previous step defined', () => {
			const stepfinder = new StepFinder();
			const map = new ASCIIMap(startPathMapMap);
			const currentStep: Step = null;
			const expectedNextStep: Step = {
				char: '@',
				direction: null,
				position: {
					x: 2,
					y: 2
				}
			};
			const nextStep = stepfinder.getNextStep(map, currentStep);
			expect(nextStep.position.x).toBe(expectedNextStep.position.x);
			expect(nextStep.position.y).toBe(expectedNextStep.position.y);
			expect(nextStep.char).toBe(expectedNextStep.char);
			expect(nextStep.direction).toBe(expectedNextStep.direction);
		});
		test('should return step right from current position if current step is on - character and direction is right', () => {
			const stepfinder = new StepFinder();
			const map = new ASCIIMap(horizontalMapString);
			const currentStep: Step = {
				char: '-',
				direction: EDirection.right,
				position: {
					x: 0,
					y: 0
				}
			};
			const expectedNextStep: Step = {
				char: '-',
				direction: EDirection.right,
				position: {
					x: 1,
					y: 0
				}
			};
			const nextStep = stepfinder.getNextStep(map, currentStep);
			expect(nextStep.position.x).toBe(expectedNextStep.position.x);
			expect(nextStep.position.y).toBe(expectedNextStep.position.y);
			expect(nextStep.char).toBe(expectedNextStep.char);
			expect(nextStep.direction).toBe(expectedNextStep.direction);
		});
		test('should return step left from current position if current step is on - character and direction is left', () => {
			const stepfinder = new StepFinder();
			const map = new ASCIIMap(horizontalMapString);
			const currentStep: Step = {
				char: '-',
				direction: EDirection.left,
				position: {
					x: 2,
					y: 0
				}
			};
			const expectedNextStep: Step = {
				char: '-',
				direction: EDirection.left,
				position: {
					x: 1,
					y: 0
				}
			};
			const nextStep = stepfinder.getNextStep(map, currentStep);
			expect(nextStep.position.x).toBe(expectedNextStep.position.x);
			expect(nextStep.position.y).toBe(expectedNextStep.position.y);
			expect(nextStep.char).toBe(expectedNextStep.char);
			expect(nextStep.direction).toBe(expectedNextStep.direction);
		});
		test('should return step up from current position if current step is on | character and direction is up', () => {
			const stepfinder = new StepFinder();
			const map = new ASCIIMap(verticalMapString);
			const currentStep: Step = {
				char: '|',
				direction: EDirection.up,
				position: {
					x: 0,
					y: 2
				}
			};
			const expectedNextStep: Step = {
				char: '|',
				direction: EDirection.up,
				position: {
					x: 0,
					y: 1
				}
			};
			const nextStep = stepfinder.getNextStep(map, currentStep);
			expect(nextStep.position.x).toBe(expectedNextStep.position.x);
			expect(nextStep.position.y).toBe(expectedNextStep.position.y);
			expect(nextStep.char).toBe(expectedNextStep.char);
			expect(nextStep.direction).toBe(expectedNextStep.direction);
		});
		test('should return step down from current position if current step is on | character and direction is down', () => {
			const stepfinder = new StepFinder();
			const map = new ASCIIMap(verticalMapString);
			const currentStep: Step = {
				char: '|',
				direction: EDirection.down,
				position: {
					x: 0,
					y: 2
				}
			};
			const expectedNextStep: Step = {
				char: '|',
				direction: EDirection.down,
				position: {
					x: 0,
					y: 3
				}
			};
			const nextStep = stepfinder.getNextStep(map, currentStep);
			expect(nextStep.position.x).toBe(expectedNextStep.position.x);
			expect(nextStep.position.y).toBe(expectedNextStep.position.y);
			expect(nextStep.char).toBe(expectedNextStep.char);
			expect(nextStep.direction).toBe(expectedNextStep.direction);
		});

		test('should turn corner and find vertical path if current step is on + character and direction is left or right', () => {
			const stepfinder = new StepFinder();
			const map = new ASCIIMap(horizontalCornerMap);
			const currentStep: Step = {
				char: '+',
				direction: EDirection.right,
				position: {
					x: 1,
					y: 1
				}
			};
			const expectedNextStep: Step = {
				char: '|',
				direction: EDirection.down,
				position: {
					x: 1,
					y: 2
				}
			};
			const nextStep = stepfinder.getNextStep(map, currentStep);
			expect(nextStep.position.x).toBe(expectedNextStep.position.x);
			expect(nextStep.position.y).toBe(expectedNextStep.position.y);
			expect(nextStep.char).toBe(expectedNextStep.char);
			expect(nextStep.direction).toBe(expectedNextStep.direction);
		});

		test('should turn corner and find horizontal path if current step is on + character and direction is up or down', () => {
			const stepfinder = new StepFinder();
			const map = new ASCIIMap(verticalCornerMap);
			const currentStep: Step = {
				char: '+',
				direction: EDirection.down,
				position: {
					x: 0,
					y: 2
				}
			};
			const expectedNextStep: Step = {
				char: '-',
				direction: EDirection.right,
				position: {
					x: 1,
					y: 2
				}
			};
			const nextStep = stepfinder.getNextStep(map, currentStep);
			expect(nextStep.position.x).toBe(expectedNextStep.position.x);
			expect(nextStep.position.y).toBe(expectedNextStep.position.y);
			expect(nextStep.char).toBe(expectedNextStep.char);
			expect(nextStep.direction).toBe(expectedNextStep.direction);
		});
		test('should try to go in same direction if posible if current step is on alphabet character ', () => {
			const stepfinder = new StepFinder();
			const map = new ASCIIMap(charSameDirectionAlphabetMap);
			const currentStep: Step = {
				char: 'F',
				direction: EDirection.right,
				position: {
					x: 1,
					y: 2
				}
			};
			const expectedNextStep: Step = {
				char: '-',
				direction: EDirection.right,
				position: {
					x: 2,
					y: 2
				}
			};
			const nextStep = stepfinder.getNextStep(map, currentStep);
			expect(nextStep.position.x).toBe(expectedNextStep.position.x);
			expect(nextStep.position.y).toBe(expectedNextStep.position.y);
			expect(nextStep.char).toBe(expectedNextStep.char);
			expect(nextStep.direction).toBe(expectedNextStep.direction);
		});

		test('should try to turn corner if there is no path in same direction and current step is on alphabet character ', () => {
			const stepfinder = new StepFinder();
			const map = new ASCIIMap(charCornerAlphabetnMap);
			const currentStep: Step = {
				char: 'F',
				direction: EDirection.right,
				position: {
					x: 1,
					y: 2
				}
			};
			const expectedNextStep: Step = {
				char: '|',
				direction: EDirection.down,
				position: {
					x: 1,
					y: 3
				}
			};
			const nextStep = stepfinder.getNextStep(map, currentStep);
			expect(nextStep.position.x).toBe(expectedNextStep.position.x);
			expect(nextStep.position.y).toBe(expectedNextStep.position.y);
			expect(nextStep.char).toBe(expectedNextStep.char);
			expect(nextStep.direction).toBe(expectedNextStep.direction);
		});
		test('should return null if on x character ', () => {
			const stepfinder = new StepFinder();
			const map = new ASCIIMap(endPathMapMap);
			const currentStep: Step = {
				char: 'x',
				direction: EDirection.right,
				position: {
					x: 2,
					y: 2
				}
			};
			const expectedNextStep: Step = null;
			const nextStep = stepfinder.getNextStep(map, currentStep);
			expect(nextStep).toBe(expectedNextStep);
		});
	});
});
