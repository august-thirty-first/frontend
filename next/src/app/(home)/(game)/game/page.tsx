import GameScreen from './gameScreen';

export default function GamePage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <GameScreen />
    </div>
  );
}
