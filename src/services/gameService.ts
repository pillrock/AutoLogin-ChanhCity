import { ipcRenderer } from 'electron';

export interface Game {
  id: string;
  title: string;
  version: string;
  thumbnail: string;
  isInstalled: boolean;
  isRunning: boolean;
  downloadProgress?: number;
}

class GameService {
  private games: Game[] = [];

  async getGames(): Promise<Game[]> {
    return new Promise((resolve) => {
      ipcRenderer.invoke('get-games').then((games) => {
        this.games = games;
        resolve(games);
      });
    });
  }

  async launchGame(gameId: string): Promise<void> {
    return ipcRenderer.invoke('launch-game', gameId);
  }

  async stopGame(gameId: string): Promise<void> {
    return ipcRenderer.invoke('stop-game', gameId);
  }

  async downloadGame(gameId: string): Promise<void> {
    return ipcRenderer.invoke('download-game', gameId);
  }

  async checkForUpdates(gameId: string): Promise<boolean> {
    return ipcRenderer.invoke('check-game-updates', gameId);
  }

  async verifyGameFiles(gameId: string): Promise<boolean> {
    return ipcRenderer.invoke('verify-game-files', gameId);
  }
}

export const gameService = new GameService(); 