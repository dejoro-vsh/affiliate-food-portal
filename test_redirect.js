const url = 'https://spf.shopee.co.th/181xwuLat';

async function test() {
  console.log(`Testing URL: ${url}`);
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow', // Make fetch follow redirects automatically
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
      }
    });
    console.log("Final Status:", response.status);
    console.log("Final URL:", response.url);
    
    // Check if the final URL is different from the original
    if (response.url !== url) {
      console.log("SUCCESS: HTTP Redirect Follow worked!");
    } else {
      console.log("FAILED: URL did not change. It might be using JS redirect or the link is dead.");
    }
  } catch (error) {
    console.error("Error fetching:", error.message);
  }
}

test();
