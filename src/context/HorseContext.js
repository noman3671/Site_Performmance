import React, { createContext, useContext, useMemo, useState } from "react";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { getCurrentUser } from "aws-amplify/auth";
import { listUserHorses } from "apollo/queries/horses";
import { LIST_DISCIPLINES } from "apollo/queries/disciplines";
import { UPDATE_HORSE, DELETE_HORSES } from "apollo/mutations/horses";

const HorseContext = createContext();

const HorseProvider = ({ children }) => {
  const [isloading, setIsLoading] = useState(false);
  const [isHorseUpdating, setIsHorseUpdating] = useState(false);
  const [horseData, setHorseData] = useState("");
  const [deleteHorses, setDeleteHorses] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeletedSuccessfully, setIsDeletedSuccessfully] = useState(false);

  const [getUserHorses, { loading, error, fetchMore, data }] = useLazyQuery(
    gql(listUserHorses)
  );

  const { data: listDisciplinesData, refetch: refetchListDisciplines } =
    useQuery(gql(LIST_DISCIPLINES));
  const [deleteHorse] = useMutation(gql(DELETE_HORSES));

  const [updateHorse, {}] = useMutation(gql(UPDATE_HORSE), {
    update: (cache, { data }) => {
      const listUserHorsesData = cache.readQuery({
        query: gql(listUserHorses),
        variables: {
          limit: 5,
          nextToken: null,
        },
      });
      if (listUserHorsesData) {
        const updatedListUserHorses =
          listUserHorsesData?.listUserHorses?.items.map((horse) =>
            horse?.id === data?.updateHorse?.id ? data?.updateHorse : horse
          );
        cache.writeQuery({
          query: gql(listUserHorses),
          variables: {
            limit: 5,
            nextToken: null,
          },
          data: {
            listUserHorses: {
              ...listUserHorsesData?.listUserHorses,
              items: updatedListUserHorses,
            },
          },
        });
      }
    },
  });

  const fetchHorseData = async () => {
    try {
      const { username } = await getCurrentUser();
      if (username) {
        await getUserHorses({
          variables: {
            limit: 5,
            nextToken: null,
          },
          fetchPolicy: "network-only",
        });
      }
    } catch (error) {}
  };

  const loadMoreHorses = () => {
    setIsLoading(true);
    fetchMore({
      variables: {
        limit: 5,
        nextToken: data?.listUserHorses?.nextToken,
      },

      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        setIsLoading(false);
        return {
          listUserHorses: {
            ...fetchMoreResult.listUserHorses,
            items: [
              ...prev.listUserHorses.items,
              ...fetchMoreResult.listUserHorses.items,
            ],
          },
        };
      },
    });
  };

  const horseObj = useMemo(() => {
    const state = {
      error,
      data,
      listDisciplinesData,
      horseData,
      deleteHorses,
      selectAll,
      isHorseUpdating,
      isDeleting,
      isDeletedSuccessfully,
      loading,
      isHorsesLoading: isloading,
    };
    const setters = {
      setHorseData,
      setDeleteHorses,
      setSelectAll,
      setIsDeleting,
      setIsHorseUpdating,
      setIsDeletedSuccessfully,
    };
    const actions = {
      fetchMore,
      fetchHorseData,
      loadMoreHorses,
      refetchListDisciplines,
      updateHorse,
      deleteHorse,
    };

    return { state, setters, actions };
  }, [
    data,
    error,
    listDisciplinesData,
    horseData,
    deleteHorses,
    selectAll,
    isDeleting,
    isHorseUpdating,
    isDeletedSuccessfully,
    loading,
    isloading,
  ]);

  return (
    <HorseContext.Provider value={horseObj}>{children}</HorseContext.Provider>
  );
};

const useHorseContext = () => {
  const context = useContext(HorseContext);
  if (!context) {
    throw new Error("useHorseContext must be used within a HorseProvider");
  }
  return context;
};

export { HorseProvider, useHorseContext };
