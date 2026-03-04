/**
 * ============================================================================
 * STATE PATTERN
 * ============================================================================
 *
 * PROBLEM: Object behavior changes based on internal state.
 * SOLUTION: Extract each state into its own class implementing a common interface.
 *
 * USE CASES: Media players, order processing, vending machines.
 * ============================================================================
 */

// State interface
export interface State {
    play(): void;
    pause(): void;
    stop(): void;
}

// Context
export class MusicPlayer {
    private state: State;

    constructor() {
        this.state = new StoppedState(this);
    }

    setState(state: State): void {
        this.state = state;
    }

    play(): void {
        this.state.play();
    }
    pause(): void {
        this.state.pause();
    }
    stop(): void {
        this.state.stop();
    }
}

// Concrete State A
export class StoppedState implements State {
    constructor(private player: MusicPlayer) { }

    play(): void {
        console.log('  ▶️  Starting playback');
        this.player.setState(new PlayingState(this.player));
    }
    pause(): void {
        console.log('  ⚠️  Cannot pause - already stopped');
    }
    stop(): void {
        console.log('  ⚠️  Already stopped');
    }
}

// Concrete State B
export class PlayingState implements State {
    constructor(private player: MusicPlayer) { }

    play(): void {
        console.log('  ⚠️  Already playing');
    }
    pause(): void {
        console.log('  ⏸️  Pausing');
        this.player.setState(new PausedState(this.player));
    }
    stop(): void {
        console.log('  ⏹️  Stopping');
        this.player.setState(new StoppedState(this.player));
    }
}

// Concrete State C
export class PausedState implements State {
    constructor(private player: MusicPlayer) { }

    play(): void {
        console.log('  ▶️  Resuming playback');
        this.player.setState(new PlayingState(this.player));
    }
    pause(): void {
        console.log('  ⚠️  Already paused');
    }
    stop(): void {
        console.log('  ⏹️  Stopping');
        this.player.setState(new StoppedState(this.player));
    }
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

export function demonstrateState(): void {
    const player = new MusicPlayer();

    console.log('Player starts in Stopped state:');
    player.pause(); // Cannot pause
    player.play(); // Start playing

    console.log('\nNow Playing:');
    player.play(); // Already playing
    player.pause(); // Pause

    console.log('\nNow Paused:');
    player.play(); // Resume
    player.stop(); // Stop
}
