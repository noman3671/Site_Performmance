import { useState, useEffect } from 'react';
import { getUrl } from "aws-amplify/storage";
const useS3Image = (imgKey) => {
  const [state, setState] = useState(null);
  const [error, setError] = useState(false);

  const getImageSrc = async (key) => {
    let getUrlResult = state;

    if (!state) {
      try {
        getUrlResult = await getUrl({
          key: key,
          options: {
            accessLevel: "guest",
          },
        });
      } catch (e) {
        setError(true);
        return;
      }
      setState({ ...getUrlResult, key });
    }
  };

  useEffect(() => {
    setState(null)
  }, [])
  

  useEffect(() => {
    if (error || !imgKey) return;
    getImageSrc(imgKey);
  }, [imgKey, error]);

  return { state, error, setState };
};

export default useS3Image;