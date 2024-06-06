**Spreadsheet Functionality**
* It provides a spreadsheet interface that is accessible via a web browser
    * The default spreadsheet has 10 rows of cells, which are denoted via a number (row 1, 2, 3, etc), as well as 10 columns of cells, which are denoted via a letter (A, B, C, etc)
* Single cells, as well as groups of cells, can be selected. This is visually indicated by a blue highlight over the cell(s). 
* The user can insert more rows and columns using the Edit dropdown menu.
* The user can delete rows and columns using the Edit dropdown menu.
    * If the user attempts to perform a delete that would delete the last row or column, they will be prevented from doing so.
* The user can clear selected cell(s) or all cells using the Edit dropdown menu 
* The user can click a cell to enter it. They can then type text into that cell. The following types of data can be entered into the cell:
    * A string or numerical constant (for instance, “hello” or “5”). 
    * A cell reference which refers to the value contained in another cell in the sheet (for instance, “REF(A1)”). This will display the display value of the cell being referred to.
        * Note that references are absolute. This means that if rows or columns are added that change what literal cell the reference refers to (for instance, there is now a different cell called A1), the reference will now refer to that different cell. 
        * References cannot refer to themselves (or form a loop with other references back to themselves). If they do, an error will be displayed.
        * A malformed reference (such as missing a close parenthesis) will display an error. 
    * A summation range expression (for instance, “SUM(A1..B5)”). This will display the sum of the values in the specified range. 
        * Note that the range is absolute. This means that if rows or columns are added that change what literal cells are in the range (for instance, there is now a new column B and thus new cells B1 through B5), the reference will now refer to those different cells.  
        * Ranges cannot include their own cell in the range. If they do, an error will be displayed.
        * Ranges must have the second value be further to the right and below (or the same location) as the first value. If they are not,  an error will be displayed.
        * A malformed summation range expression (such as missing a close parenthesis) will display an error. 
    * An average range expression (for instance, “AVERAGE(A1..B5)”). This will display the average of the values in the specified range. 
        * Note that the range is absolute. This means that if rows or columns are added that change what literal cells are in the range (for instance, there is now a new column B and thus new cells B1 through B5), the reference will now refer to those different cells.  
        * Ranges cannot include their own cell in the range. If they do, an error will be displayed
        * Ranges must have the second value be further to the right and below (or the same location) as the first value. If they are not,  an error will be displayed.
        * A malformed average range expression (such as missing a close parenthesis) will display an error. 
    * A concatenation of strings using “+” (for instance, "zip+zap" will evaluate to "zipzap" and  "zip + zap" will be evaluated to zip  zap. Note that the quotation marks are just meant for string denotation here in documentation and are not needed in the cell). 
        * A concatenation will be performed for any instance of “+” that is not located between two numbers.
    * An arithmetic formula, made up of the +, -, *, /, and/or ^ operators, numbers, and/or parenthesis. 
        * Formulas will be evaluated using the proper algebraic order of operations
        * A formula containing illegal characters, such as letters, will display an error. 
        * If any formula characters other than a + (namely, -, *, /, and/or ^) are detected, the cell will be considered a formula cell and will be evaluated as such. These characters are “reserved characters”, so putting them in a cell for other reasons will result in an error (for instance, a cell containing “good/bye” would result in displaying an error).
        * A formula cell is allowed to contain as many range expressions and cell references as the user wishes. As long as these expressions and references evaluate to numbers, the formula will work properly (for instance, “REF(A1) * REF(B1)” is legal cell content.
    * A non-formula cell can contain any number of types within it. For instance, if B1 contains 5 and B2 contains 10, “REF(B1) REF(B2) hello SUM(B1..B2)” evaluates to “5 10 hello 15”. 
* Once a user clicks out of a cell they are typing in, it will display the resulting value of their text, using the types of data described above. All cells show their resulting “display” value at all times, unless they are clicked on to edit them, in which case they show their “true” value (for instance, the literal text “REF(A1)”). 
* A cell that is not a formula cell is allowed to contain as many references, concatenations, and/or range expressions as the user wishes (for instance, “REF(A1) REF(B1) SUM(A4..A7)” is a legal cell content). 
* ADDITIONAL FEATURE 1: Find and Replace 
    * The user can perform a “find and replace” by opening the find and replace side menu, opened via the Data dropdown menu 
    * While this menu is open, the user cannot edit cells manually. 
    * In this menu, they can enter text to find and new text to replace that text with. 
    * The text being searched is the “true” value of cells, not the “display” value. 
    * The user can use buttons in this side menu to either immediately replace all values matching the “find” text with the “replace” text, or iterate through all instances of the “find” text one at a time, choosing individually whether to replace them or not one at a time. 
    * When a particular instance of the “find” text is the current one the user is choosing to replace or not, the “true” value of the cell containing it will be shown instead of the “display” value and that cell will be highlighted with the usual “selected” blue highlight. 
* ADDI**T**IONAL FEATURE 2: Data Validation
    * The user is able to specify data validation rules that determine what data is “allowed” in a cell or cells 
    * If a rule for a cell is violated, it will display an error message instead of what would otherwise be the display value 
    * The user can add and remove validation rules from the cell(s) they have currently selected using the data validation side menu, opened via the Data dropdown menu 
    * The available rules to apply are:
        * Allowed to be a word, or required to be a number 
        * Number is equal to/greater than/less than [value of user’s choice]
        * Number or word is one of [value(s) of user’s choice] 
    * Data validation rules apply to the display values of cells, not the “true” values. For instance, in a cell that has a “numbers only” rule, “REF(B1)” is allowed as long as B1 contains a number. 
* ADDITIONAL FEATURE 3: Cell Text Styles
    * The user can change the style of text in the cell(s) they are currently selecting using the buttons in the top right corner.
    * The user can select to bold/unbold, italicize/unitalicize, underline/un-underline, and color the text in cell(s) using these buttons.
    * Style is set on a cell-by-cell basis regardless of the text it contains 
* The user can access a Help popup containing information about how to perform actions in the spreadsheet by clicking the Help button.
* The three additional features are pictured below:
