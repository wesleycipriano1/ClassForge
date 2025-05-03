import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

const codeSnippets = [
  {
    language: 'python',
    code: `def soma(a, b):\n  return a + b\n\nprint(soma(2, 3))`
  },
  {
    language: 'java',
    code: `public class Hello {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}`
  },
  {
    language: 'c',
    code: `#include <stdio.h>\n\nint main() {\n  printf("Hello, World!\\n");\n  return 0;\n}`
  }
];

@Component({
  selector: 'app-animated-terminal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animated-terminal.component.html',
  styleUrls: ['./animated-terminal.component.scss']
})
export class AnimatedTerminalComponent implements OnInit {
  @Input() delay: number = 0;

  codeToDisplay = '';
  displayedCode = '';
  currentIndex = 0;
  language = '';


  ngOnInit() {
    const randomSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    this.codeToDisplay = randomSnippet.code;
    this.language = randomSnippet.language; 
    this.displayedCode = '';
    this.currentIndex = 0;
  
    setTimeout(() => this.typeCharByChar(), this.delay);
  }
  

  typeCharByChar() {
    const interval = setInterval(() => {
      if (this.currentIndex < this.codeToDisplay.length) {
        this.displayedCode += this.codeToDisplay[this.currentIndex];
        this.currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          this.displayedCode = '';
          this.currentIndex = 0;
          this.typeCharByChar(); 
        }, 2000);
      }
    }, 50);
  }
}
