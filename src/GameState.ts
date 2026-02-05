type State = 'empty' | 'started' | 'stopped' | 'ended';
type Action = 'START' | 'STOP' | 'END' | 'CLEAR';
type Transitions = {
  [key in State]: {
    [action in Action]?: State;
  };
};

class GameState {
  static #instance: GameState;

  private currentState: State;

  private readonly states: { [key in State]: State } = {
    empty: 'empty',
    started: 'started',
    stopped: 'stopped',
    ended: 'ended',
  };

  private readonly transitions: Transitions = {
    empty: {
      START: this.states.started,
    },
    started: {
      STOP: this.states.stopped,
      END: this.states.ended,
    },
    stopped: {
      START: this.states.started,
    },
    ended: {
      CLEAR: this.states.empty,
    },
  };

  isEmpty() {
    return this.currentState === 'empty';
  }

  isStarted() {
    return this.currentState === 'started';
  }

  isStopped() {
    return this.currentState === 'stopped';
  }

  isEnded() {
    return this.currentState === 'ended';
  }

  private constructor() {
    this.currentState = 'empty';
  }

  public static get instance() {
    if (!GameState.#instance) {
      GameState.#instance = new GameState();
    }
    return GameState.#instance;
  }

  setCurrentState(action: Action) {
    GameState.instance.currentState = this.transition(
      this.currentState,
      action,
    );
  }

  getCurrentState() {
    return this.currentState;
  }

  private transition(currentState: State, action: Action) {
    const nextState = this.transitions[currentState][action];

    if (!nextState) {
      throw new Error(
        `ABORT!: Given action '${action}' does not exist in '${currentState}' transition.`,
      );
    }
    return nextState || currentState;
  }
}
export default GameState;
