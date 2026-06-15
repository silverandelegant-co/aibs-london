const markdownIt = require("markdown-it")();

module.exports = function(eleventyConfig) {
  // Copy folders and files directly to the output
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin2");
  eleventyConfig.addPassthroughCopy("CNAME");

  // Normalize image paths — strips leading slash to prevent double-slash
  eleventyConfig.addFilter("imgpath", (path) => {
    if (!path) return path;
    return path.replace(/^\/+/, "");
  });

  // Beautiful date formatter (e.g., "18 May 2026")
  eleventyConfig.addFilter("postDate", (dateObj) => {
    if (!dateObj) return "";
    const date = new Date(dateObj);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  });

  // ISO date string for datetime attributes
  eleventyConfig.addFilter("dateIso", (dateObj) => {
    if (!dateObj) return "";
    try {
      return new Date(dateObj).toISOString().split('T')[0];
    } catch(e) {
      return "";
    }
  });

  // Markdown renderer filter
  eleventyConfig.addFilter("markdown", (content) => {
    if (!content) return "";
    return markdownIt.render(content);
  });

  // Output configuration
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
