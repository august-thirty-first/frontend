import defaultImg from '@/public/default.png';
import Image from 'next/image';
import { GameDataDto } from './searchBar';

interface matchHistoryProps {
  gameData: GameDataDto | undefined;
  profileName: string | undefined;
}

const MatchHistory = ({ gameData, profileName }: matchHistoryProps) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight sm:text-3xl mb-5">
        Match History
      </h2>
      {gameData && (
        <>
          <h3>
            총 전적 : {gameData.total_win}승 {gameData.total_lose}패
          </h3>
          <h3>점수 : {gameData.ladder ? gameData.ladder : '0'}</h3>
          <ul role="list" className="divide-y divide-gray-200">
            {gameData.game_history.map(history => (
              <li key={history.winner_avata} className="py-3 sm:py-4">
                <span
                  className={`inline-flex items-center text-xl font-semibold mb-3 ${
                    profileName === history.winner_nickname
                      ? 'text-blue-700'
                      : 'text-red-700'
                  }`}
                >
                  {profileName === history.winner_nickname ? '승리' : '패배'}
                </span>
                <span className="ml-3 text-sm text-gray-500 truncate font-semibold">
                  {history.gameType}
                </span>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Image
                      width="200"
                      height="200"
                      className="h-8 w-8 rounded-full"
                      src={
                        history.winner_avata
                          ? `http://nestjs:3000/${history.winner_avata}`
                          : defaultImg
                      }
                      alt="avatar"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {history.winner_nickname}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-red-900 truncate">
                      VS
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Image
                      width="200"
                      height="200"
                      className="h-8 w-8 rounded-full"
                      src={
                        history.loser_avata
                          ? `http://nestjs:3000/${history.loser_avata}`
                          : defaultImg
                      }
                      alt="avatar"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {history.loser_nickname}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MatchHistory;
