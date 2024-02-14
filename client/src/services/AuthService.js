import { $api } from '@/http/api';

export default class AuthService {

  static async login(email, password) {
    return $api.post('/auth/sign-in', {email, password}, {}, true);
  }

  static async signup(data) {
    return $api.post('/auth/sign-up', data);
  }

  static async refresh() {
    return $api.get('/auth/refresh');
  }

  static async logout() {
    return $api.post('/auth/logout', {}, {}, true);
  }
}
