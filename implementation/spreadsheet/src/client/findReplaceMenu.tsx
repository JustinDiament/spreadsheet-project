import { useState, useEffect } from "react";
import { ISpreadSheetState } from "../interfaces/controller-interface";
import { useSpreadsheetController } from "../models/spreadsheet-controller";
import React from "react";

// an interface to define the FindReplaceMenuProps type for the FindReplaceMenu component
interface FindReplaceMenuProps {
  disp:boolean;
}

function FindReplaceMenu({ disp } : FindReplaceMenuProps) {
    // the value to find
    const [find, setFind] = useState<string>("");

    // the value to replace
    const [replace, setReplace] = useState<string>("");

    // a constant to contain the function findCellsContaining in the ISpreadSheetState
    const findCellsContaining = useSpreadsheetController((controller : ISpreadSheetState) => controller.findCellsContaining);

    // a constant to contain the function findNextContaining in the ISpreadSheetState
    const findNextContaining = useSpreadsheetController((controller : ISpreadSheetState) => controller.findNextContaining);

    // a constant to contain the function findAndReplaceAll in the ISpreadSheetState
    const findAndReplaceAll = useSpreadsheetController((controller : ISpreadSheetState) => controller.findAndReplaceAll);

    // a constant to contain the function replaceCurrentCell in the ISpreadSheetState
    const replaceCurrentCell = useSpreadsheetController((controller : ISpreadSheetState) => controller.replaceCurrentCell);

    // if the value of find is changed, let the spreadsheet know
    // it needs to update the list of cells that contain the provided value
    useEffect(() => {
        findCellsContaining(find);
    }, [find, findCellsContaining]);

    useEffect(() => {
        if(!disp) {
            setFind("");
            setReplace("");
            (document.getElementById('find') as HTMLInputElement).value = find;
            (document.getElementById('replace') as HTMLInputElement).value = replace;
        };
    }, [disp, find, replace])
    
    // return the HTML to render the find and replace menu
    return (
        <div className="mx-4 flex-wrap sp-panel-interior"style={disp ? {display:"flex"} : {display:"none"}}>
            <h3 className="w-100">Find and Replace</h3>
            
            <div className="sp-panel-int-body">
                <div>
                    <hr className = {"w-100"}></hr>
                    <h6 className="w-100">Find</h6>
                    {/* enter the value to find */}
                    <input id="find" onChange={(e) => e.currentTarget.textContent != null ? setFind((document.getElementById('find') as HTMLInputElement).value) : console.log("asd")}className="w-100 mb-3"></input>
                    <h6 className="w-100">Replace With</h6>
                    {/* enter the value to replace it with */}
                    <input id="replace" onChange={(e) => e.currentTarget.textContent != null ? setReplace((document.getElementById('replace') as HTMLInputElement).value) : console.log("asd")} className="w-100"></input>
                    <button className="w-100 my-2 border-0" onClick={() => findNextContaining(find)}>find next</button>
                    <button className="w-100 my-2 border-0" onClick={() => replaceCurrentCell(find, replace)}>replace</button>
                    <button className="w-100 my-2 border-0" onClick={() => findAndReplaceAll(find, replace)}>replace all</button>
                </div>
            </div>
        </div>
    ) 
};
// memoize to avoid unnecessary rerenders
export default React.memo(FindReplaceMenu);