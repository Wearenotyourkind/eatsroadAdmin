import { Action } from '@redux/Types';
import { OrderAction, StoreAction } from '@redux/actions';
import { dbService } from '@firebase';
import { RootState } from '@redux';
import firebase from 'firebase';
import {Category} from "../../reducers/StoreReducer";
//const store=window.localStorage.setItem()



interface param {
    dispatch: any;
    getState: () => RootState;
}

export const StoreMiddleware = ({ dispatch, getState }: param) => (
    next: any
) => (action: Action) => {
    next(action);
    const category = getState().Store.menu.categories;
    const categoryLength= category.length;
    const option=getState().Store.menu.optionGroups;
    const optionGroupsLength=getState().Store.menu.optionGroups.length;
    if(StoreAction.Types.ADD_OPTIONGROUP_FIREBASE===action.type){
        dbService
            .collection('stores')
            .where('ownerId', '==', getState().Auth.uid)
            .get()
            .then((querySnapshot) =>
                querySnapshot.forEach((store) => {
                    console.log('[StoreMiddleware] found a store');
                    store.ref
                        .update({
                            'menu.optionGroups': firebase.firestore.FieldValue.arrayUnion({
                                name: action.payload.name,
                                maxSelect:action.payload.max_Select,
                                options:action.payload.options
                            }),
                        })
                        .then(() => {
                            dispatch(StoreAction.loadStoreFirebase());
                        })
                        .catch((e) => {
                            console.log(e.message);
                        });
                })
            )
            .catch((e) => console.log(e.message));
    }

    if(StoreAction.Types.DELETE_OPTION_FIREBASE===action.type){
        const groupName=action.payload.name;
        const optionName=action.payload.optionName;

        let arr:any=[];
        let modifOptions:any = {
            name:'',
            maxSelect:0,
            options:[]
        }
        for(let i=0; i<optionGroupsLength;i++){
            console.log(groupName)
            if(getState().Store.menu.optionGroups[i].name===groupName){
                modifOptions.maxSelect=0;
                modifOptions.name=groupName;
                for(let j=0; j<getState().Store.menu.optionGroups[i].options.length;j++){
                    if(getState().Store.menu.optionGroups[i].options[j].name!=optionName){
                        modifOptions.options.push(getState().Store.menu.optionGroups[i].options[j]);
                    }
                }
                arr.push(modifOptions);
            }else{
                arr.push(getState().Store.menu.optionGroups[i])
            }
        }

        const categories = getState().Store.menu.categories;
        const items = getState().Store.menu.items;
        dbService
            .collection('stores')
            .where('ownerId', '==', getState().Auth.uid)
            .get()
            .then((querySnapshot) =>
                querySnapshot.forEach((store) => {
                    console.log('[StoreMiddleware] found a store~');
                    store.ref
                        .update({
                            'menu': {
                                'categories':[
                                    ...categories
                                ],
                                'items':[
                                    ...items
                                ],
                                'optionGroups': [
                                    ...arr
                                ]
                            }
                        })
                        .then(() => {
                            dispatch(StoreAction.loadStoreFirebase());
                        })
                        .catch((e) => {
                            console.log(e.message);
                        });
                })
            )
            .catch((e) => console.log(e.message));

    }

    if(StoreAction.Types.DELETE_OPTIONGROUP_FIREBASE===action.type){
        const groupName=action.payload.name;

        let arr:any=[];
        for(let i=0; i<optionGroupsLength;i++){
            if(getState().Store.menu.optionGroups[i].name!=groupName) {
                arr.push(getState().Store.menu.optionGroups[i]);
            }
        }


        const categories = getState().Store.menu.categories;
        const items = getState().Store.menu.items;
        console.log(arr)
        dbService
            .collection('stores')
            .where('ownerId', '==', getState().Auth.uid)
            .get()
            .then((querySnapshot) =>
                querySnapshot.forEach((store) => {
                    console.log('[StoreMiddleware] found a store!!');
                    store.ref
                        .update({
                            'menu': {
                                'categories':[
                                    ...categories
                                ],
                                'items':[
                                    ...items
                                ],
                                'optionGroups': [
                                    ...arr
                                ]
                            }
                        })
                        .then(() => {
                            dispatch(StoreAction.loadStoreFirebase());
                        })
                        .catch((e) => {
                            console.log(e.message);
                        });
                })
            )
            .catch((e) => console.log(e.message));

    }

    if (StoreAction.Types.FETCH_STORE_INFO === action.type) {
    }

    if (StoreAction.Types.MODIFY_CATEGORY_FIREBASE === action.type) {
        const name=action.payload.name;
        const description=action.payload.description;
        const id=action.payload.id;
        const Obj ={
            name:name,
            id:id,
            description:description
        }
        const modifCategory:any=[];
        for(let i=0; i<categoryLength;i++){
            if(i===id){
                modifCategory.push(Obj);
            }else{
                modifCategory.push(getState().Store.menu.categories[i])
            }
        }
        //const modifCategory=category.map((store:Category)=>(store.id===id && store.name===name && store.description===description)? Obj:store);
        console.log(modifCategory);
        dbService.collection('stores').where('ownerId', '==', getState().Auth.uid)
            .get().then((querySnapshot) =>
            querySnapshot.forEach((store) => {
                console.log('[StoreMiddleware] found a store');
                store.ref
                    .update({
                        'menu': {
                            'categories': [
                                ...modifCategory
                            ]
                        }
                    }).then(() => {
                    dispatch(StoreAction.loadStoreFirebase());
                }).catch((e) => {
                    console.log(e.message);
                });
            })
        )
            .catch((e) => console.log(e.message));


    }
    if (StoreAction.Types.DELETE_CATEGORY_FIREBASE === action.type) {
        const id=action.payload.id;
        const modifCategory=getState().Store.menu.categories;
        modifCategory.splice(id,1);
        console.log('delete')
        //const modifCategory=category.map((store:Category)=>(store.id===id && store.name===name && store.description===description)? Obj:store);
        dbService.collection('stores').where('ownerId', '==', getState().Auth.uid)
            .get().then((querySnapshot) =>
            querySnapshot.forEach((store) => {
                console.log('[StoreMiddleware] found a store');
                store.ref
                    .update({
                        'menu': {
                            'categories': [
                                ...modifCategory
                            ]
                        }
                    }).then(() => {
                    dispatch(StoreAction.loadStoreFirebase());
                }).catch((e) => {
                    console.log(e.message);
                });
            })
        )
            .catch((e) => console.log(e.message));


    }

    if (StoreAction.Types.ADD_MENU_FIREBASE === action.type) {
        dbService
            .collection('stores')
            .where('ownerId', '==', getState().Auth.uid)
            .get()
            .then((querySnapshot) =>
                querySnapshot.forEach((store) => {
                    console.log('[StoreMiddleware] found a store');
                    store.ref
                        .update({
                            'menu.items': firebase.firestore.FieldValue.arrayUnion({
                                name: action.payload.name,
                                description: action.payload.description,
                                price: action.payload.price,
                                categories: [...action.payload.categories],
                                optionGroups:[],
                            }),
                        })
                        .then(() => {
                            dispatch(StoreAction.loadStoreFirebase());
                        })
                        .catch((e) => {
                            console.log(e.message);
                        });
                })
            )
            .catch((e) => console.log(e.message));
    }

    if (StoreAction.Types.LOAD_STORE_FIREBASE === action.type) {
        dbService
            .collection('stores')
            .where('ownerId', '==', getState().Auth.uid)
            .get()
            .then((querySnapshot) =>{
                querySnapshot.forEach((store) => {
                    dispatch(OrderAction.loadOrders(store.id));
                    const { information, menu } = store.data();
                    const { name, address, phone } = information;
                    dispatch(StoreAction.setStoreInformation(name, address, phone));
                    dispatch(StoreAction.setStoreMenu(menu));
                })
            })
            .catch((e) => console.log(e));
    }

    if (StoreAction.Types.ADD_CATEGORY_FIREBASE === action.type) {
        console.log('[StoreMiddleware] middle ware add category');
        dbService
            .collection('stores')
            .where('ownerId', '==', getState().Auth.uid)
            .get()
            .then((querySnapshot) =>
                querySnapshot.forEach((store) => {
                    console.log('[StoreMiddleware] found a store');
                    store.ref
                        .update({
                            'menu.categories': firebase.firestore.FieldValue.arrayUnion({
                                id: getState().Store.menu.categories.length,
                                description: action.payload.description,
                                name: action.payload.name,
                            }),
                        })
                        .then(() => {
                            console.log('ASDFIJASDLFSA');
                            dispatch(StoreAction.loadStoreFirebase());
                        })
                        .catch((e) => {
                            console.log(e.message);
                        });
                })
            )
            .catch((e) => console.log('fuck'));
    }
};
