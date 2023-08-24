import defaultImg from '@/public/default.png';
import Image from 'next/image';

const MatchHistory = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight sm:text-3xl mb-5">
        Match History
      </h2>
      <h3>총 전적 : N승 N패 | 점수 : N</h3>
      <ul role="list" className="divide-y divide-gray-200">
        <li className="py-3 sm:py-4">
          <span className="inline-flex items-center text-xl font-semibold text-red-700 mb-3">
            패배
          </span>
          <span className="ml-3 text-sm text-gray-500 truncate font-semibold">
            ladder
          </span>
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Image
                width="200"
                height="200"
                className="h-8 w-8 rounded-full"
                src={defaultImg}
                alt="avatar"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                nickname
              </p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-red-900 truncate">VS</p>
            </div>
            <div className="flex-shrink-0">
              <Image
                width="200"
                height="200"
                className="h-8 w-8 rounded-full"
                src={defaultImg}
                alt="avatar"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                nickname
              </p>
            </div>
          </div>
        </li>
        <li className="py-3 sm:py-4">
          <span className="inline-flex items-center text-xl font-semibold text-blue-700 mb-3">
            승리
          </span>
          <span className="ml-3 text-sm text-gray-500 truncate font-semibold">
            normal
          </span>
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Image
                width="200"
                height="200"
                className="h-8 w-8 rounded-full"
                src={defaultImg}
                alt="avatar"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                nickname
              </p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-red-900 truncate">VS</p>
            </div>
            <div className="flex-shrink-0">
              <Image
                width="200"
                height="200"
                className="h-8 w-8 rounded-full"
                src={defaultImg}
                alt="avatar"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                nickname
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MatchHistory;
