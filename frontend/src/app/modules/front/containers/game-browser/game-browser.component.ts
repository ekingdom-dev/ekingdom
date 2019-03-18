import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { mapObjectsSeed } from './game-browser-map-seed';

@Component({
  selector: 'app-game-browser',
  templateUrl: './game-browser.component.html',
  styleUrls: ['./game-browser.component.scss']
})
export class GameBrowserComponent implements OnInit, AfterViewInit {
  activeDragging = false;
  ctx = null;
  currentSecond = 0;
  currentX = 0.0;
  currentY = 0.0;
  lastClickX = 0;
  lastClickY = 0;
  lastClickObjectX = 0;
  lastClickObjectY = 0;
  displayVillageDialogTip = false;
  frameCount = 0;
  framesLastSecond = 0;
  gameMap = mapObjectsSeed;
  mapH = 200;
  mapW = 200;
  minimalDistanceFromBorder = 0.001;
  navigationMultiplier = 1;
  navigationStep = 0.4;
  tileH = 50;
  tileW = 50;
  viewportX = 5;
  viewportY = 5;

  tiles: HTMLImageElement[] = [];

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(event.target.innerWidth, event.target.innerHeight);
    this.viewportX = event.target.innerWidth / this.tileW;
  }

  constructor() {
  }

  ngAfterViewInit(): void {
    this.ctx = (document.getElementById('game') as HTMLCanvasElement).getContext('2d');
    this.drawGame();
    this.ctx.font = 'bold 10pt sans-serif';
  }

  ngOnInit(): void {
    this.tiles['grass'] = new Image();
    this.tiles['grass_with_stones'] = new Image();
    this.tiles['forest'] = new Image();
    this.tiles['water'] = new Image();
    this.tiles['village'] = new Image();
    this.tiles['village_with_church'] = new Image();
    this.tiles['grass'].src = 'assets/img/tiles/trawa.png';
    this.tiles['grass_with_stones'].src = 'assets/img/tiles/trawa_kamienie.png';
    this.tiles['forest'].src = 'assets/img/tiles/las.png';
    this.tiles['water'].src = 'assets/img/tiles/woda.png';
    this.tiles['village'].src = 'assets/img/tiles/wioska.png';
    this.tiles['village_with_church'].src = 'assets/img/tiles/wioska_kosciol.png';
    this.viewportX = window.innerWidth / this.tileW;
    this.viewportY = window.innerHeight / this.tileH;
  }

  drawGame(): void {
    const sec = Math.floor(Date.now() / 1000);
    if (sec !== this.currentSecond) {
      this.currentSecond = sec;
      this.framesLastSecond = this.frameCount;
      this.frameCount = 1;
    } else {
      this.frameCount++;
    }
    if (this.activeDragging || this.frameCount < 3) {
      for (let y = 0; y < this.viewportY + 2; ++y) {
        for (let x = 0; x < this.viewportX + 2; ++x) {
          let image = '';
          const gameObject = this.gameMap[Math.floor(this.currentX) + x + ((y + Math.floor(this.currentY)) * this.mapW)];
          const objectId = gameObject ? gameObject.objectId : 1;
          switch (objectId) {
            case 1:
              image = this.tiles['grass'];
              break;
            case 2:
              image = this.tiles['grass_with_stones'];
              break;
            case 3:
              image = this.tiles['forest'];
              break;
            case 4:
              image = this.tiles['water'];
              break;
            case 5:
              image = this.tiles['village'];
              break;
            default:
              image = this.tiles['village_with_church'];
              break;
          }
          this.ctx.drawImage(image, (x - (this.currentX % 1)) * this.tileW, (y - (this.currentY % 1)) * this.tileH, this.tileW, this.tileH);
          if (y === 1) {
            this.ctx.fillText(String(Math.floor(this.currentX + x)), ((x - (this.currentX % 1)) * this.tileW) + 20, 10);
          }
          if (x === 1) {
            this.ctx.fillText(String(Math.floor(this.currentY + y)), 0, ((y - (this.currentY % 1)) * this.tileH) + 30);
          }
        }
      }
    }
    requestAnimationFrame(this.drawGame.bind(this));
  }

  dragMap(event: MouseEvent): void {
    if (this.displayVillageDialogTip === true) {
      setTimeout(() => this.displayVillageDialogTip = false, 500);
    }

    if (this.activeDragging) {
      if (event.movementX > 0) {
        this.onNavigate('left', 1);
      } else if (event.movementX < 0) {
        this.onNavigate('right', 1);
      }
      if (event.movementY > 0) {
        this.onNavigate('up', 1);
      } else if (event.movementY < 0) {
        this.onNavigate('down', 1);
      }
    }
  }

  getMapCoordinatesByClick(event: MouseEvent): void {
    const clickX = event.clientX;
    const clickY = event.clientY;
    this.lastClickObjectX = Math.round(this.currentX + Math.floor(clickX / this.tileW));
    this.lastClickObjectY = Math.round(this.currentY + Math.floor(clickY / this.tileH));
  }

  onClick(event: MouseEvent): void {
    this.activeDragging = true;
    this.getMapCoordinatesByClick(event);
    this.lastClickX = event.clientX;
    this.lastClickY = event.clientY;
    this.displayVillageDialogTip = true;
  }

  onNavigate(direction: string, stepMultiper: number): void {
    switch (direction) {
      case 'left': {
        const newX = this.currentX - (this.navigationStep * stepMultiper);
        if (newX <= this.minimalDistanceFromBorder) {
          this.currentX = this.minimalDistanceFromBorder;
          return;
        }
        this.currentX = newX;
        break;
      }
      case 'right': {
        const newX = this.currentX + (this.navigationStep * stepMultiper);
        if (newX + this.viewportX > this.mapW) {
          this.currentX = (this.mapW - this.minimalDistanceFromBorder) - this.viewportX;
          return;
        }
        this.currentX = newX;
        break;
      }
      case 'up': {
        const newY = this.currentY - (this.navigationStep * stepMultiper);
        if (newY <= this.minimalDistanceFromBorder) {
          this.currentY = this.minimalDistanceFromBorder;
          return;
        }
        this.currentY = newY;
        break;
      }
      case 'down': {
        const newY = this.currentY + (this.navigationStep * stepMultiper);
        if (newY + this.viewportY + 1 > this.mapH) {
          this.currentY = (this.mapH - this.minimalDistanceFromBorder) - this.viewportY;
          return;
        }
        this.currentY = newY;
        break;
      }
    }
  }
}
