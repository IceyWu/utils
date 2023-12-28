import type { DefaultTheme } from "vitepress";

export interface Contributor {
  name: string;
  avatar: string;
}

export interface CoreTeam extends Partial<DefaultTheme.TeamMember> {
  avatar: string;
  name: string;
  // required to download avatars from GitHub
  github: string;
  twitter?: string;
  webtools?: string;
  discord?: string;
  youtube?: string;
  sponsor?: string;
  title?: string;
  org?: string;
  desc?: string;
}

function createLinks(tm: CoreTeam): CoreTeam {
  tm.links = [{ icon: "github", link: `https://github.com/${tm.github}` }];
  if (tm.webtools)
    tm.links.push({
      icon: "mastodon",
      link: `https://elk.zone/m.webtoo.ls/@${tm.webtools}`,
    });
  if (tm.discord) tm.links.push({ icon: "discord", link: tm.discord });
  if (tm.youtube)
    tm.links.push({
      icon: "youtube",
      link: `https://www.youtube.com/@${tm.youtube}`,
    });
  tm.links.push({ icon: "twitter", link: `https://twitter.com/${tm.twitter}` });
  return tm;
}

const plainTeamMembers: CoreTeam[] = [
  // {
  //   avatar: "https://github.com/antfu.png",
  //   name: "Anthony Fu",
  //   github: "antfu",
  //   webtools: "antfu",
  //   youtube: "antfu",
  //   discord: "https://chat.antfu.me",
  //   twitter: "antfu7",
  //   sponsor: "https://github.com/sponsors/antfu",
  //   title: "A fanatical open sourceror, working",
  //   org: "NuxtLabs",
  //   orgLink: "https://nuxtlabs.com/",
  //   desc: "Core team member of Vite & Vue",
  // },
  {
    avatar: "https://avatars.githubusercontent.com/u/66096254?v=4",
    name: "Icey Wu",
    github: "IceyWu",
    title: "A fanatical open sourceror, working",
    org: "LifePalette",
    orgLink: "https://github.com/Life-Palette",
    desc: "try to be better",
  },
];

const teamMembers = plainTeamMembers.map((tm) => createLinks(tm));

export { teamMembers };
