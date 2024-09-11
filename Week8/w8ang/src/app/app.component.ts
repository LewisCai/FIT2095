import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Welcome to week 8';
  name: string = "John Doe";
  msg: string = "This is an example of String Interpolation";
  sampleText: string = "Example of property binding";
  iconURL = "favicon.icon";
  counter: number = 0;

  getText() {
    return "Received from a function";
  }

  randomNumberGenerator() {
    return Math.floor(Math.random() * 200);
  }

  carImageURL() {
    return "image/robot.png";
  }

  increaseCounter() {
    this.counter = this.counter + 1;
  }

  resetCounter() {
    this.counter = 0;
  }
}


