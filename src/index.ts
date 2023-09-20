import { User } from './types/user.interface';
import { Icon } from './types/icon.enum';

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
