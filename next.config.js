/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
        port: "",
        pathname: "/128/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/farmcode/**",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/farmcode/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/farmcode/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "www.ecoka.vn",
        port: "",
        pathname: "/_next/**",
      },
    ],
  },
};

export default nextConfig;
