import { ActionCreator } from '../Types';

export enum Types {
  SET_STORE_INFO = '[Store] set store info',
  SET_STORE_MENU = '[Store] set store menu',
  FETCH_STORE_INFO = '[Store] fetch store info',
  LOAD_STORE_FIREBASE = '[Store] load store info from firebase',
  ADD_CATEGORY_FIREBASE = '[Store] add category firebase',
  MODIFY_CATEGORY_FIREBASE = '[Store] modify category firebase',
  DELETE_CATEGORY_FIREBASE = '[Store] delete category firebase',
  ADD_MENU_FIREBASE = '[Store] add menu firebase',

  ADD_OPTIONGROUP_FIREBASE= '[STORE] add option to firebase',
  DELETE_OPTION_FIREBASE= '[STORE] delete option from firebase',
  DELETE_OPTIONGROUP_FIREBASE= '[STORE] delete option from firebase',


};


export const deleteOptionGroupFirebase:ActionCreator=(
    name:string,
)=>{
  return{
    type:Types.DELETE_OPTIONGROUP_FIREBASE,
    payload:{
      name:name,
    }
  }
}

export const deleteOptionFirebase:ActionCreator=(
    group_name:string,
    option_name:string
)=>{
  return{
    type:Types.DELETE_OPTION_FIREBASE,
    payload:{
      name:group_name,
      optionName:option_name,
    }
  }
}


export const addOptionGroupFirebase:ActionCreator=(
    name:string,
    max_Select:number,
    options:any,
)=>{
  return{
    type:Types.ADD_OPTIONGROUP_FIREBASE,
    payload:{
      name:name,
      max_Select:max_Select,
      options:options,
    }
  }
}

export const modifyCategoryFireBase: ActionCreator = (
    name: string,
    description: string,
    id:number,
) => {
  return {
    type: Types.MODIFY_CATEGORY_FIREBASE,
    payload: {
      name: name,
      description: description,
      id:id,
    },
  };
};
export const deleteCategoryFireBase: ActionCreator = (
    name: string,
    description: string,
    id:number,
) => {
  return {
    type: Types.DELETE_CATEGORY_FIREBASE,
    payload: {
      name: name,
      description: description,
      id:id,
    },
  };
};

export const addMenuFirebase: ActionCreator = (
  name,
  price,
  description,
  categories
) => {
  return {
    type: Types.ADD_MENU_FIREBASE,
    payload: {
      name: name,
      price: price,
      description: description,
      categories: categories,
    },
  };
};

export const addCategoryFireBase: ActionCreator = (
  name: string,
  description: string
) => {
  return {
    type: Types.ADD_CATEGORY_FIREBASE,
    payload: {
      name: name,
      description: description,
    },
  };
};

export const setStoreInformation: ActionCreator = (
  name: string,
  address: string,
  phone: string
) => {
  return {
    type: Types.SET_STORE_INFO,
    payload: {
      name: name,
      address: address,
      phone: phone,
    },
  };
};

export const setStoreMenu: ActionCreator = (menu) => {
  return {
    type: Types.SET_STORE_MENU,
    payload: {
      menu: menu,
    },
  };
};

export const loadStoreFirebase: ActionCreator = () => {
  return {
    type: Types.LOAD_STORE_FIREBASE,
    payload: null,
  };
};
