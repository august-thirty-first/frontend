import { GetAchievementDto } from './searchBar';

interface AchievementsProps {
  achievements: GetAchievementDto[] | undefined;
}

const Achievements = ({ achievements }: AchievementsProps) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight sm:text-3xl mb-5">
        Achievements
      </h2>
      {achievements &&
        achievements.map(achievement => (
          <>
            <label key={achievement.title}>{achievement.title}</label>
            <h3>{achievement.description}</h3>
          </>
        ))}
      {achievements?.length === 0 && '달성한 업적이 없습니다...'}
    </div>
  );
};

export default Achievements;