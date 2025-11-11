const SERVER_URL = process.env.SERVER_URL || "http://localhost:3001";

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = SERVER_URL;
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Auth methods - delegated to Better Auth client
  async signUp(data: SignUpFormData) {
    // Better Auth handles this directly
    throw new Error('Use Better Auth signUp method instead');
  }

  async signIn(data: SignInFormData) {
    // Better Auth handles this directly
    throw new Error('Use Better Auth signIn method instead');
  }

  async signOut() {
    // Better Auth handles this directly
    throw new Error('Use Better Auth signOut method instead');
  }

  // Stock methods
  async searchStocks(query?: string) {
    const endpoint = query ? `/api/stocks/search?q=${encodeURIComponent(query)}` : '/api/stocks/search';
    return this.request(endpoint);
  }

  // Watchlist methods
  async getWatchlist(userId: string) {
    return this.request(`/api/watchlist/${userId}`);
  }

  async addToWatchlist(userId: string, symbol: string) {
    return this.request('/api/watchlist', {
      method: 'POST',
      body: JSON.stringify({ userId, symbol }),
    });
  }

  async removeFromWatchlist(userId: string, symbol: string) {
    return this.request(`/api/watchlist/${userId}/${symbol}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();