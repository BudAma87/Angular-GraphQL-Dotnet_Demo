import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CommonModule } from '@angular/common';
import { GET_PHONES, PLACE_ORDER } from './phones.graphql';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-phones',
  imports: [CommonModule, RouterModule],
  templateUrl: './phones.component.html',
})
export class PhonesComponent implements OnInit {
  phones: any[] = [];
  error: string | null = null;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo.watchQuery({ query: GET_PHONES }).valueChanges.subscribe({
      next: (result: any) => {
        this.phones = result?.data?.phones || [];
      },
      error: (err) => {
        this.error = 'Failed to fetch phones.';
        console.error(err);
      }
    });
  }

  placeOrder(phoneId: number): void {
    const username = 'testuser'; // 🔁 Replace with token decode or user context if available

    this.apollo.mutate({
      mutation: PLACE_ORDER,
      variables: {
        username,
        phoneId,
        quantity: 1
      }
    }).subscribe({
      next: () => alert('Order placed successfully!'),
      error: (err) => {
        this.error = 'Failed to place order.';
        console.error(err);
      }
    });
  }
}

