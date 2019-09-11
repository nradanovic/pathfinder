import { ASCIIMap } from './asciimap.class';
import { Step, Position } from './pathfinder.class';


export enum EDirection {
	up,
	down,
	left,
	right
}

export class StepFinder {
	private readonly startCharacter: string = '@';
	private readonly endCharacter: string = 'x';
	private readonly cornerCharacter: string = '+';
	private readonly horizontalDirectionCharacter: string = '-';
	private readonly verticalDirectionCharacter: string = '|';
	private readonly noPathCharacter: string = ' ';

	private findPossibleDirections(map: ASCIIMap, step: Step): EDirection[] {
		const characterAtPosition = map.getCharacterAtPosition(map, step.position);
		switch (characterAtPosition) {
			case this.startCharacter:
				return [EDirection.up, EDirection.down, EDirection.left, EDirection.right];

			case this.horizontalDirectionCharacter:
			case this.verticalDirectionCharacter:
				return [step.direction];

			case this.cornerCharacter:
				return this.turnCorner(step.direction);

			case this.endCharacter:
				return [];
			default:
				return [step.direction, ...this.turnCorner(step.direction)];
		}
	}

	private turnCorner(direction: EDirection): EDirection[] {
		switch (direction) {
			case EDirection.left:
			case EDirection.right:
				return [EDirection.up, EDirection.down];

			case EDirection.up:
			case EDirection.down:
				return [EDirection.left, EDirection.right];
		}
	}

	private findNextPositionBasedOnDirection(startPosition: Position, direction: EDirection): Position {
		switch (direction) {
			case EDirection.left:
				return {
					x: startPosition.x - 1,
					y: startPosition.y
				};

			case EDirection.right:
				return {
					x: startPosition.x + 1,
					y: startPosition.y
				};

			case EDirection.up:
				return {
					x: startPosition.x,
					y: startPosition.y - 1
				};

			case EDirection.down:
				return {
					x: startPosition.x,
					y: startPosition.y + 1
				};

			default:
				return startPosition;
		}
	}

	private isValidPosition(map: ASCIIMap, position: Position): boolean {
		const isPositionWithinMap = map.isPositionWithinMap(map, position);
		const isPathCharacter = map.getCharacterAtPosition(map, position) !== this.noPathCharacter;
		return isPositionWithinMap && isPathCharacter;
	}

	private parsePotentialSteps(potentialSteps: Step[], currentDirection: EDirection): Step {
		if (potentialSteps && potentialSteps.length === 1) {
			return potentialSteps[0];
		} else if (potentialSteps && potentialSteps.length > 1) {
			/**
			 * If multiple potential positions exist return step in same direction
			 */
			const newStep = potentialSteps.filter(step => step.direction === currentDirection);
			return newStep[0];
		} else {
			return null;
		}
	}

	private formatStep(map: ASCIIMap, position: Position, direction: EDirection): Step {
		const nextPositionBasedOnDirection = this.findNextPositionBasedOnDirection(position, direction);
		return {
			position: nextPositionBasedOnDirection,
			direction: direction,
			char: map.getCharacterAtPosition(map, nextPositionBasedOnDirection)
		};
	}

	public getNextStep(map: ASCIIMap, currentStep: Step | undefined): Step {
		if (!currentStep) {
			const startCharacterPosition = map.findCharacterPosition(map, this.startCharacter);
			return this.formatStep(map, startCharacterPosition[0], null);
		}

		const potentialSteps = this.findPossibleDirections(map, currentStep)
			.map<Step>((direction: EDirection) => this.formatStep(map, currentStep.position, direction))
			.filter((s: Step) => this.isValidPosition(map, s.position));

		return this.parsePotentialSteps(potentialSteps, currentStep.direction);
	}
}
