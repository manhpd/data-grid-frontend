import { Directive, HostListener } from "@angular/core";

@Directive({
    selector: "[mat-filter-item]",
    standalone: true
})
export class FilterItemDirective {
    @HostListener("click", ["$event"])
    onClick(e: MouseEvent) {
        e.stopPropagation();
        e.preventDefault();

        return false;
    }
}