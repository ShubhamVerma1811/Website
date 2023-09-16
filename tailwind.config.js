/**
 * @type {import('tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      textColor: {
        skin: {
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
          accent: 'var(--color-accent)',
          'primary-muted': 'var(--color-primary-muted)',
          'secondary-muted': 'var(--color-secondary-muted)'
        }
      },
      backgroundColor: (theme) => {
        return {
          skin: {
            primary: 'var(--color-primary)',
            secondary: 'var(--color-secondary)',
            accent: 'var(--color-accent)',
            'primary-muted': (props) => {
              return 'var(--color-primary-muted)';
            },
            'secondary-muted': 'var(--color-secondary-muted)'
          }
        };
      },
      borderColor: (theme) => {
        return {
          skin: {
            primary: 'var(--color-primary)',
            secondary: 'var(--color-secondary)',
            accent: 'var(--color-accent)',
            'primary-muted': (props) => {
              return 'var(--color-primary-muted)';
            },
            'secondary-muted': 'var(--color-secondary-muted)'
          }
        };
      },
      fontFamily: {
        primary: ['Karla'],
        secondary: ['Mona-Sans']
      }
    }
  },

  plugins: [require('@tailwindcss/typography')]
};
