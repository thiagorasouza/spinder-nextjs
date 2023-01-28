import useSWR from "swr";
import useSessionContext from "../hooks/useSessionContext";
import { getUserAlbums, deleteUserAlbum } from "../lib/http";

function useUserAlbums(onDelete) {
  const { user } = useSessionContext();

  const userId = user.sub ?? null;
  const { data, mutate } = useSWR(userId, getUserAlbums);

  async function deleteAlbum(albumId) {
    const expected = data.filter((album) => album._id !== albumId);

    mutate(deleteUserAlbum(userId, albumId), {
      optimisticData: expected,
      revalidate: true,
      populateCache: true,
      rollbackOnError: true,
    });

    onDelete();
  }

  return {
    albums: data,
    deleteAlbum,
  };
}

export default useUserAlbums;
