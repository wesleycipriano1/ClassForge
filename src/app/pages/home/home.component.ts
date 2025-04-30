import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  cards = [
    { title: 'Card 1', description: 'Descrição do card 1' },
    { title: 'Card 2', description: 'Descrição do card 2' },
    { title: 'Card 3', description: 'Descrição do card 3' },
    { title: 'Card 4', description: 'Descrição do card 1' },
    { title: 'Card 5', description: 'Descrição do card 2' },
    { title: 'Card 3', description: 'Descrição do card 3' },
    { title: 'Card 6', description: 'Descrição do card 1' },
    { title: 'Card 7', description: 'Descrição do card 2' },
    { title: 'Card 8', description: 'Descrição do card 3' }
  ];

}
