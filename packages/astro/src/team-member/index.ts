import TeamMember from './TeamMember.astro';
import TeamMemberBasic from './TeamMemberBasic.astro';
import TeamMemberWithSocial from './TeamMemberWithSocial.astro';
import TeamMemberCustomStyle from './TeamMemberCustomStyle.astro';
import TeamMemberGroup from './TeamMemberGroup.astro';
import TeamMemebrs from './TeamMembers.astro';

import BasicSourceCode from './TeamMemberBasic.astro?raw';
import WithSocialSourceCode from './TeamMemberWithSocial.astro?raw';
import CustomStyleSourceCode from './TeamMemberCustomStyle.astro?raw';
import GroupSourceCode from './TeamMemberGroup.astro?raw';

import { extractSimpleExample } from '../utils/component';

export { TeamMember, TeamMemberBasic, TeamMemberWithSocial, TeamMemberCustomStyle, TeamMemberGroup, TeamMemebrs };

// Export example codes
export const TeamMemberExampleCodes = {
  Basic: extractSimpleExample(BasicSourceCode, 'TeamMember'),
  WithSocial: extractSimpleExample(WithSocialSourceCode, 'TeamMember'),
  CustomStyle: extractSimpleExample(CustomStyleSourceCode, 'TeamMember'),
  Group: extractSimpleExample(GroupSourceCode, 'TeamMember'),
};