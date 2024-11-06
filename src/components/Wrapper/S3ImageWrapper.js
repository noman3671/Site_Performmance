import { getUrl } from "aws-amplify/storage";
import React, { useEffect, useState } from "react";
import { Cache } from "aws-amplify/utils";
import { TestImageKey } from "services/horses.ts";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const [state, setState] = useState();
  const [error, setError] = useState();
  const getImageSrc = async (key) => {
    if (key instanceof TestImageKey) {
      return setState({
        ...{
          url: key.getUrl(),
        },
        key,
      });
    }

    let getUrlResult = state;
    let cachedValue = await Cache.getItem(key);

    if (cachedValue) {
      const parsedObj = JSON.parse(cachedValue);

      if (new Date(parsedObj.expiresAt) / 1000 < new Date() / 1000) {
        cachedValue = false;
        setState(undefined);
        await Cache.removeItem(key);
      } else {
        setState(parsedObj);
      }
    }

    if (!state && !cachedValue) {
      try {
        getUrlResult = await getUrl({
          key: key,
          options: {
            accessLevel: "guest",
            expiresIn: 3600,
          },
        });
      } catch (e) {
        setError(true);
        return;
      }
      setState({ ...getUrlResult, key });
      await Cache.setItem(key, JSON.stringify({ ...getUrlResult, key }), {
        expires: new Date(getUrlResult.expiresAt).getTime(),
      });
    }
    return state;
  };

  useEffect(() => {
    if (error || !props.imgKey) return;
    getImageSrc(props.imgKey);
  }, [props]);

  return state?.url ? (
    <img
      {...{ className: props.className }}
      width={"113px"}
      height={"113px"}
      src={state?.url}
      alt="img"
    />
  ) : (
    ""
  );
};
