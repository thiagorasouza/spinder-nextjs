import useSWR from "swr";
import { useSession } from "next-auth/react";
import { getUserAlbums, deleteUserAlbum } from "../lib/http";

function useUserAlbums(onDelete) {
  const session = useSession();

  const userId = session.data.user?.id ?? null;
  const { data, mutate } = useSWR(userId, getUserAlbums);

  async function deleteAlbum(albumId) {
    const userId = session.data.user.id;
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
