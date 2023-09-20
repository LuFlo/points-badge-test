import { getUsersBadge } from './index';
import { Icon } from './types/icon.enum';
import { User } from './types/user.interface';

describe('getUsersBadge', () => {

  it(`get Gold`, function () {
    getUsersBadge(getUserMock(100)).then(res => expect(res).toEqual(Icon.BADGE_GOLD));
    getUsersBadge(getUserMock(50)).then(res => expect(res).toEqual(Icon.BADGE_GOLD));
    getUsersBadge(getUserMock(1000000)).then(res => expect(res).toEqual(Icon.BADGE_GOLD));
  });

  it(`get Silver`, function () {
    getUsersBadge(getUserMock(25)).then(res => expect(res).toEqual(Icon.BADGE_SILVER));
    getUsersBadge(getUserMock(49)).then(res => expect(res).toEqual(Icon.BADGE_SILVER));
    getUsersBadge(getUserMock(30)).then(res => expect(res).toEqual(Icon.BADGE_SILVER));
  });

  it(`get Bronze`, function () {
    getUsersBadge(getUserMock(5)).then(res => expect(res).toEqual(Icon.BADGE_BRONZE));
    getUsersBadge(getUserMock(24)).then(res => expect(res).toEqual(Icon.BADGE_BRONZE));
    getUsersBadge(getUserMock(10)).then(res => expect(res).toEqual(Icon.BADGE_BRONZE));
  });

  it(`get no Icon`, function () {
    getUsersBadge(getUserMock(4)).then(res => expect(res).toEqual(null));
    getUsersBadge(getUserMock(-100)).then(res => expect(res).toEqual(null));
    getUsersBadge(getUserMock(0)).then(res => expect(res).toEqual(null));
  });

});

function getUserMock(count: number): User {
  return {
    id: '___',
    username: '___',
    solutionCount: count
  };
}
