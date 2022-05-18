import React, { useState, Children, useEffect, useContext } from "react";
import { Alert } from "react-native";

import { Property } from "../models";
import { PropertyService } from "../services";
import { AuthenticationContext } from "./AuthenticationContext";

export type LikedPropertiesContextType = {
  likedProperties: { [id: string]: Property };
  likeProperty: (property: Property, isLiked: boolean) => void;
};

export const LikedPropertiesContext = React.createContext<
  LikedPropertiesContextType
>({
  likedProperties: {},
  likeProperty: null,
});

export const LikedPropertiesProvider: React.FC<object> = (props) => {
  const [likedProperties, setLikedProperties] = useState({});
  const authContext = useContext(AuthenticationContext);



  useEffect(() => {

    console.log("Auth Context: ", authContext);

    if (authContext.isLoggedIn) {
      PropertyService.getLikedProperties()
        .then((res) => {
          console.log('Liked Props Data', res.data);
          var properties: { [id: string]: Property } = {};
          (res.data as Property[]).forEach((item) => {
            properties[item.id] = item;
          });
          setLikedProperties(properties);
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            authContext.logout();
          } else {
            console.log("Liked Prop Context Error:",err.message);
          }
        });
    } else {
      setLikedProperties({});
    }
  }, [authContext.isLoggedIn]);

  const likeProperty = (property: Property, isLiked: boolean) => {
    if (isLiked) {
      likedProperties[property.id] = property;
    } else {
      delete likedProperties[property.id];
    }
    setLikedProperties({ ...likedProperties });
  };

  return (
    <LikedPropertiesContext.Provider value={{ likedProperties, likeProperty }}>
      {Children.only(props.children)}
    </LikedPropertiesContext.Provider>
  );
};
