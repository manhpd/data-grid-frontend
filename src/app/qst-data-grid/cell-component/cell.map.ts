import { TextCellComponent } from "./text-component/text.cell.component";
import { ArrayCellComponent } from "./array-component/array.cell.component";

export const CellMap = new Map<string, any>( 
    [
        ['text', TextCellComponent],
        ['array', ArrayCellComponent]
    ]
);