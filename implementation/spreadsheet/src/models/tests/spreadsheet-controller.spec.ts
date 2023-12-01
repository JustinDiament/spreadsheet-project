/**
 * @file spreadsheet-controller.spec.ts
 * @testing SpreadsheetStateMachine
 */

import { ICell } from "../../interfaces/cell-interface";
import { ICellStyle } from "../../interfaces/cell-style-interface";
import { ISpreadSheetState } from "../../interfaces/controller-interface";
import { IValidationRule } from "../../interfaces/validation-rule-interface";
import { Cell } from "../cell";
import { SpreadsheetStateMachine } from "../spreadsheet-state-machine";

/**
 * small class that implements ISpreadSheetState for testing purposes 
 */

export class TestSpreadsheetState implements ISpreadSheetState {
  cells: ICell[][];
  currentlySelected: ICell[];

  public constructor() {
    this.cells = [];
    this.currentlySelected = [];

  }
  
  setSelectedOne(cell: string): void {
    throw new Error("setSelectedOne not implemented.");
  }
  setSelectedMany(cell1: string, cell2: string): void {
    throw new Error("setSelectedMany not implemented.");
  }
  isSelected(cell: ICell): boolean {
    throw new Error("isSelected not implemented.");
  }
  getSelected(): ICell[] {
    throw new Error("getSelected not implemented.");
  }
  addRow(aboveOrBelow: string): void {
    throw new Error("addRow not implemented.");
  }
  addColumn(leftOrRight: string): void {
    throw new Error("addColumn not implemented.");
  }
  deleteRow(): void {
    throw new Error("deleteRow not implemented.");
  }
  deleteColumn(): void {
    throw new Error("deleteColumn not implemented.");
  }
  editCell(cellId: string, newValue: string): void {
    throw new Error("editCell not implemented.");
  }
  clearSelectedCells(): void {
    throw new Error("clearSelectedCells not implemented.");
  }
  clearAllCells(): void {
    throw new Error("clearAllCells not implemented.");
  }
  createRule(rule: IValidationRule): void {
    throw new Error("createRule not implemented.");
  }
  removeRule(rule: IValidationRule): void {
    throw new Error("removeRule not implemented.");
  }
  getAllRules(): IValidationRule[] {
    throw new Error("getAllRules not implemented.");
  }
  findCellsContaining(find: string): void {
    throw new Error("findCellsContaining not implemented.");
  }
  replaceCurrentCell(find: string, replace: string): void {
    throw new Error("replaceCurrentCell not implemented.");
  }
  findNextContaining(find: string): void {
  }

  findAndReplaceAll(find: string, replace: string): void {
    throw new Error("findAndReplaceAll not implemented.");
  }
  setStyle(isCellStyled: (style: ICellStyle) => boolean, setCellStyle: (style: ICellStyle, value: boolean) => void): void {
    throw new Error("setStyle not implemented.");
  }
  setTextColor(textColor: string): void {
    throw new Error("setTextColor not implemented.");
  }

}

// tests for the SpreadsheetStateMachine class
describe("Testing the SpreadsheetStateMachine class", (): void => {
	let emptyCells: ICell[][];
  let fullCells: ICell[][];
	let currentlySelected: ICell[];
	let currentState: ISpreadSheetState;
  let cell1:ICell;
  let cell2:ICell;

	// set up a new empty spreadsheet state before every test
	beforeEach((): void => {
    currentState= new TestSpreadsheetState();
    // give us an empty grid of cells and a full grid of cells to work with
		emptyCells = [];
    fullCells = [];
		for (let i: number = 0; i < 4; i++) {
			let emptyrow: ICell[] = [];
      let filledRow: ICell[] = [];
			for (let j: number = 0; j < 4; j++) {
				emptyrow.push(new Cell(i, j));
        filledRow.push(new Cell(i, j));
			}
			emptyCells.push(emptyrow);
      fullCells.push(filledRow);
		}

    let i:number = 0;
    fullCells.forEach((row:ICell[]) => row.forEach((cell:ICell) => {cell.setEnteredValue(i.toString()); i++}))

		currentlySelected = [];
		currentState.cells = emptyCells;
		currentState.currentlySelected = currentlySelected;
    cell1 = new Cell(0, 0);
    cell2 = new Cell(2,1);
	});

	// Tests for setSelectedOne(currentState: ISpreadSheetState, cell: string): ISpreadSheetState,
	// setSelectedMany(currentState: ISpreadSheetState, cell1: string, cell2: string): ISpreadSheetState,
	// isSelected(currentState: ISpreadSheetState, cell: ICell): boolean, and
	// getSelected(currentState: ISpreadSheetState): ICell[]
	describe("Testing getters and setter for selected", () => {
    // testing isSelected with empty grid
    it('isSelected should return false if the grid is empty', () => {
      let tempGrid:ICell[][] = [];
      currentState.cells = tempGrid;
      expect(SpreadsheetStateMachine.isSelected(currentState, cell1)).toBe(false);
    });

    // testing isSelected returns false if no cell is selected
    it('isSelected should return false if no cell is selected', () => {
      expect(SpreadsheetStateMachine.isSelected(currentState, cell1)).toBe(false);

    });

    // testing isSelected returns false if an unselected cell is passed
    it('isSelected should return false if an unselected cell is passed', () => {
      currentState.currentlySelected.push(cell1);
      expect(SpreadsheetStateMachine.isSelected(currentState, cell2)).toBe(false);
    });

    // testing isSelected returns true if a selected cell is passed - only one selected
    it('isSelected should return true if single cell is selected', () => {
      currentState.currentlySelected.push(cell1);
      expect(SpreadsheetStateMachine.isSelected(currentState, cell1)).toBe(true);
    });

    // testing isSelected returns true if a selected cell is passed - one of many selected
    it('isSelected should return true if cell is one of many selected', () => {
      currentState.currentlySelected.push(cell1);
      currentState.currentlySelected.push(cell2);
      expect(SpreadsheetStateMachine.isSelected(currentState, cell2)).toBe(true);
    });

    // testing isSelected does not through an error for an out-of-bounds cell location
    it('isSelected should not throw an error if given an out of bounds cell', () => {
      let outOfBounds:ICell = new Cell(5, 5);
      expect(() => SpreadsheetStateMachine.isSelected(currentState, outOfBounds)).not.toThrow();
    });

    // testing getSelected returns nothing if no cell is selected
    it('getSelected should return an empty list if no cell selected', () => {
      expect(SpreadsheetStateMachine.getSelected(currentState)).toEqual(new Array<ICell>());
    });

    // testing getSelected does not through an error if the grid has no cells
    it('getSelected should not through an error if the grid has no cells', () => {
      let tempGrid:ICell[][] = [];
      currentState.cells = tempGrid;
      expect(() => SpreadsheetStateMachine.getSelected(currentState)).not.toThrow();
    });

    // testing getSelected returns a single selected cell
    it('getSelected should return an an array containing a single selected cell', () => {
      currentState.currentlySelected.push(cell2);
      expect(SpreadsheetStateMachine.getSelected(currentState)).toEqual([cell2]);
    });

    // testing getSelected returns multiple cells
    it('getSelected should return an array of multiple selected cells', () => {
      currentState.currentlySelected.push(cell2);
      currentState.currentlySelected.push(cell1);
      expect(SpreadsheetStateMachine.getSelected(currentState)).toEqual([cell2, cell1]);

    });


    // testing setSelectedOne returns ISpreadSheetState with the right cell selected
    it('currentlySelected should contain the cell sent to set select one', () => {
      SpreadsheetStateMachine.setSelectedOne(currentState, "A1");
      expect(currentState.currentlySelected).toEqual([cell1]);
    });

    // testing setSelectOne does not throw an error for an out-of-bounds cell location
    it('set select one should not throw an error for an out of bounds cell location', () => {
      SpreadsheetStateMachine.setSelectedOne(currentState, "A1");
      expect(() => SpreadsheetStateMachine.setSelectedOne(currentState, "G1")).not.toThrow();
    });

    // testing setSelectOne does not throw an error for an invalid cell location
    it('set select one should not throw an error for an invalid cell location syntax', () => {
      expect(() => SpreadsheetStateMachine.setSelectedOne(currentState, "01")).not.toThrow();
    });

    // testing setSelectedMany returns ISpreadSheetState with the right cells selected -- many in one row
    it('currentlySelected should contain cells in one row sent to set select many', () => {
      let cell3:ICell = new Cell(0,1);
      SpreadsheetStateMachine.setSelectedMany(currentState, "A1", "B1");
      expect(currentState.currentlySelected).toEqual([cell1, cell3]);
    });

    // testing setSelectedMany returns ISpreadSheetState with the right cells selected -- many in one column
    it('currentlySelected should contain cells in one column sent to set select many', () => {
      let cell3:ICell = new Cell(1,0);
      SpreadsheetStateMachine.setSelectedMany(currentState, "A1", "A2");
      expect(currentState.currentlySelected).toEqual([cell1, cell3]);
    });

    // testing setSelectedMany returns ISpreadSheetState with the right cells selected -- many in multiple rows and columns
    it('currentlySelected should contain cells in multiple columns and rows sent to set select many', () => {
      let cell3:ICell = new Cell(0,1);
      let cell4:ICell = new Cell(1,0)
      let cell5:ICell = new Cell(1,1)
      SpreadsheetStateMachine.setSelectedMany(currentState, "A1", "B2");
      expect(currentState.currentlySelected).toEqual([cell1, cell3, cell4, cell5]);
    });

    // testing setSelectedMany returns ISpreadSheetState with the right cells selected -- first selected is below and right of last selected
    it('currentlySelected should contain cells in multiple columns and rows in reverse order sent to set select many', () => {
      let cell3:ICell = new Cell(0,1);
      let cell4:ICell = new Cell(1,0)
      let cell5:ICell = new Cell(1,1)
      SpreadsheetStateMachine.setSelectedMany(currentState, "B2", "A1");
      expect(currentState.currentlySelected).toEqual([cell1, cell3, cell4, cell5]);
    });

    // testing setSelectedMany does not throw an error for an out-of-bounds cell location
    it('set select many should not throw an error for a cell out of bounds', () => {
      expect(() => SpreadsheetStateMachine.setSelectedMany(currentState, "A1", "C6")).not.toThrow();
    });

    // testing setSelectedMany does not throw an error for an invalid cell location
    it('set select many should not throw an error for an invalid cell location syntax', () => {
      expect(() => SpreadsheetStateMachine.setSelectedMany(currentState, "B2", "01")).not.toThrow();
    });

  });

	// Tests for addRow(currentState: ISpreadSheetState, aboveOrBelow: string): ISpreadSheetState,
	// addColumn(currentState: ISpreadSheetState, leftOrRight: string): ISpreadSheetState,
	// deleteRow(currentState: ISpreadSheetState): ISpreadSheetState, and
	// deleteColumn(currentState: ISpreadSheetState): ISpreadSheetState
	describe("Testing add and delete columns and rows", () => {

    let twoByone: ICell[][];
    let twoBytwo: ICell[][];
    let threeBytwo: ICell[][];

    beforeEach((): void => {
    twoByone = [[cell1, new Cell(1, 0)]];
    twoByone = [[], [], []]
    let threeBy
    // give us an empty grid of cells and a full grid of cells to work with
		emptyCells = [];
    fullCells = [];
		for (let i: number = 0; i < 4; i++) {
			let emptyrow: ICell[] = [];
      let filledRow: ICell[] = [];
			for (let j: number = 0; j < 4; j++) {
				emptyrow.push(new Cell(i, j));
        filledRow.push(new Cell(i, j));
			}
			emptyCells.push(emptyrow);
      fullCells.push(filledRow);
		}

    let i:number = 0;
    fullCells.forEach((row:ICell[]) => row.forEach((cell:ICell) => {cell.setEnteredValue(i.toString()); i++}))

		currentlySelected = [];
		currentState.cells = emptyCells;
		currentState.currentlySelected = currentlySelected;
    cell1 = new Cell(0, 0);
    cell2 = new Cell(2,1);
	});

    // Testing addRow above results in the correct amount of rows
    it('addRow above with one selected cell results in the correct amount of rows', () => {
      // Set currentlySelected to a cell in the top row
      currentState.currentlySelected = [cell1];

      // Add a row above
      SpreadsheetStateMachine.addRow(currentState, "above");

      // Check that there are now 5 rows instead of 4
      expect(currentState.cells.length).toEqual(5)
    });

    // Testing addRow below results in the correct amount of rows
    it('addRow below with one selected cell results in the correct amount of rows', () => {
      // Set currentlySelected to a cell in the top row
      currentState.currentlySelected = [cell1];

      // Add a row below
      SpreadsheetStateMachine.addRow(currentState, "below");

      // Check that there are now 5 rows instead of 4
      expect(currentState.cells.length).toEqual(5)
    });

    // // testing addRow above with multiple selected results in the correct value of cells
    // it('addRow above with multiple selected cells results in the correct value of cells', () => {
    //   // testing addRow below results in the correct amount of cells
    //   it('addRow below with one selected cell results in the correct value of cells', () => {
    //     cell1.setEnteredValue("hello");
    //     currentState.currentlySelected = [cell1, ];
    //     SpreadsheetStateMachine.addRow(currentState, "below");
    //     expect(currentState.cells.length).toEqual(5)
    //   });
    // });

    // // testing addRow below with multiple selected results in the correct value of cells
    // it('addRow below with multiple selected cells results in the correct value of cells', () => {

    // });

    // // testing addRow with no cells selected causes no change in the value of cells
    // it('addRow with no cells selected causes no change in the value of cells', () => {

    // });

    // Testing addColumn left results in the correct amount of columns
    it('addColumn left with one selected cell results in the correct amount of columns', () => {
      // Set currentlySelected to a cell in the left column
      currentState.currentlySelected = [cell1];
        
      // Add a column to the left
      SpreadsheetStateMachine.addColumn(currentState, "left");

      // Check that there are now 5 columns instead of 4
      expect(currentState.cells[0].length).toEqual(5)
    });

    // Testing addColumn right results in the correct amount of columns
    it('addColumn right with one selected cell results in the correct amount of columns', () => {
      // Set currentlySelected to a cell in the left column
      currentState.currentlySelected = [cell1];

      // Add a column to the right
      SpreadsheetStateMachine.addColumn(currentState, "right");

      // Check that there are now 5 columns instead of 4
      expect(currentState.cells[0].length).toEqual(5)
    });

    // // testing addColumn left with multiple selected results in the correct value of cells
    // it('addColumn left with multiple selected cells results in the correct value of cells', () => {

    // });

    // // testing addColumn right with multiple selected results in the correct value of cells
    // it('addColumn right with multiple selected cells results in the correct value of cells', () => {

    // });

    // testing addColumn with no cells selected causes no change in the value of cells

    // Test that adding a column with nothing selected does not add any columns
    it('addColumn with no cells selected causes no change in the number of columns', () => {
      // Set currentlySelected to no cells
      currentState.currentlySelected = [];

      // "Add" a column right, but nothing should be added
      SpreadsheetStateMachine.addColumn(currentState, "right");

      // Check that there are still 4 columns
      expect(currentState.cells[0].length).toEqual(4)
    });

    // Test that adding a row with nothing selected does not add any rows
    it('addRow with no cells selected causes no change in the number of rows', () => {
      // Set currentlySelected to no cells
      currentState.currentlySelected = [];
      
      // "Add" a row above, but nothing should be added
      SpreadsheetStateMachine.addRow(currentState, "above");

      // Check that there are still 4 rows
      expect(currentState.cells.length).toEqual(4)
    });

    // testing delete row with one selected row and more than one row in the grd

    // testing delete row with multiple selected rows, less than the number of rows in the grid

    // testing delete row where number of selected rows equal number of cell rows

    // testing delete row with no cell selected

    // testing delete column with one selected column and more than column row in the grd

    // testing delete column with multiple selected column, less than the number of column in the grid

    // testing delete column where number of selected column equal number of cell column

    // testing delete column with no cell selected

  });

  // Tests on find and replace functions
  describe("Find and replace", ()=> {
    // Test finding the first instance of a word in the grid
    it('should find the first instance of hi', () => {
      // Set up a grid with 3 "hi"
      emptyCells[1][1].setEnteredValue('hi');
      emptyCells[2][2].setEnteredValue('hi');
      emptyCells[3][3].setEnteredValue('hi');

      // Find the first one
      SpreadsheetStateMachine.findCellsContaining(currentState, 'hi');

      // Check that the first instance of hi was found
      expect(currentState.currentlySelected[0]).toEqual(emptyCells[1][1]);
    });

    // Test finding the first instance of a word that is not in the grid
    it('should not find bye and currentlySelected should be empty', () => {
      // Set up a grid with 3 "hi"
      emptyCells[1][1].setEnteredValue('hi');
      emptyCells[2][2].setEnteredValue('hi');
      emptyCells[3][3].setEnteredValue('hi');

      // Find the first bye, which doesn't exist
      SpreadsheetStateMachine.findCellsContaining(currentState, 'bye');

      // Check that currentlySelected is empty as a result
      expect(currentState.currentlySelected).toEqual([]);
    });

    // Test that currentlySelected moves up to the next instance of the find word
    // when findNextContaining is called
    it('should move up to the next instance of hi', () => {
      // Set up a grid with 3 "hi"
      emptyCells[1][1].setEnteredValue('hi');
      emptyCells[2][2].setEnteredValue('hi');
      emptyCells[3][3].setEnteredValue('hi');

      // Set currentlySelected to the first instance of hi
      currentState.currentlySelected = [emptyCells[1][1]];

      // Find the next instance of hi and check that it is now selected
      SpreadsheetStateMachine.findNextContaining(currentState, 'hi');
      expect(currentState.currentlySelected).toEqual([emptyCells[2][2]]);
    });

    // Test that replaceCurrentCell replaces the current cell that is selected
    it('should replace the first instance of hi with bye', () => {
      // Set up a grid with 3 "hi"
      emptyCells[1][1].setEnteredValue('hi');
      emptyCells[2][2].setEnteredValue('hi');
      emptyCells[3][3].setEnteredValue('hi');

      // Set currentlySelected to the first instance of hi
      currentState.currentlySelected = [emptyCells[1][1]];

      // Replace the currently selected instance of hi with bye and check that this occured
      SpreadsheetStateMachine.replaceCurrentCell(currentState, 'hi', 'bye');
      expect(emptyCells[1][1].getEnteredValue()).toEqual('bye');
    });

    // Test that nothing is replaced by replaceCurrentCell if nothing is selected
    it('should replace nothing', () => {
      // Set up a grid with 3 "hi"
      emptyCells[1][1].setEnteredValue('hi');
      emptyCells[2][2].setEnteredValue('hi');
      emptyCells[3][3].setEnteredValue('hi');
      
      // Set currentlySelected to no cell
      currentState.currentlySelected = [];

      // "Replace" hi with bye, but check that nothing actually happened because nothing was selected
      SpreadsheetStateMachine.replaceCurrentCell(currentState, 'hi', 'bye');
      expect(emptyCells[1][1].getEnteredValue()).toEqual('hi');
    });

    // Test find and replace all replacces all instances, part 1
    it('should replace the first hi with bye (among others)', () => {
      // Set up a grid with 3 "hi"
      emptyCells[1][1].setEnteredValue('hi');
      emptyCells[2][2].setEnteredValue('hi');
      emptyCells[3][3].setEnteredValue('hi');

      // Do a find and repalce all and check that this included replacing the first hi
      SpreadsheetStateMachine.findAndReplaceAll(currentState, 'hi', 'bye');
      expect(emptyCells[1][1].getEnteredValue()).toEqual('bye');
    });

    // Test find and replace all replacces all instances, part 2
    it('should replace the second hi with bye (among others)', () => {
      // Set up a grid with 3 "hi"
      emptyCells[1][1].setEnteredValue('hi');
      emptyCells[2][2].setEnteredValue('hi');
      emptyCells[3][3].setEnteredValue('hi');

      // Do a find and repalce all and check that this included replacing the second hi
      SpreadsheetStateMachine.findAndReplaceAll(currentState, 'hi', 'bye');
      expect(emptyCells[2][2].getEnteredValue()).toEqual('bye');
    });

    // Do a find and repalce all and check that this included replacing the third hi
    it('should replace the third hi with bye (among others)', () => {
      // Set up a grid with 3 "hi"
      emptyCells[1][1].setEnteredValue('hi');
      emptyCells[2][2].setEnteredValue('hi');
      emptyCells[3][3].setEnteredValue('hi');

      // Do a find and repalce all and check that this included replacing the third hi
      SpreadsheetStateMachine.findAndReplaceAll(currentState, 'hi', 'bye');
      expect(emptyCells[3][3].getEnteredValue()).toEqual('bye');
    });
  })

	// Tests for editCell(currentState: ISpreadSheetState, cellId: string, newValue: string): ISpreadSheetState,
	// clearSelectedCells(currentState: ISpreadSheetState): ISpreadSheetState, and
	// clearAllCells(currentState: ISpreadSheetState): ISpreadSheetState
	describe("Testing edit, clear selected, and clear all cells", () => {
    // test the entered value of a cell after editCell with valid cellID
    it('test editCell changes the entered value of a cell at the given location', () => {

    });

    // test that edit cell does not throw error if invalid cellID provided

    // test clearing one selected cell with content works

    // test clearing multiple selected cells with content works

    // test clearing multiple empty cells results in the same value of cells

    // test clearing all cells with one nonempty cell

    // test clearing all cells with multiple nonempty cells


    


  });

	// Tests for createRule(currentState: ISpreadSheetState, rule: IValidationRule): ISpreadSheetState,
	// removeRule(currentState: ISpreadSheetState, rule: IValidationRule): ISpreadSheetState, and
	// getAllRules(currentState: ISpreadSheetState): IValidationRule[]
	describe("Testing create, delete, and get all rules", () => {


  });

	// Tests for findCellsContaining(currentState: ISpreadSheetState, find: string): ISpreadSheetState,
	// replaceCurrentCell(currentState: ISpreadSheetState, find: string, replace: string): ISpreadSheetState,
	// findNextContaining(currentState: ISpreadSheetState, find: string): ISpreadSheetState, and
	// findAndReplaceAll(currentState: ISpreadSheetState, find: string, replace: string): ISpreadSheetState
	describe("Testing find cells containing, find next containing, replace current or all cells", () => {


  });

  // Tests for setStyle(currentState: ISpreadSheetState, isCellStyled: (style: ICellStyle) => boolean, 
  //                    setCellStyle: (style: ICellStyle, value: boolean) => void): ISpreadSheetState, and
  // setTextColor(currentState: ISpreadSheetState, textColor: string): ISpreadSheetState
  describe("Testing set style and set text color", () => {

    // Tests that a currently selected cell's can be set with setTextColor
    it('currentlySelected cells should change color with setTextColor', () => {
      // Set up currently selected to contain a cell
      currentState.currentlySelected = [new Cell(0, 0)];

      // Set the text color to white
      SpreadsheetStateMachine.setTextColor(currentState, "#FFFFFF");
      
      // Check that the color of the text in the cell is now white
      expect(currentState.currentlySelected[0].getStyle().getTextColor()).toEqual("#FFFFFF");
    });
  });


 

});


