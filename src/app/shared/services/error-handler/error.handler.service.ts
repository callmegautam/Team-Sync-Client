import { Injectable } from '@angular/core';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  handleStatus(status: number): string {
    switch (status) {
      case 400:
        return 'Something went wrong';
        break;
      case 401:
        return 'Invalid credential';
        break;
      case 403:
        return 'Account blocked/suspended';
        break;
      case 404:
        return 'Wrong email and password';
        break;
      case 409:
        return 'User not found';
        break;
      case 422:
        return 'Validation error';
        break;
      case 500:
        return 'Internal server error';
        break;
      default:
        return 'Unexpected error';
    }
  }
}
