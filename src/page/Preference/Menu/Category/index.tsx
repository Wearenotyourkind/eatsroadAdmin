import React, {useState} from 'react';
import './index.scss';

import {useDispatch, useSelector} from 'react-redux';
import { RootState } from '@redux';
import AddCategoryModal from './AddCategoryModal';
import {StoreAction} from "../../../../@redux/actions";

interface props {}

interface CategoryProps {
  name: string;
  description: string;
  index:number;
}
const Categories: React.FC<props> = (props) => {
    const dispatch = useDispatch();
    const [modifyState, setModifyState]=useState(false);
    const [propsName, setPropsName]=useState('');
    const [propsDescription, setPropsDescription]=useState('');
    const [propsIndex, setPropsIndex]=useState(0);

    const handleOnClickModifyCategory = () => {
        dispatch(
            StoreAction.modifyCategoryFireBase(propsName, propsDescription,setPropsIndex)
        );
        setPropsName('');
        setPropsDescription('');
    };
    const handleOnClickDeleteCategory = () => {
        dispatch(
            StoreAction.deleteCategoryFireBase(propsName, propsDescription)
        );
        setPropsName('');
        setPropsDescription('');
    };


    const Category = (props: CategoryProps) => {
        return (
            <div className="CategoryTile">
                {
                    modifyState?
                        <div className="modifyState">
                            <input value={propsName} placeholder={props.name} onChange={e=>setPropsName(e.target.value)}/>
                            <input value={props.description} placeholder={props.description}/>
                            <button onClick={()=>{

                                handleOnClickModifyCategory();
                                setModifyState(false);
                            }}>수정 완료</button>
                        </div>:
                        <div className="UsualState">
                            <h3>{props.name}</h3>
                            <p>{props.description}</p>
                            <button onClick={()=>{
                                setPropsName(props.name);
                                setPropsDescription(props.description);
                                setModifyState(true);
                            }}>수정하기</button>
                            <button onClick={()=>handleOnClickDeleteCategory}>삭제하기</button>
                        </div>

                }


            </div>
        );
    };
    const categories = useSelector(
        (state: RootState) => state.Store.menu.categories
    );

    return (
        <div className="CategoryPreference">
            <div className="header">
                <h3>카테고리 설정</h3>
                <AddCategoryModal />
            </div>
            <div className="CategoryList">
                {categories.map((e,index) => {
                    return (
                        <Category name={e.name} description={e.description} key={e.name} index={index} />
                    );
                })}
            </div>
        </div>
    );
};

export default Categories;
