import { getUsersBadge } from './index';
import { Icon } from './types/icon.enum';
import { User } from './types/user.interface';

describe('getUsersBadge', () => {

  it(`get God Like`, async () => {
    await getUsersBadge(getUserMock(2001)).then(res => expect(res).toEqual(Icon.BADGE_GOD_LIKE));
    await getUsersBadge(getUserMock(3000)).then(res => expect(res).toEqual(Icon.BADGE_GOD_LIKE));
    await getUsersBadge(getUserMock(100000)).then(res => expect(res).toEqual(Icon.BADGE_GOD_LIKE));
  });

  it(`get Platinum`, async () => {
    await getUsersBadge(getUserMock(101)).then(res => expect(res).toEqual(Icon.BADGE_PLATINUM));
    await getUsersBadge(getUserMock(150)).then(res => expect(res).toEqual(Icon.BADGE_PLATINUM));
    await getUsersBadge(getUserMock(2000)).then(res => expect(res).toEqual(Icon.BADGE_PLATINUM));
  });

  it(`get Gold`, async () => {
    await getUsersBadge(getUserMock(100)).then(res => expect(res).toEqual(Icon.BADGE_GOLD));
    await getUsersBadge(getUserMock(50)).then(res => expect(res).toEqual(Icon.BADGE_GOLD));
    await getUsersBadge(getUserMock(75)).then(res => expect(res).toEqual(Icon.BADGE_GOLD));
  });

  it(`get Silver`, async () => {
    await getUsersBadge(getUserMock(25)).then(res => expect(res).toEqual(Icon.BADGE_SILVER));
    await getUsersBadge(getUserMock(49)).then(res => expect(res).toEqual(Icon.BADGE_SILVER));
    await getUsersBadge(getUserMock(30)).then(res => expect(res).toEqual(Icon.BADGE_SILVER));
  });

  it(`get Bronze`, async () => {
    await getUsersBadge(getUserMock(5)).then(res => expect(res).toEqual(Icon.BADGE_BRONZE));
    await getUsersBadge(getUserMock(24)).then(res => expect(res).toEqual(Icon.BADGE_BRONZE));
    await getUsersBadge(getUserMock(10)).then(res => expect(res).toEqual(Icon.BADGE_BRONZE));
  });

  it(`get Starter`, async () => {
    await getUsersBadge(getUserMock(2)).then(res => expect(res).toEqual(Icon.BADGE_STARTER));
    await getUsersBadge(getUserMock(3)).then(res => expect(res).toEqual(Icon.BADGE_STARTER));
    await getUsersBadge(getUserMock(4)).then(res => expect(res).toEqual(Icon.BADGE_STARTER));
  });

  it(`get Bad Ass`, async () => {
    await getUsersBadge(getUserMock(-1)).then(res => expect(res).toEqual(Icon.BADGE_BAD_ASS));
    await getUsersBadge(getUserMock(-100)).then(res => expect(res).toEqual(Icon.BADGE_BAD_ASS));
    await getUsersBadge(getUserMock(-10000000)).then(res => expect(res).toEqual(Icon.BADGE_BAD_ASS));
  });

  it(`get no Icon`, async () => {
    await getUsersBadge(getUserMock(4)).then(res => expect(res).toEqual(null));
    await getUsersBadge(getUserMock(-100)).then(res => expect(res).toEqual(null));
    await getUsersBadge(getUserMock(0)).then(res => expect(res).toEqual(null));
  });

});

function getUserMock(count: number): User {
  return {
    id: '___',
    username: '___',
    solutionCount: count
  };
}
