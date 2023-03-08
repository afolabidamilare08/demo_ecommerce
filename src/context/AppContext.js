import React from 'react';

const AppContext = React.createContext({
    UserBasicDetails:false,
    UserCart:false,
    BackendUrl:false,
    Products:false,
    UpdateUserCart: () => {},
    UpdateUserBasicDetails: () => {},
    RemoveUserBasicDetails: () => {},
    LoginHandler: () => {},
    LogoutHandler: () => {},
})



export default AppContext;