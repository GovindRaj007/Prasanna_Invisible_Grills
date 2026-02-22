export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Production CSS optimizations
    ...(process.env.NODE_ENV === 'production' && {
      cssnano: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          normalizeUnicode: false,
        }],
      },
    }),
  },
};
