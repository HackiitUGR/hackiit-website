import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Inicio',
      href: getPermalink('/'),
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
    {
      text: 'Acerca de',
      links: [
        {
          text: 'Sobre nosotros',
          href: getPermalink('/about'),
        },
        {
          text: 'Términos',
          href: getPermalink('/terms'),
        },
        {
          text: 'Política de privacidad',
          href: getPermalink('/privacy'),
        },
        {
          text: 'Contacto',
          href: getPermalink('/contact'),
        }
      ],
    }
  ],
};

export const footerData = {
  links: [],
  secondaryLinks: [
    { text: 'Términos', href: getPermalink('/terms') },
    { text: 'Política de privacidad', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://x.com/hackiit_ugr' },
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://www.linkedin.com/company/hackiit' },
    //{ ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/HackiitUGR' },
    //{ ariaLabel: 'Email', icon: 'tabler:mail', href: 'mailto:hackiit@example.com' },
  ]
};
