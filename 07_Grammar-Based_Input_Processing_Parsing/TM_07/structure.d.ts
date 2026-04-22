export type RobotsTxt = {
  agents: {
    [userAgent: string]: {
      Allow: string[];
      Disallow: string[];
    };
  };
  Sitemap: string[];
  Host?: string;
};
