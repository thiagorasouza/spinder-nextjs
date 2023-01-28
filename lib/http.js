import fetcher from "./fetcher";

export async function getUserFromToken(token) {
  const response = await fetcher("/api/session", {
    method: "POST",
    body: JSON.stringify({ userToken: token }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) {
    return false;
  }

  return await response.json();
}

export async function saveAlbumToUser(album, userId) {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(album),
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetcher(`/api/users/${userId}/albums`, options);
    return response;
  } catch (error) {
    throw new Error("Could not save album to user");
  }
}

export async function saveSkippedAlbumToUser(spotifyId, userId) {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify({ spotifyId }),
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetcher(
      `/api/users/${userId}/skipped-albums`,
      options
    );
    const skippedAlbums = await response.json();
    return skippedAlbums;
  } catch (error) {
    throw new Error("Could not save skipped album to user");
  }
}

export async function getUserAlbums(userId) {
  try {
    const response = await fetcher(`/api/users/${userId}/albums`);
    const albums = await response.json();
    return albums.reverse();
  } catch (error) {
    throw new Error("Could not get user albums");
  }
}

export async function getSkippedUserAlbums(userId) {
  try {
    const response = await fetcher(`/api/users/${userId}/skipped-albums`);
    const skippedAlbums = await response.json();
    return skippedAlbums;
  } catch (error) {
    throw new Error("Could not get user albums");
  }
}

export async function deleteUserAlbum(userId, albumId) {
  try {
    const response = await fetcher(`/api/users/${userId}/albums/${albumId}`, {
      method: "DELETE",
    });
    const albums = await response.json();
    return albums.reverse();
  } catch (error) {
    throw new Error("Could not delete user album");
  }
}

export async function clearSkippedAlbums(userId) {
  try {
    const response = await fetcher(`/api/users/${userId}/skipped-albums`, {
      method: "DELETE",
    });
    return response;
  } catch (error) {
    throw new Error("Could not clear skipped albums");
  }
}
