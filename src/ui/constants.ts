export const colors = {
  'purple': '#800DF2',
  'lightPurple': '#F8EBFF',
  'darkPurple': '#330561'
};

type LinkData = {
  href: string
  text: string
}

const navLinks: LinkData[] = [
  { href: '', text: 'Play' },
  { href: 'users', text: 'Users' },
  { href: 'playthroughs', text: 'Playthroughs' },
  { href: 'actions', text: 'Actions' },
  { href: 'summaries', text: 'Summaries' },
  { href: 'saves', text: 'Saves' }
];

export const links = {
  nav: navLinks,
};

export default {
  colors,
  links
};
