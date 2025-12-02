
import { StoneColor, BoardState, Coordinate, Move } from '../types';

export class GoEngine {
  size: number;
  grid: StoneColor[][];
  captures: { black: number; white: number };
  moves: Move[];
  koPoint: Coordinate | null;

  constructor(size: number = 19) {
    this.size = size;
    this.grid = Array(size).fill(null).map(() => Array(size).fill(StoneColor.EMPTY));
    this.captures = { black: 0, white: 0 };
    this.moves = [];
    this.koPoint = null;
  }

  // Clone functionality for React state immutability
  clone(): GoEngine {
    const newEngine = new GoEngine(this.size);
    newEngine.grid = this.grid.map(row => [...row]);
    newEngine.captures = { ...this.captures };
    newEngine.moves = [...this.moves];
    newEngine.koPoint = this.koPoint ? { ...this.koPoint } : null;
    return newEngine;
  }

  getCurrentTurn(): StoneColor {
    return this.moves.length % 2 === 0 ? StoneColor.BLACK : StoneColor.WHITE;
  }

  // Calculate board state at a specific move index (0 = empty board)
  jumpToMove(moveIndex: number): GoEngine {
    // Start fresh
    const newEngine = new GoEngine(this.size);
    
    // Safety check
    const targetIndex = Math.max(0, Math.min(moveIndex, this.moves.length));

    // CRITICAL FIX: Only copy moves UP TO the target index.
    // This ensures that GoBoard renders the last move marker on the correct stone
    // and calculates move numbers correctly for the current state.
    newEngine.moves = this.moves.slice(0, targetIndex);

    // Replay moves logic to build the grid
    for (let i = 0; i < targetIndex; i++) {
      const move = this.moves[i];
      // We manually perform the placement logic to update grid/captures
      // passing the move's stored color to ensure history accuracy
      newEngine.internalPlaceStone(move.x, move.y, move.color);
    }
    
    return newEngine;
  }

  // Helper for replaying moves without modifying the history array again
  private internalPlaceStone(x: number, y: number, color: StoneColor) {
    this.grid[y][x] = color;
    const opponent = color === StoneColor.BLACK ? StoneColor.WHITE : StoneColor.BLACK;
    
    const neighbors = this.getNeighbors(x, y);
    neighbors.forEach(n => {
      if (this.grid[n.y][n.x] === opponent) {
        const group = this.getGroup(n.x, n.y);
        if (this.countLiberties(group) === 0) {
            group.forEach(s => {
                this.grid[s.y][s.x] = StoneColor.EMPTY;
                if(color === StoneColor.BLACK) this.captures.black++;
                else this.captures.white++;
            });
        }
      }
    });
  }

  isValidMove(x: number, y: number, color: StoneColor): boolean {
    if (x < 0 || x >= this.size || y < 0 || y >= this.size) return false;
    if (this.grid[y][x] !== StoneColor.EMPTY) return false;
    // In force mode (Demo board), we might want to relax Ko rules, 
    // but for now let's keep standard logic to prevent illegal board states.
    if (this.koPoint && this.koPoint.x === x && this.koPoint.y === y) return false;
    
    // Check suicide (simplified: allowed if it captures opponent)
    return true; 
  }

  // Updated to accept forceColor
  placeStone(x: number, y: number, forceColor?: StoneColor): { success: boolean, captures: Coordinate[] } {
    const color = forceColor || this.getCurrentTurn();
    
    if (!this.isValidMove(x, y, color)) {
      return { success: false, captures: [] };
    }

    // Place temporarily to check logic
    this.grid[y][x] = color;
    
    const opponent = color === StoneColor.BLACK ? StoneColor.WHITE : StoneColor.BLACK;
    const capturedStones: Coordinate[] = [];
    
    // Check neighbors for captures
    const neighbors = this.getNeighbors(x, y);
    neighbors.forEach(n => {
      if (this.grid[n.y][n.x] === opponent) {
        const group = this.getGroup(n.x, n.y);
        if (this.countLiberties(group) === 0) {
          group.forEach(stone => {
            capturedStones.push(stone);
          });
        }
      }
    });

    // Remove captured stones
    capturedStones.forEach(s => {
      this.grid[s.y][s.x] = StoneColor.EMPTY;
    });

    // Suicide check
    const myGroup = this.getGroup(x, y);
    if (this.countLiberties(myGroup) === 0 && capturedStones.length === 0) {
      this.grid[y][x] = StoneColor.EMPTY; // Revert
      return { success: false, captures: [] };
    }

    // Ko Rule Logic
    if (capturedStones.length === 1 && myGroup.length === 1) {
      this.koPoint = capturedStones[0];
    } else {
      this.koPoint = null;
    }

    // Update state
    if (color === StoneColor.BLACK) this.captures.white += capturedStones.length;
    else this.captures.black += capturedStones.length;

    this.moves.push({ x, y, color, moveNumber: this.moves.length + 1 });

    return { success: true, captures: capturedStones };
  }

  getNeighbors(x: number, y: number): Coordinate[] {
    const neighbors: Coordinate[] = [];
    if (x > 0) neighbors.push({ x: x - 1, y });
    if (x < this.size - 1) neighbors.push({ x: x + 1, y });
    if (y > 0) neighbors.push({ x, y: y - 1 });
    if (y < this.size - 1) neighbors.push({ x, y: y + 1 });
    return neighbors;
  }

  getGroup(x: number, y: number): Coordinate[] {
    const color = this.grid[y][x];
    const group: Coordinate[] = [];
    const visited = new Set<string>();
    const queue: Coordinate[] = [{ x, y }];

    while (queue.length > 0) {
      const current = queue.shift()!;
      const key = `${current.x},${current.y}`;
      if (visited.has(key)) continue;
      visited.add(key);
      group.push(current);

      this.getNeighbors(current.x, current.y).forEach(n => {
        if (this.grid[n.y][n.x] === color && !visited.has(`${n.x},${n.y}`)) {
          queue.push(n);
        }
      });
    }
    return group;
  }

  countLiberties(group: Coordinate[]): number {
    const liberties = new Set<string>();
    group.forEach(stone => {
      this.getNeighbors(stone.x, stone.y).forEach(n => {
        if (this.grid[n.y][n.x] === StoneColor.EMPTY) {
          liberties.add(`${n.x},${n.y}`);
        }
      });
    });
    return liberties.size;
  }

  // Simplified SGF Generator
  toSGF(): string {
    let sgf = `(;GM[1]FF[4]SZ[${this.size}]`;
    this.moves.forEach(m => {
      const charCode = (n: number) => String.fromCharCode(97 + n);
      const pos = `${charCode(m.x)}${charCode(m.y)}`;
      sgf += `;${m.color}[${pos}]`;
    });
    sgf += ")";
    return sgf;
  }
}
