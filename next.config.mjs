// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"))

import withRoutes from "nextjs-routes/config"
import removeImports from "next-remove-imports" // required for markdown editor to work

// @ts-ignore
import nextComposePlugins from "next-compose-plugins"
const { withPlugins } = nextComposePlugins.extend(() => ({}))

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/jobs",
        permanent: true,
      },
    ]
  },
  experimental: {
    swcPlugins: [
      [
        "next-superjson-plugin",
        {
          excluded: [],
        },
      ],
    ],
    fontLoaders: [
      {
        loader: "@next/font/google",
        options: { subsets: ["latin"] },
      },
    ],
  },
  /* If trying out the experimental appDir, comment the i18n config out
   * @see https://github.com/vercel/next.js/issues/41980 */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "images.unsplash.com",
      "www.southcharlottefamilycounseling.com",
      "f005.backblazeb2.com",
    ],
  },
}

const config = withPlugins([withRoutes(), removeImports()], nextConfig)
export default config
