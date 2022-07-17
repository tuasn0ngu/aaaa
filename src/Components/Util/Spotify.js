const clientId = "00ea53af362a40b2abbe366b78754123";
const redirectUri = "http://localhost:3000";

let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_url=${redirectUri}`;
      window.location = accessUrl;
    }
  },
  async search(term) {
    const accessToken = Spotify.getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&g=${term}`,
      {
        headers: {
          Authorization: `Bearers ${accessToken}`,
        },
      }
    );
    const jsonResponse = await response.json();
    const jsonResponse_1 = jsonResponse.json();
    if (!jsonResponse_1.tracks) {
      return [];
    }
    return jsonResponse_1.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artist[0].name,
      album: track.album.name,
      uri: track.uri,
    }));
  },
  savePlayList(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch(`https://api.spotify.com/v1/me`, { headers: headers })
      .then((response) => response.json())
      .then((jsonResponse) => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlist`, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({ name: name }),
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            const playListId = jsonResponse.id;
            return fetch(
              `https://api.spotify.com/v1/users/${userId}/playlist/${playListId}/tracks`,
              {
                headers: headers,
                method: "POST",
                body: JSON.stringify({ uris: trackUris }),
              }
            );
          });
      });
  },
};
