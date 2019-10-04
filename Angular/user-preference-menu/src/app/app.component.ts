import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  charts: string[] = ['My Dashboard','My Worklist','ADMINISTRATION','ACTIVITY LOG','MINESTAR','BILLING','SUBSCRIBE ACCOUNTS'];
  result:string;
  droppedMenu(event: CdkDragDrop<string[]>){
    moveItemInArray(this.charts,event.previousIndex,event.currentIndex);
  }
  submit(){
    if(this.charts.join('')==='hello'){
      this.result = "Correct";
    }else{
      this.result = "wrong";
    }
  }
}
