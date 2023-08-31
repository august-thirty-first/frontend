import GameOptionSubmitForm from '@/components/(home)/(game)/game/gameOptionSubmitForm';

export default function GameOptionPage() {
  return (
    <div className="h-screen bg-blue-500 flex items-center justify-center">
      <div className="border-4 rounded-lg p-10 bg-white border-blue-600 w-200">
        <h2 className="py-20 text-center text-3xl font-bold">게임 옵션</h2>
        <GameOptionSubmitForm />
      </div>
    </div>
  );
}
