import fetcher from "./fetcher";

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
    // console.log(error);
    throw new Error("Could not save album to user");
  }
}

export async function getUserAlbums(userId) {
  try {
    const response = await fetcher(`/api/users/${userId}/albums`);
    const albums = await response.json();
    return albums.reverse();
  } catch (error) {
    // console.log(error);
    throw new Error("Could not get user albums");
  }
}

export async function deleteUserAlbum(userId, albumId) {
  try {
    const response = await fetcher(`/api/users/${userId}/albums/${albumId}`, {
      method: "DELETE",
    });
    const albums = await response.json();
    return albums;
  } catch (error) {
    // console.log(error);
    throw new Error("Could not delete user album");
  }
}
