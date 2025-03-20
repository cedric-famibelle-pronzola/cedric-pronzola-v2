const withNextIntl = require('next-intl/plugin')(
  './i18n.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing Next.js config
};

module.exports = withNextIntl(nextConfig);
