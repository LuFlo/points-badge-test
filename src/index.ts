import { User } from './types/user.interface';
import { Icon } from './types/icon.enum';

type BadgeTest = (solutionCount: number) => boolean;

const testLowerBound = (solutionCount: number, lowerBound: number): boolean => 
  (solutionCount >= lowerBound);

let badgeTypes: {icon: Icon, bound: number}[] = [
  {icon: Icon.BADGE_GOLD, bound: 50},
  {icon: Icon.BADGE_SILVER, bound: 25},
  {icon: Icon.BADGE_BRONZE, bound: 5},
];

export const getUsersBadge = async ( user: User ): Promise<Icon | null> => {
  let badge: Icon | null = null;
  for (var badgeType of badgeTypes) {
    if (testLowerBound(user.solutionCount, badgeType.bound)) {
      return badgeType.icon;   
    }
  };
  return badge;
};
