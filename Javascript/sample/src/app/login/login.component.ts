import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  public name:string;
  public smiley:any;
  public image:any;
  public show = false;
  @ViewChild('canvastag') canvas: ElementRef;
  @ViewChild('password') passwordComp: ElementRef;
  constructor() { }

  ngAfterViewInit() {
    setTimeout(()=>{
      this.callInitialRender();
    },1000);
  }
  changeEvent(data:string){
    let xPosition = Math.round((data.length/3)) * 143;
    xPosition = xPosition > 1287 ? 1287 : xPosition;
    this.smiley.render(xPosition,0,this.image);
  }
  userNameFocus(){
    let xPosition = Math.round((this.name.length/3)) * 143;
    xPosition = xPosition > 1287 ? 1287 : xPosition;
    this.image.src = "assets/images/smile.png";
    this.smiley.render(xPosition,0,this.image);
  }
  showPwd(event){
    if(event){
      this.image.src = "assets/images/shhh.png";
      this.smiley.render(143,0,this.image);
      this.passwordComp.nativeElement.type="text";
    }else{
      this.image.src = "assets/images/shhh.png";
      this.smiley.render(0,0,this.image);
      this.passwordComp.nativeElement.type="password";
    }
  }
  passwordFocus(){
    this.image.src = "assets/images/shhh.png";
    this.smiley.render(0,0,this.image);
  }
  callInitialRender(){
    this.image = new Image();
    this.image.src = "assets/images/smile.png";
    this.canvas.nativeElement.width = 142;
    this.canvas.nativeElement.height = 142;
    this.smiley = this.sprite({
        context: this.canvas.nativeElement.getContext("2d"),
        width: 142,
        height: 142
    });
    this.smiley.render(0,0,this.image);
  }

  sprite (options) {
				
    var that = {} as any;
					
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.render = function (x,y,img) {
      that.context.clearRect(0, 0, that.width, that.height);
      that.context.drawImage(
         img,
         x,
         y,
         that.width,
         that.height,
         0,
         0,
         that.width,
         that.height);
    };
    return that;
}

}
