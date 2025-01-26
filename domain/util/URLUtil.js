class URLUtil {
  static getPort(url) {
    if (url.port) {
      return url.port;
    }
    return url.protocol === "https:" ? "443" : "80";
  }
}

module.exports = URLUtil;