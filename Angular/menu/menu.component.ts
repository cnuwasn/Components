import { Component, Input } from '@angular/core';
import { menuModal } from './../reusecomp.model';

@Component({
  selector: 'menu-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Input() data: menuModal[];
  @Input() label: string;
  @Input() url: string;
  @Input() activeIndex: number;
  hamburgerActive: boolean = false;
  selectedIndex: number;
  hoveredIndex: number;
  tempActiveIndex: number;

  //
  isChildActive: boolean;
  parentListIndex: number;


  constructor() { }
  hideMenu() {
    this.hamburgerActive = false;
    this.hoveredIndex = undefined;
  }
  toggleActive(index, isParent) {
    this.tempActiveIndex = index;
    this.selectedIndex = this.selectedIndex === index ? undefined : index;
    if (!isParent) {
      this.hideMenu();
      this.activeIndex = this.tempActiveIndex;
      this.isChildActive = false;
      this.parentListIndex = undefined;
    }
  }
  toggleActiveHamburger() {
    this.hamburgerActive = !this.hamburgerActive;
  }
  closeHamburger() {
    this.selectedIndex = undefined;
    this.hideMenu();
  }
  setHoverIndex(index) {
    this.hoveredIndex = index;
    if (window.innerWidth > 1024) {
      this.tempActiveIndex = index;
    }
  }
  isActivatedRoute(val) {
    if (val.isactive) {
      this.isChildActive = val.isactive;
      this.parentListIndex = val.index;
      this.activeIndex = val.index;
    }
  }
}

