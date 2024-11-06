import { gql, useQuery, useMutation } from "@apollo/client";
import React, { createContext, useContext, useMemo, useState } from "react";
import { DELETE_SADDLE } from "apollo/mutations/saddle";
import {
  LIST_MY_SADDLES,
  LIST_USER_SELL_SADDLES,
} from "apollo/queries/saddles";

const SaddleContext = createContext();

const SaddleProvider = ({ children }) => {
  const [saddleData, setSaddleData] = useState("");
  const [deleteSaddle, setDeleteSaddle] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isDeletedSuccessfully, setIsDeletedSuccessfully] = useState(false);
  const [locationPathName, setLocationPathName] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  const [itemStatus, setItemStatus] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data, loading, fetchMore, refetch } = useQuery(gql(LIST_MY_SADDLES), {
    variables: {
      limit: 10,
      nextToken: null,
    },
  });

  const {
    data: sellSaddlesData,
    loading: sellSaddlesLoading,
    fetchMore: fetchMoreSellSaddles,
    refetchSellSaddles,
  } = useQuery(gql(LIST_USER_SELL_SADDLES), {
    variables: {
      limit: 10,
      nextToken: null,
    },
  });

  const fetchListUserSaddleData = async () => {
    await refetch({
      limit: 10,
      nextToken: null,
    });
  };

  const fetchSellSaddleData = async () => {
    await refetchSellSaddles({
      limit: 10,
      nextToken: null,
    });
  };

  const selectAllSaddleIds = (isEmpty = false) => {
    if (!isEmpty) {
      const allSaddleIds = data?.listUserSaddles?.items.map(
        (item, i) => item?.id
      );
      setDeleteSaddle(allSaddleIds);
    } else {
      setDeleteSaddle([]);
    }
  };

  const selectAllSellSaddleIds = (isEmpty = false) => {
    if (!isEmpty) {
      const allSaddleIds = data?.listUserSellSaddles?.items.map(
        (item, i) => item?.id
      );
      setDeleteSaddle(allSaddleIds);
    } else {
      setDeleteSaddle([]);
    }
  };

  const selectBtnOnClickHandler = () => {
    setSelectAll((prevSelectAll) => !prevSelectAll);
  };

  const deleteBtnOnClickHandler = () => {
    // DeleteSaddleModalRef.current.open();
  };

  const onHandleDelete = () => {
    // DeleteSaddleModalRef.current.open();
  };

  const loadMoreBtnHandler = () => {
    fetchMore({
      variables: {
        limit: 5,
        nextToken: data?.listUserSaddles?.nextToken,
      },

      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          listUserSaddles: {
            ...fetchMoreResult.listUserSaddles,
            items: [
              ...prev.listUserSaddles.items,
              ...fetchMoreResult.listUserSaddles.items,
            ],
          },
        };
      },
    });
  };

  const loadMoreSellSaddles = () => {
    fetchMoreSellSaddles({
      variables: {
        limit: 5,
        nextToken: data?.listUserSellSaddles?.nextToken,
      },

      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          listUserSaddles: {
            ...fetchMoreResult.listUserSaddles,
            items: [
              ...prev.listUserSaddles.items,
              ...fetchMoreResult.listUserSaddles.items,
            ],
          },
        };
      },
    });
  };

  const [deleteSaddles] = useMutation(gql(DELETE_SADDLE), {
    update: (cache, { data }) => {
      const listUserSellSaddlesData = cache.readQuery({
        query: gql(LIST_USER_SELL_SADDLES),
        variables: {
          limit: 10,
          nextToken: null,
        },
      });

      if (listUserSellSaddlesData) {
        const idsofdeletedItem = data?.deleteSaddle.map((item) => item.id);
        const updatedListUserSellSaddles =
          listUserSellSaddlesData?.listUserSellSaddles?.items.filter(
            (saddle) => !idsofdeletedItem.includes(saddle?.id)
          );

        cache.writeQuery({
          query: gql(LIST_USER_SELL_SADDLES),
          variables: {
            limit: 10,
            nextToken: null,
          },
          data: {
            listUserSellSaddles: {
              ...listUserSellSaddlesData?.listUserSellSaddles,
              items: updatedListUserSellSaddles,
            },
          },
        });
      }

      const listUserMySaddleData = cache.readQuery({
        query: gql(LIST_MY_SADDLES),
        variables: {
          limit: 10,
          nextToken: null,
        },
      });
      if (listUserMySaddleData) {
        const idsofdeletedItem = data?.deleteSaddle.map((item) => item.id);
        const updatedListUserSaddle =
          listUserMySaddleData?.listUserSaddles?.items.filter(
            (saddle) => !idsofdeletedItem.includes(saddle?.id)
          );

        cache.writeQuery({
          query: gql(LIST_MY_SADDLES),
          variables: {
            limit: 10,
            nextToken: null,
          },
          data: {
            listUserSaddles: {
              ...listUserMySaddleData?.listUserSaddles,
              items: updatedListUserSaddle,
            },
          },
        });
      }
    },
  });

  const saddleObj = useMemo(() => {
    const state = {
      data,
      loading,
      selectAll,
      itemStatus,
      saddleData,
      sellSaddlesData,
      sellSaddlesLoading,
      deleteSaddle,
      toggleButton,
      locationPathName,
      isDeleting,
      isDeletedSuccessfully,
    };
    const setters = {
      setSelectAll,
      setSaddleData,
      setItemStatus,
      setToggleButton,
      setDeleteSaddle,
      setIsDeleting,
      setLocationPathName,
      setIsDeletedSuccessfully,
    };
    const actions = {
      fetchListUserSaddleData,
      fetchSellSaddleData,
      selectAllSaddleIds,
      selectAllSellSaddleIds,
      selectBtnOnClickHandler,
      deleteBtnOnClickHandler,
      onHandleDelete,
      loadMoreBtnHandler,
      loadMoreSellSaddles,
      deleteSaddles,
    };

    return { state, setters, actions };
  }, [
    data,
    loading,
    selectAll,
    itemStatus,
    saddleData,
    sellSaddlesData,
    sellSaddlesLoading,
    deleteSaddle,
    toggleButton,
    locationPathName,
    isDeleting,
    isDeletedSuccessfully,
  ]);

  return (
    <SaddleContext.Provider value={saddleObj}>
      {children}
    </SaddleContext.Provider>
  );
};
const useSaddleContext = () => {
  const context = useContext(SaddleContext);
  if (!context) {
    throw new Error("useSaddleContext must be used within a SaddleProvider");
  }
  return context;
};
export { SaddleProvider, useSaddleContext };
