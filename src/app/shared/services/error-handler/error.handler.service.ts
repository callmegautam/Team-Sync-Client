import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  handleStatus(status: number): string {
    switch (status) {
      case 400:
        return 'Something went wrong';

      case 401:
        return 'Invalid credential';

      case 403:
        return 'Account blocked/suspended';

      case 404:
        return 'Not Found';

      case 409:
        return 'Already Exists';

      case 422:
        return 'Validation error';

      case 500:
        return 'Internal server error';

      default:
        return 'Unexpected error';
    }
  }
}
