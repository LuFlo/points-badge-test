import { User } from './types/user.interface';
import { Icon } from './types/icon.enum';

type BadgeTest = (solutionCount: number) => boolean;

let badgeTypes: {icon: Icon, testFunction: BadgeTest}[] = [
  {icon: Icon.BADGE_BRONZE,  testFunction: solutionCount => solutionCount >= 5 && solutionCount < 25},
  {icon: Icon.BADGE_SILVER,  testFunction: solutionCount => solutionCount >= 25 && solutionCount < 50},
  {icon: Icon.BADGE_GOLD,  testFunction: solutionCount => solutionCount >= 50}
];

export const getUsersBadge = ( user: User ): Icon | null => {
  let badge: Icon | null = null;
  for (var badgeType of badgeTypes) {
    if (badgeType.testFunction(user.solutionCount)) {
      return badgeType.icon;   
    }
  };
  return badge;
};
