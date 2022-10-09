import { NetworkError } from "./errors";

const REQUEST_TIMEOUT = 5000;

// A Smarter fetch API

export default async function fetcher(url, options) {
  const controller = new AbortController();
  const optionsWithSignal = { ...options, signal: controller.signal };

  const timeoutAndAbort = new Promise((_, reject) =>
    setTimeout(() => {
      controller.abort();
      reject(new NetworkError("Network request timed out"));
    }, REQUEST_TIMEOUT)
  );

  try {
    return await Promise.race([timeoutAndAbort, fetch(url, optionsWithSignal)]);
  } catch (error) {
    if (error instanceof NetworkError) {
      throw error;
    } else if (error instanceof TypeError) {
      throw new NetworkError(`Internet connection lost`);
    } else {
      throw new NetworkError(`Unknown error while fetching ${url}`);
    }
  }
}
