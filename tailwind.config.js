/**
 * @type {import('tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: ['./src/**/*.{ts,tsx,html}'],
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
      }
    }
  },

  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp')
  ]
};
