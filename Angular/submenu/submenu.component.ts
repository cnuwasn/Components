import { Component, Input, ViewChildren, Output, EventEmitter } from '@angular/core';
import { menuModal } from '../reusecomp.model';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'menu-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.css']
})
export class SubmenuComponent {
  @Input() data: menuModal[];
  @Input() label: string;
  @Input() url: string;
  @Input() isRightSideOpen: boolean;
  @Input() listIndex: number;
  @Output() isActive = new EventEmitter();
  @Output() closeMainMenu = new EventEmitter();
  @ViewChildren('rla') rla: any;
  selectedIndex: number;
  indexData: boolean[] = [];
  isChildActive=false;
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isChildActive = false;
        setTimeout(() => {
            this.rla._results.forEach((element, i) => {
              if (element.isActive === true) {
                this.isChildActive = true;
                this.indexData[i]=true;
              }
              else {
                this.indexData[i]=false;
              }
            });
            if(this.isChildActive) {
              this.emitEvent(this.isChildActive, this.listIndex);
            }
        });

      }
    });
  }
  emitEvent(isactive, index) {
    this.isActive.emit({ isactive: isactive, index: index });
  }
  itemClick(index, forceClose) {
    this.selectedIndex = index;
    if (forceClose) {
      this.indexData[index] = true;
      this.closeMainMenuCaller();
      this.emitEvent(true, this.listIndex);
    }
  }
  closeMainMenuCaller() {
    this.closeMainMenu.emit();
  }
  isActivatedRoute(val) {
    this.indexData.forEach((o, i, a) => {
      a[i] = val.index === i && val.isactive === true ? true:false;
    })
    this.emitEvent(val.isactive, this.listIndex);
  }
}
