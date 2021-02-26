import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../@redux";
import "./OptionGroupEditor.scss"
import {StoreAction} from "../@redux/actions";
interface props {
    onChange: () => any;
}



const OptionGroupEditor: React.FC<props> = (props) => {
    const menu = useSelector((state: RootState) => state.Store.menu.optionGroups);
    const [options,setOptions]=useState([]);
    const [newOptionGroupName,setNewOptionGroupName]=useState('');
    const [newMaxSelect,setNewMaxSelect]= useState(0);
    const dispatch = useDispatch();

    const OptionEditor=(props:any)=>{
        const [newOptionName,setNewOptionName]=useState('');
        const [newOptionPrice,setNewOptionPrice]= useState(0);
        let optionList:any=[];
        const onChangeName = (e: any) => {
            const name = e.target.value;
            setNewOptionName(name);
        };

        const onChangePrice = (e: any) => {
            const newPrice = e.target.value;
            setNewOptionPrice( parseInt(newPrice) );
        };
        return(
                    <div className="OptionGroupDiv">
                        <h1>옵션 이름</h1>
                        <input onChange={onChangeName}/>
                        <h1>옵션 가격</h1>
                        <input onChange={onChangePrice}/>
                        <h2>옵션 추가</h2>
                        <button onClick={()=>{
                            optionList.push({
                                name:newOptionName,
                                price:newOptionPrice
                            });
                            setOptions(optionList);
                        }}>
                            옵션 추가
                        </button>
                    </div>
        )
    }

    const onChangeGroupName = (e: any) => {
        const name = e.target.value;
        setNewOptionGroupName(name);
    };
    const onChangeMaxSelect = (e: any) => {
        const newMaxSelect = e.target.value;
        setNewMaxSelect( parseInt(newMaxSelect) );
    };


    const onSubmitOptionGroup=()=>{
        menu.push({
            name: newOptionGroupName, max_select: newMaxSelect, options: [...options]
        });
        console.log(menu);
        dispatch(
            StoreAction.addOptionGroupFirebase(newOptionGroupName,newMaxSelect,options)
        )
        console.log(menu);
        setNewOptionGroupName('');
        setNewMaxSelect(0);

    }

    return (
        <div className="OptionGroupEditor">
            <div className="OptionGroupDiv">
                <h1>옵션 그룹 이름:</h1>
                <input onChange={onChangeGroupName}/>
                <h1>옵션 최대 수량: </h1>
                <input
                    type="text"
                    onChange={onChangeMaxSelect}
                />
            </div>
            <div className="OptionDiv">
                세부 옵션 입력
               <OptionEditor/>


            </div>


            <div className="ButtonDiv">
                <button onClick={()=>{onSubmitOptionGroup()}}>저장 & 닫기</button>
                <button>취소</button>
            </div>

        </div>
    );
};

export default OptionGroupEditor;