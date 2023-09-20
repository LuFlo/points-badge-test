import { User } from './types/user.interface';
import { Icon } from './types/icon.enum';
import { getAllUser } from './user-store';

type BadgeTest = (solutionCount: number) => boolean;

const testBounds = (solutionCount: number, lowerBound: number, upperBound: number): boolean =>
  (solutionCount >= lowerBound && solutionCount < upperBound);

let badgeTypes: {icon: Icon, lowerBound: number, upperBound: number}[] = [
  {icon: Icon.BADGE_GOD_LIKE, lowerBound: 2001, upperBound: Infinity},
  {icon: Icon.BADGE_PLATINUM, lowerBound: 101, upperBound: Infinity},
  {icon: Icon.BADGE_GOLD, lowerBound: 50, upperBound: Infinity},
  {icon: Icon.BADGE_SILVER, lowerBound: 25, upperBound: Infinity},
  {icon: Icon.BADGE_BRONZE, lowerBound: 5, upperBound: Infinity},
  {icon: Icon.BADGE_STARTER, lowerBound: 2, upperBound: Infinity},
  {icon: Icon.BADGE_BAD_ASS, lowerBound: -Infinity, upperBound: 0},
];

export const getUsersBadge = async ( user: User ): Promise<Icon | null> => {
  let badge: Icon | null = null;
  for (var badgeType of badgeTypes) {
    if (testBounds(user.solutionCount, badgeType.lowerBound, badgeType.upperBound)) {
      return badgeType.icon;
    }
  };
  return badge;
};

async function calculateAllBadges(users: User[]): Promise<{ user: User; icon: Icon | null; }[]> {
  return Promise.all(users.map(async user => {
    const icon = await getUsersBadge(user);
    return {user, icon};
  }));
}

function calculateUsersStatistics() {
  getAllUser().then(async users => {
    const userCount: number = users.length;
    console.log("Total users: " + userCount);
    const allSolutions: number = users.map(user => user.solutionCount).reduce((s1, s2) => s1 + s2);
    const averageSolutions: number = allSolutions / userCount;
    console.log("Average solution count: " + averageSolutions);
    console.log("Top users:");
    users.sort((user1, user2) => user2.solutionCount - user1.solutionCount)
      .slice(0, 5).forEach((user, idx) => {
        console.log((idx + 1) + ". " + user.username + " - solution count: " + user.solutionCount);
      });
    console.log();
    let counterMap = new Map<Icon, number> ([
      [Icon.BADGE_GOD_LIKE, 0],
      [Icon.BADGE_PLATINUM, 0],
      [Icon.BADGE_GOLD, 0],
      [Icon.BADGE_SILVER, 0],
      [Icon.BADGE_BRONZE, 0],
      [Icon.BADGE_STARTER, 0],
      [Icon.BADGE_BAD_ASS, 0],
    ]);
    const userBadgePairs: { user: User; icon: Icon | null; }[] = await calculateAllBadges(users);
    userBadgePairs.forEach(pair => {
      if (pair.icon !== null) {
        const oldValue: number = counterMap.get(pair.icon) ?? 0;
        counterMap.set(pair.icon, oldValue + 1);
      }
    });

    const bestBadge = Array.from(counterMap.entries()).sort((entry1, entry2) => entry2[1] - entry1[1])[0];
    console.log("Most given badge is " + bestBadge[0] + " with " + bestBadge[1] + " users");
  });
}

calculateUsersStatistics();
