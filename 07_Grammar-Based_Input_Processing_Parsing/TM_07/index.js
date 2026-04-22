function parseRobots(text) {
  const lines = text.split("\n");

  const result = {
    agents: {},
    Sitemap: [],
  };

  let currentAgents = [];

  for (let line of lines) {
    line = line.trim();

    if (!line || line.startsWith("#")) continue;

    const parts = line.split(":");
    if (parts.length < 2) continue;

    const key = parts[0].trim().toLowerCase();
    const value = parts.slice(1).join(":").trim();

    if (key === "user-agent") {
      const agent = value.toLowerCase();
      currentAgents = [agent];

      if (!result.agents[agent]) {
        result.agents[agent] = {
          Allow: [],
          Disallow: [],
        };
      }
    } else if (key === "allow") {
      for (let agent of currentAgents) {
        if (value) result.agents[agent].Allow.push(value);
      }
    } else if (key === "disallow") {
      for (let agent of currentAgents) {
        if (value) result.agents[agent].Disallow.push(value);
      }
    } else if (key === "sitemap") {
      if (value) result.Sitemap.push(value);
    } else if (key === "host") {
      result.Host = value;
    }
  }

  return result;
}

module.exports = parseRobots;
